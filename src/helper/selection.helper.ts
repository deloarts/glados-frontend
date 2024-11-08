import { useBoughtItemsStore } from "@/stores/boughtItems";
import { useNotificationStore } from "@/stores/notification";

export function updateSelectedTableElement(
  elementName: String,
  newValue: string | number | Date | null,
  currentValue: string | number | Date | null,
  updateMethod: Function,
) {
  const boughtItemsStore = useBoughtItemsStore();
  const notificationStore = useNotificationStore();
  const ids = boughtItemsStore.selectedIDs;

  if (newValue == null || (ids.length == 1 && newValue == currentValue)) {
    return;
  }

  let c = 0;
  let confirmation = true;

  if (ids.length > 1) {
    confirmation = confirm(
      `Do you want to change the ${elementName} of ${ids.length} items to '${newValue}'?`,
    );
  }
  if (confirmation) {
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      updateMethod(id, newValue).then((response) => {
        c++;
        if (response.status != 200) {
          notificationStore.addWarn(response.data.detail);
        }
        if (c == ids.length) {
          boughtItemsStore.get();
        }
      });
    }
  } else {
    boughtItemsStore.get();
  }
}
