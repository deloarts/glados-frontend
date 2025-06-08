/* eslint-disable @typescript-eslint/no-unsafe-function-type */

export interface Language {
  common: {
    days: {
      monday: string
      tuesday: string
      wednesday: string
      thursday: string
      friday: string
      saturday: string
      sunday: string
    }
    shortDays: {
      monday: string
      tuesday: string
      wednesday: string
      thursday: string
      friday: string
      saturday: string
      sunday: string
    }
    months: {
      january: string
      february: string
      march: string
      april: string
      may: string
      june: string
      july: string
      august: string
      september: string
      october: string
      november: string
      december: string
    }
    shortMonths: {
      january: string
      february: string
      march: string
      april: string
      may: string
      june: string
      july: string
      august: string
      september: string
      october: string
      november: string
      december: string
    }
  }
  notification: {
    info: {
      reconnectedToServer: string
      welcomeMessage: Function
      loggedInNow: string
      loggedOutNow: string
      savedNewFilter: string
      createdNewPAT: string
      createdUser: string
      createdEntry: string
      updatedUserData: string
      onlyAdminCanChangeUsername: string
      updatedEntry: string
      cannotUpdateSystemUser: string
      selectEntryFirst: string
      selectProjectFirst: string
      onlyEditOneEntry: string
      onlyEditOneProject: string
      onlyExportOneProject: string
      onlyDeleteOneEntry: string
      onlyDeleteOneProject: string
      deletedEntry: Function
      deletedProject: Function
      createdProject: string
      updatedProject: Function
      selectItemFirst: string
      onlyViewOneItem: string
      onlyEditOneItem: string
      onlyCopyOneItem: string
      onlyDeleteOneItem: string
      deletedItem: Function
      createdItem: string
      updatedItem: Function
      createRowFirst: string
      batchImportAllCreated: string
      batchImportAllValidated: string
      batchImportValidationError: string
      xlsxImportSuccess: string
      selectCategoryFirst: string
      chooseNameFirst: string
      createNewConfig: string
      configUpdated: string
      configDelete: string
      copiedUrlToClipboard: string
      createdApiKey: string
      deletedApiKey: string
      sentTestMail: string
      removeCardToLogout: string
    }
    warn: {
      lostServerConnection: string
      accountInactive: string
      wrongUserCreds: string
      wrongRFIDCreds: string
      createUpdateErrorInField: Function
      userDataIncomplete: string
      failedFetchItem: Function
      someFieldsNotFilled: string
      failedFetchProject: Function
      xlsxTemplateDownloadFailed: string
      xlsxUploadContentIncomplete: string
      xlsxProcessError: string
      projectNumberNotFound: string
      batchImportAllFailed: string
      batchImportSomeFailed: string
      noLogForThisDay: string
      failedToFetchLog: string
      apiKeyDataIncomplete: string
      mailingDisabled: string
      receiverNotGiven: string
      passwordCannotBeEmpty: string
      passwordsDontMatch: string
      rfidDeviceDisconnected: string
      rfidHostDisconnected: string
      rfidDisabled: string
    }
  }
  main: {
    serverVersionNotSupported: string
    serverVersionNotSupportedSub: string
    noServerConnection: string
    noServerConnectionSub: string
    screenResolutionNotSupported: string
    screenResolutionNotSupportedSub: string
    promptYes: string
    promptNo: string
    buttonClose: string
    buttonCopyLink: string
    inputSearch: string
    inputSearchNoItems: string
    login: {
      usernamePlaceholder: string
      passwordPlaceholder: string
      loginButton: string
    }
    sideBar: {
      logout: string
      dashboard: string
      projects: string
      boughtItems: string
      account: string
      userTime: string
      tools: string
      settings: string
    }
    pagination: {
      first: string
      previous: string
      next: string
      last: string
    }
  }
  dashboard: {
    boughtItemStatus: string
    createdItems: string
    timelineItems: string
    labels: {
      active: string
      created: string
      open: string
      requested: string
      ordered: string
      delivered: string
      partial: string
      late: string
      canceled: string
      lost: string
    }
    banner: {
      showingItems: string
    }
  }
  account: {
    banner: {
      myAccount: string
      security: string
      permissions: string
      pat: string
      patCreationWarning: string
      patInfo: string
      rfidInfo: string
      userTimeInfo: string
    }
    button: {
      myAccount: string
      security: string
      permissions: string
      pat: string
      save: string
      undo: string
      newToken: string
    }
    option: {
      logMeOut: string
      keepMeLoggedIn: string
    }
    input: {
      usernamePlaceholder: string
      fullNamePlaceholder: string
      emailPlaceholder: string
      workHoursPerWeekPlaceholder: string
      autoBreakFromPlaceholder: string
      autoBreakToPlaceholder: string
      autoLogoutPlaceholder: string
      languagePlaceholder: string
      themePlaceholder: string
      passwordPlaceholder: string
      passwordRetypePlaceholder: string
      patPlaceholder: string
      autoBreakByDay: string
      autoBreakMon: string
      autoBreakTue: string
      autoBreakWed: string
      autoBreakThu: string
      autoBreakFri: string
      autoBreakSat: string
      autoBreakSun: string
    }
    permissions: {
      normalUser: string
      superUser: string
      adminUser: string
      guestUser: string
      yourPermissionLevel: string
      yourPermissionProjects: string
      yourPermissionItems: string
      yourPermissionUsers: string
      yourPermissionUserTime: string
      yourPermissionSettings: string
      readOwnProjects: string
      readOtherProjects: string
      createProjects: string
      editOwnProjects: string
      editOtherProjects: string
      assignOtherUserToProject: string
      deleteProjects: string
      readOwnItems: string
      readOtherItems: string
      createItems: string
      editOwnItems: string
      editOtherItems: string
      editPlannedItems: string
      deleteOwnItems: string
      deleteOtherItems: string
      createUsers: string
      editUsers: string
      deleteUsers: string
      readOwnUserTime: string
      readOtherUserTime: string
      createUserTime: string
      editOwnUserTime: string
      editOtherUserTime: string
      deleteOwnUserTime: string
      deleteOtherUserTime: string
      readSettings: string
      editSettings: string
    }
  }
  project: {
    table: {
      number: string
      id: string
      projectNumber: string
      productNumber: string
      projectLink: string
      customer: string
      description: string
      designatedUserID: string
      createdDate: string
      state: string
    }
    input: {
      filterPlaceholder: string
      projectNumberPlaceholder: string
      productNumberPlaceholder: string
      customerPlaceholder: string
      descriptionPlaceholder: string
      designateUserPlaceholder: string
    }
    toggle: {
      projectState: string
    }
    button: {
      newProject: string
      editProject: string
      deleteProject: string
      unselect: string
      sync: string
      views: string
      columns: string
      clearFilter: string
      create: string
      update: string
      cancel: string
      undo: string
    }
    options: {
      showAll: string
      views: {
        fixedHeight: string
      }
      status: {
        active: string
        inactive: string
      }
    }
    prompt: {
      deleteProject: string
    }
    banner: {
      notAllowedEditItemOtherUser: string
    }
  }
  boughtItem: {
    table: {
      number: string
      id: string
      state: string
      status: string
      projectNumber: string
      productNumber: string
      projectCustomer: string
      projectDescription: string
      quantity: string
      unit: string
      weblink: string
      partnumber: string
      name: string
      orderNumber: string
      manufacturer: string
      supplier: string
      group1: string
      noteGeneral: string
      noteSupplier: string
      createdDate: string
      creatorID: string
      desiredDate: string
      requestedDate: string
      requesterID: string
      orderedDate: string
      ordererID: string
      expectedDate: string
      deliveredDate: string
      receiverID: string
      arrivalWeeks: string
      totalWeeks: string
      storagePlace: string
    }
    input: {
      filterPlaceholder: string
      statusPlaceholder: string
      projectNumberPlaceholder: string
      productNumberPlaceholder: string
      quantityPlaceholder: string
      unitPlaceholder: string
      namePlaceholder: string
      partnumberPlaceholder: string
      orderNumberPlaceholder: string
      manufacturerPlaceholder: string
      supplierPlaceholder: string
      group1Placeholder: string
      weblinkPlaceholder: string
      createdDate: string
      creator: string
      orderedDate: string
      orderer: string
      deliveryDate: string
      receiver: string
      storage: string
      desiredDatePlaceholder: string
      expectedDatePlaceholder: string
      noteGeneralPlaceholder: string
      noteSupplierPlaceholder: string
    }
    toggle: {
      notifyOnDelivery: string
      highPriority: string
    }
    button: {
      newItem: string
      editItem: string
      copyItem: string
      deleteItem: string
      importExcel: string
      exportExcel: string
      unselect: string
      sync: string
      view: string
      views: string
      columns: string
      saveFilter: string
      loadFilter: string
      clearFilter: string
      limit: string
      sortBy: string
      preset: string
      showAll: string
      create: string
      createAll: string
      validateAll: string
      update: string
      cancel: string
      undo: string
      template: string
      batchCreate: string
      newRow: string
      removeAll: string
    }
    options: {
      showAll: string
      views: {
        ignoreDelivered: string
        ignoreCanceled: string
        ignoreLost: string
        changelog: string
        rainbow: string
        fixedHeight: string
        // lockCols: string;
        textView: string
        requestView: string
      }
      status: {
        open: string
        requested: string
        ordered: string
        late: string
        partial: string
        delivered: string
        canceled: string
        lost: string
      }
      orderBy: {
        id: string
        created: string
        project: string
        product: string
        group: string
        manufacturer: string
        supplier: string
      }
    }
    xlsx: {
      importValidationErrors: string
      errorInRow: string
      dropHere: string
      dragHere: string
      butReceived: string
      anEmptyCell: string
    }
    changelog: {
      changelog: string
      changelogOfItem: string
      tooManySelected: string
      nothingSelected: string
    }
    prompt: {
      deleteItem: string
    }
    banner: {
      notAllowedEditItemInactiveProject: string
      notAllowedEditItemOtherUser: string
      notAllowedEditItemPlanned: string
    }
  }
  userTime: {
    common: {
      totalHoursThisWeek: string
      sumForThisWeek: string
      entriesForThisWeek: string
    }
    warnings: {
      cannotCreateWhileLoggedIn: string
      loginMustBeProvided: string
      loginMustBeToday: string
      loginAfterLogout: string
    }
    table: {
      number: string
      id: string
      week: string
      day: string
      date: string
      login: string
      logout: string
      duration: string
      note: string
    }
    input: {
      filterPlaceholder: string
      datePlaceholder: string
      loginPlaceholder: string
      logoutPlaceholder: string
      notePlaceholder: string
    }
    button: {
      login: string
      logout: string
      newEntry: string
      editEntry: string
      deleteEntry: string
      unselect: string
      sync: string
      views: string
      columns: string
      clearFilter: string
      create: string
      update: string
      cancel: string
      undo: string
    }
    options: {
      showAll: string
      views: {
        fixedHeight: string
      }
    }
    prompt: {
      deleteEntry: string
    }
  }
  tools: {
    banner: {
      stockCut1D: string
      stockCut2D: string
      definitions: string
      solution: string
      stock: string
      items: string
      panels: string
    }
    buttons: {
      stockCut1D: string
      stockCut2D: string
      add: string
      addPanel: string
      addItem: string
      solve: string
      solving: string
      exportPDF: string
    }
    labels: {
      item: string
      panel: string
      stockLength: string
      cutWidth: string
      solverMethod: string
      minimum: string
      stockNumber: string
      itemLength: string
    }
    table: {
      cutLength: string
      quantity: string
      panelID: string
      panelWidth: string
      panelHeight: string
      itemID: string
      itemWidth: string
      itemHeight: string
      rotate: string
      rotated: string
    }
  }
  settings: {
    license: {
      selectorButton: string
      banner: string
    }
    host: {
      selectorButton: string
      banner: string
      version: string
      hostname: string
      os: string
      dbDiscSpace: string
      backupDiscSpace: string
      freeOf: string
      notMounted: string
    }
    config: {
      selectorButton: string
      warning: string
      banner: string
      create: string
      update: string
      button: {
        save: string
        update: string
        delete: string
      }
      table: {
        category: string
        name: string
      }
    }
    logs: {
      selectorButton: string
      banner: string
      input: {
        datePlaceholder: string
      }
      table: {
        number: string
        timestamp: string
        level: string
        msg: string
      }
    }
    users: {
      selectorButton: string
      banner: string
      create: string
      update: string
      button: {
        create: string
        update: string
      }
      input: {
        usernamePlaceholder: string
        fullNamePlaceholder: string
        mailPlaceholder: string
        passwordPlaceholder: string
        rfidPlaceholder: string
      }
      toggle: {
        active: string
        guestuser: string
        superUser: string
        adminUser: string
      }
      table: {
        id: string
        username: string
        fullName: string
        mail: string
        active: string
        superUser: string
        adminUser: string
        guestUser: string
        rfid: string
        createdDate: string
      }
    }
    mailing: {
      selectorButton: string
      banner: string
      setupInfo: string
      button: {
        sendTestMail: string
      }
      input: {
        serverPlaceholder: string
        portPlaceholder: string
        accountPlaceholder: string
        receiverPlaceholder: string
      }
    }
    apiKeys: {
      selectorButton: string
      banner: string
      create: string
      show: string
      warningMsg: string
      button: {
        create: string
        delete: string
      }
      input: {
        namePlaceholder: string
        ExpirationDatePlaceholder: string
      }
      table: {
        id: string
        name: string
        apiKey: string
        created: string
        expirationDate: string
        state: string
      }
    }
  }
  tooltips: {
    productNumberIsFromProject: string
  }
}
