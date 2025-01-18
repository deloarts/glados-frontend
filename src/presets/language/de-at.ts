import type { Language } from '@/models/language'

export const deAT: Language = {
  notification: {
    info: {
      reconnectedToServer: 'Serververbindung wiederhergestellt',
      welcomeMessage: (name: string) => {
        return `Willkommen ${name}`
      },
      savedNewFilter: 'Neuer Filter wurde gespeichert',
      createdNewPAT: 'Neuer geheimer Schlüssel wurde erstellt',
      createdUser: 'Benutzer wurde angelegt',
      updatedUserData: 'Benutzerdaten wurden aktualisiert',
      cannotUpdateSystemUser: 'Der Systembenutzer kann nicht geändert werden',
      selectProjectFirst: 'Wähle zuerst ein Projekt aus',
      onlyEditOneProject: 'Du kannst nur ein Projekt bearbeiten',
      onlyDeleteOneProject: 'Du kannst nur ein Projekt löschen',
      deletedProject: (id: number) => {
        return `Projekt #${id} wurde gelöscht`
      },
      createdProject: 'Projekt wurde angelegt',
      updatedProject: (id: number) => {
        return `Projekt #${id} wurde aktualisiert`
      },
      selectItemFirst: 'Wähle zuerst einen Artikel aus',
      onlyViewOneItem: 'Du kannst nur einen Artikel einsehen',
      onlyEditOneItem: 'Du kannst nur einen Artikel bearbeiten',
      onlyCopyOneItem: 'Du kannst nur einen Artikel kopieren',
      onlyDeleteOneItem: 'Du kannst nur einen Artikel löschen',
      deletedItem: (id: number) => {
        return `Artikel #${id} wurde gelöscht`
      },
      createdItem: 'Artikel wurde erstellt',
      updatedItem: (id: number) => {
        return `Artikel #${id} wurde aktualisiert`
      },
      createRowFirst: 'Füge zuerst eine Reihe an Daten hinzu',
      batchImportAllCreated: 'Alle Artikel wurden erstellt',
      batchImportAllValidated: 'Alle Artikel positiv validiert, du kannst sie nun erstellen',
      batchImportValidationError: 'Einige Artikel weisen Fehler auf, bitte korrigiere diese',
      xlsxImportSuccess: 'Excel-Datei erfolgreich importiert',
      selectCategoryFirst: 'Wähle zuerst eine Kategorie',
      chooseNameFirst: 'Gib zuerst einen Namen an',
      createNewConfig: 'Neue Konfigurationsdatei wurde erstellt',
      configUpdated: 'Konfiguration aktualisiert',
      configDelete: 'Konfiguration gelöscht',
      copiedUrlToClipboard: 'URL wurde kopiert',
      createdApiKey: 'API Schlüssel wurde erstellt',
      deletedApiKey: 'API Schlüssel wurde gelöscht',
    },
    warn: {
      lostServerConnection: 'Keine Verbindung zum Server',
      wrongUserCreds: 'Zugangsdaten nicht korrket',
      createUpdateErrorInField: (loc: string, msg: string) => {
        return `Fehler im Feld '${loc}': ${msg}`
      },
      userDataIncomplete: 'Benuterdaten sind unvollständig',
      failedFetchItem: (id: number) => {
        return `Der Artikel #${id} kann nicht geladen werden`
      },
      someFieldsNotFilled: "Some fields aren't filled correct",
      failedFetchProject: (id: number) => {
        return `Das Projekt #${id} kann nicht geladen werden`
      },
      xlsxTemplateDownloadFailed: 'Die Vorlage kann nicht geladen werden',
      xlsxUploadContentIncomplete: 'Der Inhalt der Datei ist unvollständig',
      xlsxProcessError: 'Fehler beim Verarbeiten der Datei',
      batchImportAllFailed: 'Kein Artikel wurde erstellt',
      batchImportSomeFailed: 'Einige Artikel sind fehlerhaft (alle anderen wurden erstellt)',
      noLogForThisDay: 'Für diesen Tag existiert keine Log-Datei',
      failedToFetchLog: 'Fehler beim Laden der Log-Datei',
      apiKeyDataIncomplete: 'Daten unvollständig',
    },
  },
  main: {
    serverVersionNotSupported: 'Server Version nicht unterstützt',
    serverVersionNotSupportedSub: 'Bitte aktualisiere die Seite',
    noServerConnection: 'Keine Serververbindung',
    noServerConnectionSub: 'Die Verbindung wird automatisch wiederhergestellt',
    screenResolutionNotSupported: 'Bildschirmauflösung nicht unterstützt',
    screenResolutionNotSupportedSub: 'Das Endgerät verfügt nicht über die nötige Breite',
    promptYes: 'Ja',
    promptNo: 'Nein',
    buttonClose: 'Schließen',
    buttonCopyLink: 'Link kopieren',
    login: {
      usernamePlaceholder: 'Benutzername',
      passwordPlaceholder: 'Passwort',
      loginButton: 'Anmelden',
    },
    sideBar: {
      logout: 'Ausloggen',
      dashboard: 'Übersicht',
      projects: 'Projekte',
      boughtItems: 'Zukaufteile',
      account: 'Konto',
      tools: 'Werkzeuge',
      settings: 'Einstellungen',
    },
    pagination: {
      first: 'Erste',
      previous: 'Vorherige',
      next: 'Nächste',
      last: 'Letzte',
    },
  },
  dashboard: {
    boughtItemStatus: 'Artikel-Status',
    createdItems: 'Artikel-Anforderer',
    timelineItems: 'Artikel-Zeitverlauf',
    labels: {
      active: 'Aktiv',
      created: 'Erstellt',
      open: 'Offen',
      requested: 'Angefragt',
      ordered: 'Bestellt',
      delivered: 'Geliefert',
      partial: 'Teillieferung',
      late: 'Verspätet',
      canceled: 'Storniert',
      lost: 'Unauffindbar',
    },
    months: {
      january: 'JÄN',
      february: 'FEB',
      march: 'MÄR',
      april: 'APR',
      may: 'MAI',
      june: 'JUN',
      july: 'JUL',
      august: 'AUG',
      september: 'SEP',
      october: 'OKT',
      november: 'NOV',
      december: 'DEZ',
    },
    banner: {
      showingItems: 'Ansicht aller Artikel, die in den letzten 30 Tagen bearbeitet wurden.',
    },
  },
  account: {
    banner: {
      myAccount: 'Mein Konto',
      pat: 'Personalisierter Schlüssel',
      patCreationWarning:
        'Beim Erstellen eines neuen Schlüssels wird der aktuelle Schlüssel ungültig.',
      rfidInfo: 'Zu deinem Konto ist ein RFID-Chip zugewiesen',
    },
    button: {
      myAccount: 'Mein Konto',
      pat: 'Schlüssel',
      save: 'Speichern',
      newToken: 'Generieren',
    },
    input: {
      usernamePlaceholder: 'Benutzername',
      fullNamePlaceholder: 'Vollständiger Name',
      emailPlaceholder: 'E-Mail',
      passwordPlaceholder: 'Passwort',
      languagePlaceholder: 'Sprache',
      patPlaceholder: 'Geheimer Schlüssel',
    },
  },
  project: {
    table: {
      number: '#',
      id: 'ID',
      projectNumber: 'Projekt',
      productNumber: 'Produkt',
      projectLink: 'Link',
      customer: 'Kunde',
      description: 'Beschreibung',
      designatedUserID: 'Zugewiesener User',
      createdDate: 'Erstellt',
      state: 'Status',
    },
    input: {
      filterPlaceholder: 'Filter',
      projectNumberPlaceholder: 'Projektnummer',
      productNumberPlaceholder: 'Produktnummer',
      customerPlaceholder: 'Kunde',
      descriptionPlaceholder: 'Beschreibung',
      designateUserPlaceholder: 'Zugewiesener Benutzer',
    },
    toggle: {
      projectState: 'Aktiv',
    },
    button: {
      newProject: 'Anlegen',
      editProject: 'Bearbeiten',
      deleteProject: 'Löschen',
      unselect: 'Abwählen',
      sync: 'Laden',
      views: 'Ansichten',
      columns: 'Spalten',
      clearFilter: 'Löschen',
      create: 'Erstellen',
      update: 'Aktualisieren',
      cancel: 'Abbrechen',
    },
    options: {
      showAll: 'Alle',
      views: {
        fixedHeight: 'Fixe Höhe',
      },
      status: {
        active: 'Aktiv',
        inactive: 'Inaktiv',
      },
    },
    prompt: {
      deleteProject: 'Projekt löschen?',
    },
    banner: {
      notAllowedEditItemOtherUser:
        'Du kannst das Projekt eines anderen zugewiesenen Benutzers nicht ändern.',
    },
  },
  boughtItem: {
    table: {
      number: '#',
      id: 'ID',
      state: 'Zustand',
      status: 'Status',
      projectNumber: 'Projekt',
      productNumber: 'Produkt',
      projectCustomer: 'Kunde',
      projectDescription: 'Beschreibung',
      quantity: 'Menge',
      unit: 'Einheit',
      weblink: 'Link',
      partnumber: 'Teilenummer',
      name: 'Artikelbezeichnung',
      orderNumber: 'Bestellnummer',
      manufacturer: 'Hersteller',
      supplier: 'Lieferant',
      group1: 'Gruppe',
      noteGeneral: 'Anmerkung',
      noteSupplier: 'Lieferantenhinweis',
      createdDate: 'Erstellt',
      creatorID: 'Ersteller',
      desiredDate: 'Gewünscht',
      requestedDate: 'Angefragt',
      requesterID: 'Anforderer',
      orderedDate: 'Bestellt',
      ordererID: 'Besteller',
      expectedDate: 'Erwartet',
      deliveredDate: 'Geliefert',
      receiverID: 'Empfänger',
      arrivalWeeks: 'Ankunft',
      totalWeeks: 'Gesamt',
      storagePlace: 'Lagerort',
    },
    input: {
      filterPlaceholder: 'Filter',
      statusPlaceholder: 'Status',
      projectNumberPlaceholder: 'Projektnummer',
      productNumberPlaceholder: 'Produktnummer',
      quantityPlaceholder: 'Menge',
      unitPlaceholder: 'Einheit',
      namePlaceholder: 'Artikelbezeichnung',
      partnumberPlaceholder: 'Teilenummer',
      orderNumberPlaceholder: 'Bestellnummer',
      manufacturerPlaceholder: 'Hersteller',
      supplierPlaceholder: 'Lieferant',
      group1Placeholder: 'Gruppe',
      weblinkPlaceholder: 'Link',
      createdDate: 'Erstelldatum',
      creator: 'Ersteller',
      orderedDate: 'Bestelldatum',
      orderer: 'Besteller',
      deliveryDate: 'Lieferdatum',
      receiver: 'Empfänger',
      desiredDatePlaceholder: 'Gewünschtes Lieferdatum',
      expectedDatePlaceholder: 'Erwartetes Lieferdatum',
      noteGeneralPlaceholder: 'Anmerkung',
      noteSupplierPlaceholder: 'Lieferantenhinweis',
    },
    toggle: {
      notifyOnDelivery: 'Benachrichtige mich bei Lieferung',
      highPriority: 'Hohe Priorität',
    },
    button: {
      newItem: 'Neuer Artikel',
      editItem: 'Bearbeiten',
      copyItem: 'Kopieren',
      deleteItem: 'Löschen',
      importExcel: 'Importieren',
      exportExcel: 'Exportieren',
      unselect: 'Abwählen',
      sync: 'Laden',
      view: 'Detailansicht',
      views: 'Ansichten',
      columns: 'Spalten',
      saveFilter: 'Speichern',
      loadFilter: 'Laden',
      clearFilter: 'Löschen',
      limit: 'Limit',
      sortBy: 'Sortieren: ',
      preset: 'Voreinstellung',
      showAll: 'Zeige Alle',
      create: 'Erstellen',
      createAll: 'Alle Erstellen',
      validateAll: 'Validieren',
      update: 'Aktualisieren',
      cancel: 'Abbrechen',
      template: 'Vorlage',
      batchCreate: 'Multi-Import',
      newRow: 'Neue Reihe',
      removeAll: 'Alle leeren',
    },
    options: {
      showAll: 'Alle',
      views: {
        ignoreDelivered: 'Ignoriere Geliefert',
        ignoreCanceled: 'Ignoriere Storniert',
        ignoreLost: 'Ignoriere Unauffindbar',
        changelog: 'Änderunsindex',
        rainbow: 'Farbansicht',
        fixedHeight: 'Fixe Höhe',
        // lockCols: "Fixe Spalten",
        textView: 'Textansicht',
        requestView: 'Anforderungsansicht',
      },
      status: {
        open: 'Offen',
        requested: 'Angefragt',
        ordered: 'Bestellt',
        late: 'Verspätet',
        partial: 'Teillieferung',
        delivered: 'Geliefert',
        canceled: 'Storniert',
        lost: 'Unauffindbar',
      },
      orderBy: {
        id: 'ID',
        created: 'Erstellt',
        project: 'Projekt',
        product: 'Produkt',
        group: 'Gruppe',
        manufacturer: 'Hersteller',
        supplier: 'Lieferant',
      },
    },
    xlsx: {
      importValidationErrors: 'Validierungsfehler',
      errorInRow: 'Fehler in Zeile #',
      dragHere: 'Zieh die Datei hierher',
      dropHere: 'Lass die Datei aus',
      butReceived: 'ist aber',
      anEmptyCell: 'eine leere Zelle',
    },
    changelog: {
      changelog: 'Änderungsindex',
      changelogOfItem: 'Änderungsindex von Artikel #',
      tooManySelected: 'Zu viele Artikel ausgewählt',
      nothingSelected: 'Kein Artikel ausgewählt',
    },
    prompt: {
      deleteItem: 'Artikel löschen?',
    },
    banner: {
      notAllowedEditItemInactiveProject:
        'Du kannst keinen Artikel eines inaktiven Projekts ändern.',
      notAllowedEditItemOtherUser: 'Du kannst keinen Artikel eines anderen Benutzers ändern.',
      notAllowedEditItemPlanned: 'Du kannst keinen bereits geplanten Artikel ändern.',
    },
  },
  tools: {
    banner: {
      stockCut1D: '1D Schnitt-Löser',
      stockCut2D: '2D Schnitt-Löser',
      definitions: 'Basisdaten',
      solution: 'Lösung',
      stock: 'Material',
      items: 'Elemente',
      panels: 'Platten',
    },
    buttons: {
      stockCut1D: '1D Schnitt',
      stockCut2D: '2D Schnitt',
      add: 'Hinzufügen',
      addPanel: 'Platte',
      addItem: 'Element',
      solve: 'Lösen',
      solving: 'Wird gelöst ...',
      exportPDF: 'PDF',
    },
    labels: {
      item: 'Element',
      panel: 'Platte',
      stockLength: 'Materiallänge',
      cutWidth: 'Schnittbreite',
      solverMethod: 'Methode',
      minimum: 'Minimum',
      stockNumber: 'Material #',
      itemLength: 'Elementlänge',
    },
    table: {
      cutLength: 'Schnittlänge',
      quantity: 'Menge',
      panelID: 'Platten-ID',
      panelWidth: 'Plattenbreite',
      panelHeight: 'Plattenhöhe',
      itemID: 'Element-ID',
      itemWidth: 'Elementbreite',
      itemHeight: 'Elementhöhe',
      rotate: 'Drehen',
      rotated: 'Gedreht',
    },
  },
  settings: {
    host: {
      selectorButton: 'Host',
      banner: 'Host-Informationen',
      version: 'Version',
      hostname: 'Hostname',
      os: 'Betriebssystem',
      dbDiscSpace: 'Datenbank-Speicherplatz',
      backupDiscSpace: 'Backup-Speicherplatz',
      freeOf: ' frei von ',
      notMounted: 'Nicht verbunden',
    },
    config: {
      selectorButton: 'Konfiguration',
      banner: 'Konfigurationsdateien',
      create: 'Erstellen',
      update: 'Aktualisiere ',
      button: {
        save: 'Speichern',
        update: 'Aktualisieren',
        delete: 'Löschen',
      },
      table: {
        category: 'Kategorie',
        name: 'Name',
      },
    },
    logs: {
      selectorButton: 'Protokolle',
      banner: 'Protokolldateien',
      input: {
        datePlaceholder: 'Datum auswählen',
      },
      table: {
        number: '#',
        timestamp: 'Zeitstempel',
        level: 'Level',
        msg: 'Eintrag',
      },
    },
    users: {
      selectorButton: 'Benutzer',
      banner: 'Benutzerverwaltung',
      create: 'Benutzer anlegen',
      update: 'Aktualisiere Benutzer',
      button: {
        create: 'Erstellen',
        update: 'Aktualisieren',
      },
      input: {
        usernamePlaceholder: 'Benutzername',
        fullNamePlaceholder: 'Vollständiger Name',
        mailPlaceholder: 'E-Mail',
        passwordPlaceholder: 'Passwort',
        rfidPlaceholder: 'RFID',
      },
      toggle: {
        active: 'Aktiv',
        guestuser: 'Gast',
        superUser: 'Superuser',
        adminUser: 'Administrator',
      },
      table: {
        id: 'ID',
        username: 'Benutzername',
        fullName: 'Vollständiger Name',
        mail: 'E-Mail',
        active: 'Aktiv',
        superUser: 'Superuser',
        adminUser: 'Admin',
        guestUser: 'Gast',
        rfid: 'RFID',
        createdDate: 'Erstelldatum',
      },
    },
    apiKeys: {
      selectorButton: 'API-Schlüssel',
      banner: 'API-Schlüsselverwaltung',
      create: 'Schlüssel erstellen',
      show: 'Schlüssel einsehen',
      warningMsg:
        'API Schlüssel erlauben Zugriff auf das System. Verwende die Schlüssel mit Vorsicht!',
      button: {
        create: 'Erstellen',
        delete: 'Löschen',
      },
      input: {
        namePlaceholder: 'Name',
        ExpirationDatePlaceholder: 'Ablaufdatum',
      },
      table: {
        id: 'ID',
        name: 'Name',
        apiKey: 'Schlüssel',
        created: 'Erstelldatum',
        expirationDate: 'Ablaufdatum',
        state: 'Status',
      },
    },
  },
  tooltips: {
    productNumberIsFromProject: 'Die Produktnummer wird vom Projekt geladen',
  },
}
