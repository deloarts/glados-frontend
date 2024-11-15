export interface Language {
  notification: {
    info: {
      reconnectedToServer: string;
      savedNewFilter: string;
      selectItemFirst: string;
      onlyEditOneItem: string;
      onlyCopyOneItem: string;
      onlyDeleteOneItem: string;
      deletedItem: Function;
      createdItem: string;
      xlsxImportSuccess: string;
    };
    warn: {
      lostServerConnection: string;
      itemCreateErrorInField: Function;
      xlsxTemplateDownloadFailed: string;
      xlsxUploadContentIncomplete: string;
      xlsxProcessError: string;
    };
  };
  main: {
    serverVersionNotSupported: string;
    noServerConnection: string;
    screenResolutionNotSupported: string;
    promptYes: string;
    promptNo: string;
  };
  sideBar: {
    logout: string;
    dashboard: string;
    projects: string;
    boughtItems: string;
    account: string;
    tools: string;
    settings: string;
  };
  boughtItem: {
    table: {
      number: string;
      id: string;
      state: string;
      status: string;
      projectNumber: string;
      productNumber: string;
      projectCustomer: string;
      projectDescription: string;
      quantity: string;
      unit: string;
      weblink: string;
      partnumber: string;
      orderNumber: string;
      manufacturer: string;
      supplier: string;
      group1: string;
      noteGeneral: string;
      noteSupplier: string;
      createdDate: string;
      creatorID: string;
      desiredDate: string;
      requestedDate: string;
      requesterID: string;
      orderedDate: string;
      ordererID: string;
      expectedDate: string;
      deliveredDate: string;
      receiverID: string;
      arrivalWeeks: string;
      totalWeeks: string;
      storagePlace: string;
    };
    input: {
      filterPlaceholder: string;
      projectNumberPlaceholder: string;
      productNumberPlaceholder: string;
      quantityPlaceholder: string;
      namePlaceholder: string;
      partnumberPlaceholder: string;
      orderNumberPlaceholder: string;
      manufacturerPlaceholder: string;
      supplierPlaceholder: string;
      group1Placeholder: string;
      weblinkPlaceholder: string;
      desiredDatePlaceholder: string;
      noteGeneralPlaceholder: string;
      noteSupplierPlaceholder: string;
    };
    toggle: {
      notifyOnDelivery: string;
      highPriority: string;
    };
    button: {
      newItem: string;
      editItem: string;
      copyItem: string;
      deleteItem: string;
      importExcel: string;
      exportExcel: string;
      unselect: string;
      sync: string;
      views: string;
      columns: string;
      saveFilter: string;
      loadFilter: string;
      clearFilter: string;
      limit: string;
      sortBy: string;
      preset: string;
      showAll: string;
      create: string;
      update: string;
      cancel: string;
      template: string;
    };
    options: {
      showAll: string;
      views: {
        ignoreDelivered: string;
        ignoreCanceled: string;
        ignoreLost: string;
      };
      status: {
        open: string;
        requested: string;
        ordered: string;
        late: string;
        partial: string;
        delivered: string;
        canceled: string;
        lost: string;
      };
      orderBy: {
        id: string;
        created: string;
        project: string;
        product: string;
        group: string;
        manufacturer: string;
        supplier: string;
      };
    };
    xlsx: {
      importValidationErrors: string;
      errorInRow: string;
      dropHere: string;
      dragHere: string;
      butReceived: string;
      anEmptyCell: string;
    };
    changelog: {
      changelog: string;
      changelogOfItem: string;
      tooManySelected: string;
      nothingSelected: string;
    };
  };
}
