# glados frontend

![state](https://img.shields.io/badge/State-beta-brown.svg?style=for-the-badge)
![version](https://img.shields.io/github/v/release/deloarts/glados-frontend?style=for-the-badge&color=orange)
![backend](https://img.shields.io/badge/Backend-0.13.*-orange.svg?style=for-the-badge)
![node](https://img.shields.io/badge/node-v22-blue.svg?style=for-the-badge)
![OS](https://img.shields.io/badge/OS-UNIX-blue.svg?style=for-the-badge)

> ✏️ Glados is in use at my company for handling bought items. Its meant to be the interface between the engineering department and the purchase department. Therefore this software must reach certain requirements, which cannot be changed due to company guidelines.

Table of contents:

- [glados frontend](#glados-frontend)
  - [1 introduction](#1-introduction)
  - [2 installation](#2-installation)
    - [2.1 requirements](#21-requirements)
    - [2.2 setup](#22-setup)
  - [3 update](#3-update)
  - [4 developing](#4-developing)
  - [5 license](#5-license)
  - [6 changelog](#6-changelog)

## 1 introduction

Glados is a resource planning software with a web ui: *Create and manage your projects and items with ease, keep your purchase process in perfect order*.

Glados is a free open source software, so feel free to use it if it fits your needs. Glados is still in development and has not reached major version 1.0.0 yet, meaning it can change in its appearance and functionality at any time without notice.

![Device Mockup](/docs/images/device-mockup.png)

How to use glados? See [USAGE.md](/docs/USAGE.md).

The backend is located at [github.com/deloarts/glados-backend](https://github.com/deloarts/glados-backend).

## 2 installation

For a guided installation see [INSTALL.md](/docs/INSTALL.md)

> ✏️ Frontend and backend require the same major and minor version to work together

### 2.1 requirements

- Unix (tested on Debian 11)
- Approx. 250GB free space
- Sudo rights required
- Web server
- Node v22

### 2.2 setup

- recommended installation folder: `/opt/glados/glados-frontend/`
- use the latest git tag
- copy the [config.sample.ts](/src/config.sample.ts) file and paste it as `config.ts` file, then edit it to fit your needs
- `npm install`, `npm run build` and `npm run deploy`

## 3 update

For a guided update process see [UPDATE.md](/docs/UPDATE.md)

## 4 developing

For contributors: [DEV.md](/docs/DEV.md)

## 5 license

MIT

## 6 changelog

**v0.13.5**: Fix login-loop.  
**v0.13.4**: Better styling.  
**v0.13.3**: Add export for projects.  
**v0.13.2**: Enhance input components.  
**v0.13.1**: Fix component error.  
**v0.13.0**: Add pagination. Fix log view.  
**v0.12.6**: Add option to disable naming convention. Fix json editor.  
**v0.12.5**: Add demo mode and browser support warning.  
**v0.12.4**: Update config file, refactor warning view.  
**v0.12.3**: Add company name to config file.  
**v0.12.2**: Allow private network.  
**v0.12.1**: Add rfid auth to login.  
**v0.12.0**: Add rfid to user. Add api key endpoint.  
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
