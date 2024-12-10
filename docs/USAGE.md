# usage

## 1 login

Right after the installation you have to login with the credentials from the system user. These are the credentials from the system user you provided in the `config.yml` file from the backend.

![Login](/docs/images/login.png)

The username for the system user is always `system`.

## 2 dashboard

The dashboard gives a glimpse about the current status of all active items.

![Dashboard](/docs/images/dashboard.png)

> ✏️ An item is active if it has been edited within the past 30 days

## 3 projects

An item can only be assigned to an active project. Therefore you need to create a project first, if you want to create items. This is done in the projects-view of glados:

![Projects](/docs/images/projects.png)

The projects-view provides an overview of every project in the database. Columns can be hidden, this is done by clicking on the `Columns` button and en- or disabling columns.

![Project](/docs/images/projects-columns.png)

### 3.1 creating a project

To create a new project, click `New Project` in the upper left corner. A project must have a `project number` and a user must be assigned to it. When creating a project, the `project number` and the `product number` must follow certain rules. These rules are set in the `config.yml` file of the backend.

![Projects](/docs/images/projects-new.png)

### 3.2 project-rules for users

#### 3.2.1 user

- A **user** can create projects, but cannot assign other users as designated user
- A **user** can edit their assigned projects

### 3.2.2 superuser

- A **superuser** can create, edit and delete projects and can assign other users as designated user
- A **superuser** can edit their projects

### 3.2.3 adminuser

- A **adminuser** can create, edit and delete projects and can assign other users as designated user
- A **adminuser** can edit their projects

### 3.2.4 guestuser

- A **guestuser** can only view projects (cannot create, nor edit, nor delete)

## 4 bought items

Head over to the bought-items-view to see all items created by all users.

![Bought Items](/docs/images/bought-items.png)

> ✏️ If you prefer glados in day mode: You can change the theme in the quick menu in the upper right corner. The same applies for the language, but currently only english and german are supported

![Bought Items](/docs/images/bought-items-day-mode.png)

The items-view provides an overview of all items, but if you're only interested in certain columns, you can en- or disable as you please:

![Bought Items Columns](/docs/images/bought-items-columns.png)

If you want to filter those columns, you can do that as well:

![Bought Items Filter](/docs/images/bought-items-filters.png)

> ✏️ As long as a filter isn't applied yet, the text appears in *italic*. Press enter to activate the filter. To reset all filters, click the `Clear Filter` button.
>
> ✏️ For advanced usage: Making a right-mouse-button-click on an item in the list will set that text automatically as column filter. And a right-mouse-button-click on a filter clears it.

Users with the permission level `superuser` or higher are allowed to edit items directly in the table. These users can select multiple rows (`shift` and click or `ctrl` and click) and edit multiple items at once. E.g.: Changing the status of three items at once:

![Bought Items Multiselect](/docs/images/bought-items-change-status.gif)

Glados provides a `rainbow view` which allows the user to use different colors for an item state. The rainbow view makes it easy not to overlook an item. Enable the rainbow-view by clicking on the `Views` button.

![Bought Items Rainbow View](/docs/images/bought-items-rainbow.png)

Glados provides a `changelog view`. This allows all user to see what changes an item has made since its creation. Enable the changelog-view by clicking on the `Views` button.

![Bought Items Changelog View](/docs/images/bought-items-changelog.png)

### 4.1 creating a bought item

Create a new item by clicking on the `New Item` button in the upper left corner. Some fields are required, these are marked with an asterix-sign `*` in the field. As stated in the projects-chapter: A item does require an active project. The project dropdown only shows active projects.

> ✏️ Currently a user is allowed to create items to all active projects, this will change in the future

![Bought Item Create](/docs/images/bought-items-new.png)

After clicking the `Create` button the newly created item will appear in the items list:

![Bought Item Created](/docs/images/bought-items-new-created.png)

### 4.2 batch-creating multiple bought items

Glados offers the possibility to creating multiple items at once. To use this feature, click the `Batch Create` button, the you'll see the appropriate view:

![Bought Item Batch Create](/docs/images/bought-items-batch-create.png)

The view is empty. To add rows you can either click the `New Row` button and fill out the fields by hand, or you can upload a EXCEL file by clicking the `Import Excel` button and dropping the file.

![Bought Item EXCEL Import](/docs/images/bought-items-batch-import.gif)

The imported EXCEL file must have the certain header, meaning: Glados searches the excel file for keywords and extratcs the data automatically. For convenience you can click the `Template` button and receive a working template file. Fill it with your data to import and you're good to go.

![Bought Item Import Template](/docs/images/bought-items-batch-create-template.png)

> ✏️ The EXCEL file above is just an example of how your file can look. Glados will detect the header row (#1 in this case) automatically. The order of the columns doesn't matter, as long as there are no empty rows or empty columns. Further glados ignores extra columns.

If there is something wrong with your import, glados will notice you the moment you click the `Validate` button. In this case the field `Order Number` is a required field, but it was empty.

![Bought Item Import Validation](/docs/images/bought-items-batch-create-validation-error.png)

But if everything is in order, as shown in the image below, the user can validate all items and then create them. The `Create All` button only shows after a successful validation:

![Bought Item Import](/docs/images/bought-items-batch-create-review.png)

> ✏️ The user is allowed to change the values of every item in the preview

### 4.3 bought-item-rules for users

### 4.3.1 user

- A **user** can create items
- A **user** can edit their own items, as long as the items state is `open` and the project is active
- A **user** can delete their own items, as long as the items state is `open`

### 4.3.2 superuser

- A **superuser** can create items
- A **superuser** can edit all items from all users at any state, as long as the project is active
- A **superuser** can delete all items from all users at any state

### 4.3.3 adminuser

- A **adminuser** can create, edit and delete projects and can assign other users as designated user
- A **adminuser** can create items
- A **adminuser** can edit all items from all users at any state, as long as the project is active
- A **adminuser** can delete all items from all users at any state

### 4.3.4 guestuser

- A **guestuser** can only view items (cannot create, nor edit, nor delete)

## 5 account

This is each users account. They can view their personal data and make changes to them, if they want.

### 5.1 personal access token

The personal access token allows a user to authenticate in glados from external software, such as the [PYTIA Quick Export App](https://github.com/deloarts/pytia-quick-export). This app allows a user to create items from within CATIA V5, a CAD software for mechanical engineering.

![Account PAT](/docs/images/account-pat.png)

A user can only have one active personal access token. Creating a new one renders the current one invalid.

## 6 tools

> ✏️ Tools are helper for users. Tools have often an experimental state and can change at any time. Play around with them :)

## 7 settings

> ✏️ Only adminusers can make changes to the settings of the app. Users without this permission level do not see the settings-icon in the sidebar

### 7.1 users

Creating new users is restricted to admin users only. Required fields are marked with an asterix-sign `*`.

![Settings User Create](/docs/images/settings-users.png)

The user will receive a welcome mail after creation. The content of this mail can be changed in the `templates` of the backend.

> ✏️ The RFID field is an experimental feature. It does not meet security standards and shouldn't be used in production

### 7.2 api keys

API keys allow external software to access resources of glados. Use them with caution!

![Settings API Keys](/docs/images/settings-api-keys.png)

The API key api is documented in the backend.

### 7.3 logs

Even though glados uses a file base logging system all logs can be viewed within the app. Select the date from which you want to view the log and glados will load the file:

![Settings Logs](/docs/images/settings-logs.png)

### 7.4 config

In the config tab adminusers can apply custom filters for bought items. These filters are then available in the `Preset` dropdown in the bought-items-view.

![Settings Config](/docs/images/settings-config.png)
