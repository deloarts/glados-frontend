import type { Language } from '@/models/language'

export const enGB: Language = {
  notification: {
    info: {
      reconnectedToServer: 'Reconnected to the server',
      welcomeMessage: (name: '') => {
        return `Welcome ${name}`
      },
      savedNewFilter: 'Saved new filter',
      createdNewPAT: 'Created new token',
      createdUser: 'Created new user',
      updatedUserData: 'Updated user data',
      cannotUpdateSystemUser: 'Systemuser cannot be updated',
      selectProjectFirst: 'Select a project first',
      onlyEditOneProject: 'You can only edit one project',
      onlyDeleteOneProject: 'You can only delete one project',
      deletedProject: (id: number) => {
        return `Deleted project #${id}`
      },
      createdProject: 'Project created',
      updatedProject: (id: number) => {
        return `Updated project #${id}`
      },
      selectItemFirst: 'Select an item first',
      onlyViewOneItem: 'You can only view one item',
      onlyEditOneItem: 'You can only edit one item',
      onlyCopyOneItem: 'You can only copy one item',
      onlyDeleteOneItem: 'You can only delete one item',
      deletedItem: (id: number) => {
        return `Deleted item #${id}`
      },
      createdItem: 'Created item',
      updatedItem: (id: number) => {
        return `Updated item #${id}`
      },
      createRowFirst: 'Create a row of data first',
      batchImportAllCreated: 'All items have been created',
      batchImportAllValidated: 'All items have been validated, you can create them now',
      batchImportValidationError: "Some items aren't valid, please correct them",
      xlsxImportSuccess: 'EXCEL import successful',
      selectCategoryFirst: 'Select a category first',
      chooseNameFirst: 'Choose a name first',
      createNewConfig: 'Created new config file',
      configUpdated: 'Updated config file',
      configDelete: 'Deleted config file',
      copiedUrlToClipboard: 'Copied URL to clipboard',
      createdApiKey: 'Created API key',
      deletedApiKey: 'Deleted API key',
    },
    warn: {
      lostServerConnection: 'Lost server connection',
      wrongUserCreds: 'Wrong login credentials',
      createUpdateErrorInField: (loc: '', msg: '') => {
        return `Error in field '${loc}': ${msg}`
      },
      userDataIncomplete: 'User data incomplete',
      failedFetchItem: (id: number) => {
        return `Could not fetch an item with the ID ${id}`
      },
      someFieldsNotFilled: "Some fields aren't filled correct",
      failedFetchProject: (id: number) => {
        return `Could not fetch a project with the ID ${id}`
      },
      xlsxTemplateDownloadFailed: 'Could not download template file.',
      xlsxUploadContentIncomplete: 'EXCEL file content is incomplete.',
      xlsxProcessError: 'Could not process excel file',
      batchImportAllFailed: 'No item has been created',
      batchImportSomeFailed: 'Some items have issues (all others have been created)',
      noLogForThisDay: 'There is no log file for this day',
      failedToFetchLog: 'Failed to fetch the log file',
      apiKeyDataIncomplete: 'Data incomplete',
    },
  },
  main: {
    serverVersionNotSupported: 'Server Version Not Supported',
    serverVersionNotSupportedSub: 'Try refreshing the page or contact the administrator',
    noServerConnection: 'No Server Connection',
    noServerConnectionSub: 'The connection will be re-established automatically',
    screenResolutionNotSupported: 'Screen Resolution Not Supported',
    screenResolutionNotSupportedSub: 'Please use a device with a higher resolution',
    promptYes: 'Yes',
    promptNo: 'No',
    buttonClose: 'Close',
    buttonCopyLink: 'Copy Link',
    login: {
      usernamePlaceholder: 'Username',
      passwordPlaceholder: 'Password',
      loginButton: 'Login',
    },
    sideBar: {
      logout: 'Logout',
      dashboard: 'Dashboard',
      projects: 'Projects',
      boughtItems: 'Bought Items',
      account: 'Account',
      tools: 'Tools',
      settings: 'Settings',
    },
    pagination: {
      first: 'First',
      previous: 'Previous',
      next: 'Next',
      last: 'Last',
    },
  },
  dashboard: {
    boughtItemStatus: 'Bought Items Status',
    createdItems: 'Created Items',
    timelineItems: 'Bought Items Timeline',
    labels: {
      active: 'Active',
      created: 'Created',
      open: 'Open',
      requested: 'Requested',
      ordered: 'Ordered',
      delivered: 'Delivered',
      partial: 'Partial',
      late: 'Late',
      canceled: 'Canceled',
      lost: 'Lost',
    },
    months: {
      january: 'JAN',
      february: 'FEB',
      march: 'MAR',
      april: 'APR',
      may: 'MAY',
      june: 'JUN',
      july: 'JUL',
      august: 'AUG',
      september: 'SEP',
      october: 'OCT',
      november: 'NOV',
      december: 'DEC',
    },
    banner: {
      showingItems: 'Showing all items that have been edited within the last 30 days.',
    },
  },
  account: {
    banner: {
      myAccount: 'My Account',
      pat: 'Personal Access Token',
      patCreationWarning: 'Creating a new token renders the current token invalid.',
      rfidInfo: 'There is a RFID tag linked to this account',
    },
    button: {
      myAccount: 'My Account',
      pat: 'Access Key',
      save: 'Save',
      newToken: 'New Token',
    },
    input: {
      usernamePlaceholder: 'Username',
      fullNamePlaceholder: 'Full Name',
      emailPlaceholder: 'Mail',
      passwordPlaceholder: 'Password',
      patPlaceholder: 'Secret Token',
    },
  },
  project: {
    table: {
      number: '#',
      id: 'ID',
      projectNumber: 'Project',
      productNumber: 'Product',
      projectLink: 'Link',
      customer: 'Customer',
      description: 'Description',
      designatedUserID: 'Designated User',
      createdDate: 'Created',
      state: 'State',
    },
    input: {
      filterPlaceholder: 'Filter',
      projectNumberPlaceholder: 'Project Number *',
      productNumberPlaceholder: 'Product Number',
      customerPlaceholder: 'Customer *',
      descriptionPlaceholder: 'Description *',
      designateUserPlaceholder: 'Designated User',
    },
    toggle: {
      projectState: 'Active',
    },
    button: {
      newProject: 'New Project',
      editProject: 'Edit Project',
      deleteProject: 'Delete',
      unselect: 'Unselect',
      sync: 'Synchronize',
      views: 'Views',
      columns: 'Columns',
      clearFilter: 'Clear Filter',
      create: 'Create',
      update: 'Update',
      cancel: 'Cancel',
    },
    options: {
      showAll: 'All',
      views: {
        fixedHeight: 'Fixed Height',
      },
      status: {
        active: 'Active',
        inactive: 'Inactive',
      },
    },
    prompt: {
      deleteProject: 'Delete Project?',
    },
    banner: {
      notAllowedEditItemOtherUser:
        'You are not allowed to edit a project of another designated user.',
    },
  },
  boughtItem: {
    table: {
      number: '#',
      id: 'ID',
      state: 'State',
      status: 'Status',
      projectNumber: 'Project',
      productNumber: 'Product',
      projectCustomer: 'Customer',
      projectDescription: 'Description',
      quantity: 'QTY',
      unit: 'Unit',
      weblink: 'Link',
      partnumber: 'Part Number',
      name: 'Item Name',
      orderNumber: 'Order Number',
      manufacturer: 'Manufacturer',
      supplier: 'Supplier',
      group1: 'Group',
      noteGeneral: 'Note',
      noteSupplier: 'Supplier Note',
      createdDate: 'Created',
      creatorID: 'Creator',
      desiredDate: 'Desired',
      requestedDate: 'Requested',
      requesterID: 'Requester',
      orderedDate: 'Ordered',
      ordererID: 'Orderer',
      expectedDate: 'Expected',
      deliveredDate: 'Delivered',
      receiverID: 'Receiver',
      arrivalWeeks: 'Arrival',
      totalWeeks: 'Total',
      storagePlace: 'Storage Place',
    },
    input: {
      filterPlaceholder: 'Filter',
      projectNumberPlaceholder: 'Project Number *',
      productNumberPlaceholder: 'Product Number',
      quantityPlaceholder: 'Quantity *',
      namePlaceholder: 'Item Name *',
      partnumberPlaceholder: 'Part Number *',
      orderNumberPlaceholder: 'Order Number *',
      manufacturerPlaceholder: 'Manufacturer *',
      supplierPlaceholder: 'Supplier',
      group1Placeholder: 'Group',
      weblinkPlaceholder: 'Weblink',
      desiredDatePlaceholder: 'Desired Delivery Date',
      noteGeneralPlaceholder: 'Note',
      noteSupplierPlaceholder: 'Note Supplier',
    },
    toggle: {
      notifyOnDelivery: 'Notify me on delivery',
      highPriority: 'High priority',
    },
    button: {
      newItem: 'New Item',
      editItem: 'Edit Item',
      copyItem: 'Copy Item',
      deleteItem: 'Delete Item',
      importExcel: 'Import Excel',
      exportExcel: 'Export Excel',
      unselect: 'Unselect',
      sync: 'Synchronize',
      view: 'View Item',
      views: 'Views',
      columns: 'Columns',
      saveFilter: 'Save Filter',
      loadFilter: 'Load Filter',
      clearFilter: 'Clear Filter',
      limit: 'Limit',
      sortBy: 'Sort By',
      preset: 'Preset',
      showAll: 'Show All',
      create: 'Create',
      createAll: 'Create All',
      validateAll: 'Validate',
      update: 'Update',
      cancel: 'Cancel',
      template: 'Template',
      batchCreate: 'Batch Create',
      newRow: 'New Row',
      removeAll: 'Clear All',
    },
    options: {
      showAll: 'All',
      views: {
        ignoreDelivered: 'Ignore Delivered',
        ignoreCanceled: 'Ignore Canceled',
        ignoreLost: 'Ignore Lost',
        changelog: 'Changelog',
        rainbow: 'Rainbow',
        fixedHeight: 'Fixed Height',
        // lockCols: "Lock Columns",
        textView: 'Text View',
        requestView: 'Request View',
      },
      status: {
        open: 'Open',
        requested: 'Requested',
        ordered: 'Ordered',
        late: 'Late',
        partial: 'Partial',
        delivered: 'Delivered',
        canceled: 'Canceled',
        lost: 'Lost',
      },
      orderBy: {
        id: 'ID',
        created: 'Created',
        project: 'Project',
        product: 'Product',
        group: 'Group',
        manufacturer: 'Manufacturer',
        supplier: 'Supplier',
      },
    },
    xlsx: {
      importValidationErrors: 'Import Validation Errors',
      errorInRow: 'Error in row #',
      dragHere: 'Drag your files here',
      dropHere: 'Drop them here',
      butReceived: 'but received',
      anEmptyCell: 'an empty cell',
    },
    changelog: {
      changelog: 'Changelog',
      changelogOfItem: 'Changelog of item #',
      tooManySelected: 'Too many items selected',
      nothingSelected: 'No item selected',
    },
    prompt: {
      deleteItem: 'Delete item?',
    },
    banner: {
      notAllowedEditItemInactiveProject:
        'You are not allowed to edit an item of an inactive project.',
      notAllowedEditItemOtherUser: 'You are not allowed to edit an item of another user.',
      notAllowedEditItemPlanned: 'You are not allowed to edit an item that is already planned.',
    },
  },
  tools: {
    banner: {
      stockCut1D: '1D Stock Cut Solver',
      stockCut2D: '2D Stock Cut Solver',
      definitions: 'Basic Definitions',
      solution: 'Solution',
      stock: 'Stock',
      items: 'Items',
      panels: 'Panels',
    },
    buttons: {
      stockCut1D: 'Stock Cut 1D',
      stockCut2D: 'Stock Cut 2D',
      add: 'Add',
      addPanel: 'Add Panel',
      addItem: 'Add Item',
      solve: 'Solve',
      solving: 'Solving ...',
      exportPDF: 'Export PDF',
    },
    labels: {
      item: 'Item',
      panel: 'Panel',
      stockLength: 'Stock Length',
      cutWidth: 'Cut Width',
      solverMethod: 'Method',
      minimum: 'Minimum',
      stockNumber: 'Stock #',
      itemLength: 'Item Length',
    },
    table: {
      cutLength: 'Cut Length',
      quantity: 'Quantity',
      panelID: 'Panel ID',
      panelWidth: 'Panel Width',
      panelHeight: 'Panel Height',
      itemID: 'Item ID',
      itemWidth: 'Item Width',
      itemHeight: 'Item Height',
      rotate: 'Rotate',
      rotated: 'Rotated',
    },
  },
  settings: {
    host: {
      selectorButton: 'Host',
      banner: 'Host Information',
      version: 'Version',
      hostname: 'Hostname',
      os: 'Operating System',
      dbDiscSpace: 'Database Disc Space',
      backupDiscSpace: 'Backup Disc Space',
      freeOf: ' free of ',
      notMounted: 'Not mounted',
    },
    config: {
      selectorButton: 'Config',
      banner: 'Configuration Files',
      create: 'Create Config',
      update: 'Update Config',
      button: {
        save: 'Save',
        update: 'Update',
        delete: 'Delete',
      },
      table: {
        category: 'Category',
        name: 'Name',
      },
    },
    logs: {
      selectorButton: 'Logs',
      banner: 'Log Files',
      input: {
        datePlaceholder: 'Select Date',
      },
      table: {
        number: '#',
        timestamp: 'Timestamp',
        level: 'Level',
        msg: 'Message',
      },
    },
    users: {
      selectorButton: 'Users',
      banner: 'User Management',
      create: 'Create User',
      update: 'Update User',
      button: {
        create: 'Create',
        update: 'Update',
      },
      input: {
        usernamePlaceholder: 'Username',
        fullNamePlaceholder: 'Full Name',
        mailPlaceholder: 'Mail',
        passwordPlaceholder: 'Password (at least 8 characters)',
        rfidPlaceholder: 'RFID',
      },
      toggle: {
        active: 'Active',
        guestuser: 'Guest',
        superUser: 'Superuser',
        adminUser: 'Admin',
      },
      table: {
        id: 'ID',
        username: 'Username',
        fullName: 'Full Name',
        mail: 'Mail',
        active: 'Active',
        superUser: 'Superuser',
        adminUser: 'Admin',
        guestUser: 'Guest',
        rfid: 'RFID',
        createdDate: 'Created',
      },
    },
    apiKeys: {
      selectorButton: 'API Keys',
      banner: 'API Key Management',
      create: 'Create Key',
      show: 'Show Key',
      warningMsg: 'API keys grant access to the system. Use with caution!',
      button: {
        create: 'Create',
        delete: 'Delete',
      },
      input: {
        namePlaceholder: 'Name',
        ExpirationDatePlaceholder: 'Expiration Date',
      },
      table: {
        id: 'ID',
        name: 'Name',
        apiKey: 'Key',
        created: 'Created',
        expirationDate: 'Expires',
        state: 'State',
      },
    },
  },
}
