# glados frontend

Frontend for the glados project.

![state](https://img.shields.io/badge/State-beta-brown.svg?style=for-the-badge)
![version](https://img.shields.io/badge/Version-0.11.1-orange.svg?style=for-the-badge)
![backend](https://img.shields.io/badge/Backend-0.11.0-orange.svg?style=for-the-badge)
![node](https://img.shields.io/badge/node-v22-blue.svg?style=for-the-badge)
![OS](https://img.shields.io/badge/OS-UNIX-blue.svg?style=for-the-badge)

> ✏️ Glados is a resource planning software with a web ui. The backend is located at [github.com/deloarts/glados-backend](https://github.com/deloarts/glados-backend).
>
> ✏️ Glados is in use at my company for handling bought items. Its meant to be the interface between the engineering department and the purchase department. Therefore this software must reach certain requirements, which cannot be changed due to company guidelines.
Table of contents:

- [glados frontend](#glados-frontend)
  - [1 installation](#1-installation)
    - [1.1 requirements](#11-requirements)
    - [1.2 setup](#12-setup)
  - [2 update](#2-update)
  - [3 developing](#3-developing)
    - [3.1 repository](#31-repository)
      - [3.1.1 cloning](#311-cloning)
      - [3.1.2 main branch protection](#312-main-branch-protection)
      - [3.1.3 branch naming convention](#313-branch-naming-convention)
      - [3.1.4 issues](#314-issues)
    - [3.2 npm](#32-npm)
      - [3.2.1 project setup](#321-project-setup)
      - [3.2.2 compile and hot-reload for development](#322-compile-and-hot-reload-for-development)
      - [3.2.3 type-check, compile and minify for production](#323-type-check-compile-and-minify-for-production)
      - [3.2.4 lint with ESLint](#324-lint-with-eslint)
    - [3.3 vite config](#33-vite-config)
    - [3.4 recommended ide setup](#34-recommended-ide-setup)
      - [3.4.1 type support for `.vue` imports in TS](#341-type-support-for-vue-imports-in-ts)
    - [3.5 new revision checklist](#35-new-revision-checklist)
  - [4 license](#4-license)
  - [5 changelog](#5-changelog)
  - [6 to do](#6-to-do)

## 1 installation

For a guided installation see [INSTALL.md](/docs/INSTALL.md)

> ✏️ Frontend and backend require the same major and minor version to work together

### 1.1 requirements

- Unix (tested on Debian 11)
- Approx. 250GB free space
- Sudo rights required
- Web server
- Node v22

### 1.2 setup

- recommended installation folder: `/opt/glados/glados-frontend/`
- use the latest git tag
- copy the [config.sample.ts](/src/config.sample.ts) file and paste it as `config.ts` file, then edit it to fit your needs
- `npm install`, `npm run build` and `npm run deploy`

## 2 update

For a guided update process see [UPDATE.md](/docs/UPDATE.md)

## 3 developing

For contributors: [DEV.md](/docs/DEV.md)

## 4 license

No license.

## 5 changelog

**v0.11.0**: Add batch import view.  
**v0.10.1**: Fix color issues. Update log view.  
**v0.10.0**: Add language and theme.  
**v0.9.2**: Add request view. Add columns to bought item table. Fix some bugs.  
**v0.9.1**: Add state indicator for bought items.  
**v0.9.0**: Refactor data table.  
**v0.8.2**: Add version to host info.  
**v0.8.1**: Allow normal user to create projects.  
**v0.8.0**: Rename item definition and project machine.  
**v0.7.2**: Filter projects.  
**v0.7.1**: Better login ux.  
**v0.7.0**: Add projects.  
**v0.6.0**: Refactor app. Add stock cut 2d.  
**v0.5.0**: Add weblink.  
**v0.4.5**: Better error msg on item edit/create.  
**v0.4.4**: Fix bought-item timeline.  
**v0.4.3**: Bought items changelog.  
**v0.4.2**: Add item timeline.  
**v0.4.1**: Fix bug on controls.  
**v0.4.0**: Rewrite everything.  
**v0.3.4**: Update env, fix dashboard.  
**v0.3.3**: Add personal access token.  
**v0.3.2**: Fix faulty version checking.  
**v0.3.1**: Fix expected delivery date.  
**v0.3.0**: Add more filters, add prompt before multi-change.  
**v0.2.1**: Fix server-side excel import.  
**v0.2.0**: Add copy button.  
**v0.1.8**: Add particles js.  
**v0.1.7**: Bump server version.  
**v0.1.6**: Bump server version.  
**v0.1.5**: Fix reconnection.  
**v0.1.4**: Fetch available units from server.  
**v0.1.3**: Update backend version.  
**v0.1.2**: Add order by ID.  
**v0.1.1**: Minor improvements.  
**v0.1.0**: Initial commit.

## 6 to do

Using VS Code [Comment Anchors](https://marketplace.visualstudio.com/items?itemName=ExodiusStudios.comment-anchors) to keep track of to-dos.
