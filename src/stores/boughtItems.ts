import { ref, watch, onBeforeMount } from "vue";
import { defineStore } from "pinia";

import constants from "@/constants";
import { boughtItemsRequest } from "@/requests/items";
import { getBoughtItemsFilterParams } from "@/requests/params";

import { useLanguageStore } from "@/stores/language";
import { useNotificationStore } from "@/stores/notification";
import { useBoughtItemFilterStore } from "@/stores/filter";
import { useUnitsStore } from "@/stores/units";

// import type { ItemStoreProtocol } from "@/protocols/itemStoreProtocol";
import type { BoughtItemSchema } from "@/schemas/boughtItem";
import type { BoughtItemBatchImportSchema } from "@/schemas/boughtItem";
import type { ResponseWarning } from "@/models/response";

export const useBoughtItemsStore = defineStore("boughtItems", () => {
  const _filterStore = useBoughtItemFilterStore();

  const loading = ref<boolean>(false);
  const paused = ref<boolean>(false);
  const items = ref<Array<BoughtItemSchema>>([]);
  const selectedIDs = ref<Array<number>>([]);

  function clear() {
    items.value = [];
    selectedIDs.value = [];
  }

  function pause(state: boolean) {
    paused.value = state;
  }

  function getItems(): Array<BoughtItemSchema> {
    get();
    return items.value;
  }

  function clearItems() {
    items.value = [];
  }

  function getSelection(): Array<number> {
    return selectedIDs.value;
  }

  function setSelection(itemIDs: Array<number>) {
    selectedIDs.value = itemIDs;
  }

  function clearSelection() {
    selectedIDs.value = [];
  }

  async function get(): Promise<any> {
    console.log("Bought Items store requesting data ...");
    loading.value = true;

    const params = getBoughtItemsFilterParams(_filterStore.state);
    return boughtItemsRequest.getItems(params).then((response) => {
      loading.value = false;
      if (response.status === 200) {
        items.value = response.data;
        console.log("Bought Items store got data from server.");
      }
      return response;
    });
  }

  function fetchItems() {
    if (paused.value) {
      console.log("Bought Items store is paused.");
      setTimeout(
        fetchItems.bind(this),
        constants.patchBoughtItemsStoreInterval,
      );
    } else {
      get().then(() => {
        setTimeout(
          fetchItems.bind(this),
          constants.patchBoughtItemsStoreInterval,
        );
      });
    }
  }

  onBeforeMount(() => {
    clear();
    fetchItems();
  });

  return {
    loading,
    paused,
    items,
    clear,
    pause,
    getItems,
    clearItems,
    getSelection,
    setSelection,
    clearSelection,
  };
});

export const useBoughtItemsBatchImportStore = defineStore(
  "boughtItemsBatchImport",
  () => {
    const _languageStore = useLanguageStore();
    const _notificationStore = useNotificationStore();
    const _unitsStore = useUnitsStore();

    const importing = ref<boolean>(false);
    const creating = ref<boolean>(false);
    const validating = ref<boolean>(false);
    const validated = ref<boolean>(false);
    const items = ref<Array<BoughtItemBatchImportSchema>>([]);
    const warnings = ref<Array<ResponseWarning>>([]);

    function clear() {
      items.value = [];
      warnings.value = [];
    }

    function clearItems() {
      items.value = [];
    }

    function clearWarnings() {
      warnings.value = [];
    }

    function addEmptyRow() {
      const tempMultiData = JSON.parse(JSON.stringify(items.value));
      const temp = [
        {
          project_id: null,
          partnumber: null,
          order_number: null,
          manufacturer: null,
          quantity: 1,
          unit: _unitsStore.boughtItemUnits.default,
          supplier: null,
          group_1: null,
          weblink: null,
          note_general: null,
          note_supplier: null,
          desired_delivery_date: null,
          high_priority: null,
          notify_on_delivery: null,
        },
      ];
      for (let i = 0; i < tempMultiData.length; i++) {
        temp.push(tempMultiData[i]);
      }
      items.value = temp;
    }

    function removeItem(index: number) {
      items.value.splice(index, 1);
    }

    async function createItem(index: number): Promise<any> {
      return boughtItemsRequest
        .postItems(items.value[index])
        .then((response) => {
          if (response.status === 200) {
            _notificationStore.addInfo(
              _languageStore.l.notification.info.createdItem,
            );
            items.value.splice(index, 1);
          } else if (response.status === 422) {
            _notificationStore.addWarn(
              _languageStore.l.notification.warn.someFieldsNotFilled,
            );
            // Assign error msg to data
            for (
              let errIdx = 0;
              errIdx < response.data.detail.length;
              errIdx++
            ) {
              items.value[index][
                `${response.data.detail[errIdx].loc[1]}_error`
              ] = response.data.detail[errIdx].msg;
            }
          } else {
            _notificationStore.addWarn(response.data.detail);
          }
          return response;
        })
        .catch((error) => {
          console.log(error);
          _notificationStore.addWarn(error);
        });
    }

    async function validateAll() {
      if (items.value.length == 0) {
        _notificationStore.addInfo(
          _languageStore.l.notification.info.createRowFirst,
        );
        return;
      }
      validating.value = true;
      validated.value = false;
      let anyError = false;
      for (let i = 0; i < items.value.length; i++) {
        await boughtItemsRequest
          .postItemsValidate(items.value[i])
          .then((response) => {
            if (response.status === 200) {
              items.value[i] = response.data;
            } else if (response.status === 422) {
              anyError = true;
              //Assign error msg to data
              for (
                let errIdx = 0;
                errIdx < response.data.detail.length;
                errIdx++
              ) {
                items.value[i][`${response.data.detail[errIdx].loc[1]}_error`] =
                  response.data.detail[errIdx].msg;
              }
            } else {
              anyError = true;
            }
          });
      }
      validating.value = false;
      if (anyError) {
        validated.value = false;
        _notificationStore.addInfo(
          _languageStore.l.notification.info.batchImportValidationError,
        );
      } else {
        validated.value = true;
        _notificationStore.addInfo(
          _languageStore.l.notification.info.batchImportAllValidated,
        );
      }
    }

    async function createAll() {
      if (items.value.length == 0) {
        _notificationStore.addInfo(
          _languageStore.l.notification.info.createRowFirst,
        );
        return;
      }
      creating.value = true;

      let firstNotFailedItemIdx = 0;
      let anyCreated = false;

      do {
        await boughtItemsRequest
          .postItems(items.value[firstNotFailedItemIdx])
          .then((response) => {
            if (response.status === 200) {
              items.value.splice(firstNotFailedItemIdx, 1);
              anyCreated = true;
            } else {
              if (response.status === 422) {
                //Assign error msg to data
                for (
                  let errIdx = 0;
                  errIdx < response.data.detail.length;
                  errIdx++
                ) {
                  items.value[firstNotFailedItemIdx][
                    `${response.data.detail[errIdx].loc[1]}_error`
                  ] = response.data.detail[errIdx].msg;
                }
              } else {
                _notificationStore.addWarn(response.data.detail);
              }
              firstNotFailedItemIdx++;
            }
          })
          .catch((error) => {
            _notificationStore.addWarn(error);
          });
      } while (items.value.length - firstNotFailedItemIdx > 0);
      creating.value = false;

      if (anyCreated && firstNotFailedItemIdx == 0) {
        _notificationStore.addInfo(
          _languageStore.l.notification.info.batchImportAllCreated,
        );
      } else if (anyCreated && firstNotFailedItemIdx > 0) {
        _notificationStore.addWarn(
          _languageStore.l.notification.warn.batchImportSomeFailed,
        );
      } else {
        _notificationStore.addWarn(
          _languageStore.l.notification.warn.batchImportAllFailed,
        );
      }
    }

    async function importFile(
      file: File,
      serverSideValidation: boolean,
    ): Promise<any> {
      importing.value = true;
      const formData = new FormData();
      formData.append("file", file);

      return boughtItemsRequest
        .postItemsExcel(formData, serverSideValidation)
        .then((response) => {
          importing.value = false;
          if (response.status == 200) {
            for (let i = 0; i < response.data.length; i++) {
              items.value.push(response.data[i]);
            }
            // _notificationStore.addInfo(
            //   _languageStore.l.notification.info.xlsxImportSuccess,
            // );
          } else if (response.status == 422) {
            _notificationStore.addWarn(
              _languageStore.l.notification.warn.xlsxUploadContentIncomplete,
            );
            warnings.value = response.data.detail;
          } else {
            _notificationStore.addWarn(response.data.detail);
          }
          return response;
        })
        .catch((error) => {
          importing.value = false;
          _notificationStore.addWarn(
            _languageStore.l.notification.warn.xlsxProcessError,
          );
        });
    }

    onBeforeMount(() => {
      importing.value = false;
      validated.value = false;
      validating.value = false;
      creating.value = false;
      warnings.value = [];
    });

    watch(
      () => items.value,
      () => {
        validated.value = false;
      },
      { deep: true },
    );

    return {
      importing,
      validating,
      validated,
      creating,
      items,
      warnings,
      clear,
      clearItems,
      clearWarnings,
      addEmptyRow,
      removeItem,
      importFile,
      createItem,
      validateAll,
      createAll,
    };
  },
);
