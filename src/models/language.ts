export interface Language {
  notification: {
    info: {
      reconnectedToServer: string;
      welcomeMessage: Function;
      savedNewFilter: string;
      createdNewPAT: string;
      createdUser: string;
      updatedUserData: string;
      cannotUpdateSystemUser: string;
      selectProjectFirst: string;
      onlyEditOneProject: string;
      onlyDeleteOneProject: string;
      deletedProject: Function;
      createdProject: string;
      updatedProject: Function;
      selectItemFirst: string;
      onlyEditOneItem: string;
      onlyCopyOneItem: string;
      onlyDeleteOneItem: string;
      deletedItem: Function;
      createdItem: string;
      updatedItem: Function;
      xlsxImportSuccess: string;
      selectCategoryFirst: string;
      chooseNameFirst: string;
      createNewConfig: string;
      configUpdated: string;
      configDelete: string;
    };
    warn: {
      lostServerConnection: string;
      wrongUserCreds: string;
      createUpdateErrorInField: Function;
      userDataIncomplete: string;
      failedFetchItem: Function;
      failedFetchProject: Function;
      xlsxTemplateDownloadFailed: string;
      xlsxUploadContentIncomplete: string;
      xlsxProcessError: string;
      noLogForThisDay: string;
      failedToFetchLog: string;
    };
  };
  main: {
    serverVersionNotSupported: string;
    noServerConnection: string;
    screenResolutionNotSupported: string;
    promptYes: string;
    promptNo: string;
    login: {
      usernamePlaceholder: string;
      passwordPlaceholder: string;
      loginButton: string;
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
  };
  dashboard: {
    boughtItemStatus: string;
    createdItems: string;
    timelineItems: string;
    labels: {
      active: string;
      created: string;
      open: string;
      requested: string;
      ordered: string;
      delivered: string;
      partial: string;
      late: string;
      canceled: string;
      lost: string;
    };
    months: {
      january: string;
      february: string;
      march: string;
      april: string;
      may: string;
      june: string;
      july: string;
      august: string;
      september: string;
      october: string;
      november: string;
      december: string;
    };
    banner: {
      showingItems: string;
    };
  };
  account: {
    banner: {
      myAccount: string;
      pat: string;
      patCreationWarning: string;
    };
    button: {
      myAccount: string;
      pat: string;
      save: string;
      newToken: string;
    };
    input: {
      usernamePlaceholder: string;
      fullNamePlaceholder: string;
      emailPlaceholder: string;
      passwordPlaceholder: string;
      patPlaceholder: string;
    };
  };
  project: {
    table: {
      number: string;
      id: string;
      projectNumber: string;
      productNumber: string;
      projectLink: string;
      customer: string;
      description: string;
      designatedUserID: string;
      createdDate: string;
      state: string;
    };
    input: {
      filterPlaceholder: string;
      projectNumberPlaceholder: string;
      productNumberPlaceholder: string;
      customerPlaceholder: string;
      descriptionPlaceholder: string;
      designateUserPlaceholder: string;
    };
    toggle: {
      projectState: string;
    };
    button: {
      newProject: string;
      editProject: string;
      deleteProject: string;
      unselect: string;
      sync: string;
      views: string;
      columns: string;
      clearFilter: string;
      create: string;
      update: string;
      cancel: string;
    };
    options: {
      showAll: string;
      views: {
        fixedHeight: string;
      };
      status: {
        active: string;
        inactive: string;
      };
    };
    prompt: {
      deleteProject: string;
    };
    banner: {
      notAllowedEditItemOtherUser: string;
    };
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
      batchCreate: string;
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
      createAll: string;
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
        changelog: string;
        rainbow: string;
        fixedHeight: string;
        // lockCols: string;
        textView: string;
        requestView: string;
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
    prompt: {
      deleteItem: string;
    };
    banner: {
      notAllowedEditItemInactiveProject: string;
      notAllowedEditItemOtherUser: string;
      notAllowedEditItemPlanned: string;
    };
  };
  tools: {
    banner: {
      stockCut1D: string;
      stockCut2D: string;
      definitions: string;
      solution: string;
      stock: string;
      items: string;
      panels: string;
    };
    buttons: {
      stockCut1D: string;
      stockCut2D: string;
      add: string;
      addPanel: string;
      addItem: string;
      solve: string;
      solving: string;
      exportPDF: string;
    };
    labels: {
      item: string;
      panel: string;
      stockLength: string;
      cutWidth: string;
      solverMethod: string;
      minimum: string;
      stockNumber: string;
      itemLength: string;
    };
    table: {
      cutLength: string;
      quantity: string;
      panelID: string;
      panelWidth: string;
      panelHeight: string;
      itemID: string;
      itemWidth: string;
      itemHeight: string;
      rotate: string;
      rotated: string;
    };
  };
  settings: {
    host: {
      selectorButton: string;
      banner: string;
      version: string;
      hostname: string;
      os: string;
      dbDiscSpace: string;
      backupDiscSpace: string;
      freeOf: string;
      notMounted: string;
    };
    config: {
      selectorButton: string;
      banner: string;
      create: string;
      update: string;
      button: {
        save: string;
        update: string;
        delete: string;
      };
      table: {
        category: string;
        name: string;
      };
    };
    logs: {
      selectorButton: string;
      banner: string;
      input: {
        datePlaceholder: string;
      };
      table: {
        number: string;
        timestamp: string;
        level: string;
        msg: string;
      };
    };
    users: {
      selectorButton: string;
      banner: string;
      create: string;
      update: string;
      button: {
        create: string;
        update: string;
      };
      input: {
        usernamePlaceholder: string;
        fullNamePlaceholder: string;
        mailPlaceholder: string;
        passwordPlaceholder: string;
      };
      toggle: {
        active: string;
        guestuser: string;
        superUser: string;
        adminUser: string;
      };
      table: {
        id: string;
        username: string;
        fullName: string;
        mail: string;
        active: string;
        superUser: string;
        adminUser: string;
        guestUser: string;
        createdDate: string;
      };
    };
    apiKeys: {
      selectorButton: string;
      banner: string;
      create: string;
      update: string;
    };
  };
}
