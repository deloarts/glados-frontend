# glados frontend

Frontend for the glados project.

![state](https://img.shields.io/badge/State-beta-brown.svg?style=for-the-badge)
![version](https://img.shields.io/badge/Version-0.2.0-orange.svg?style=for-the-badge)
![backend](https://img.shields.io/badge/Backend-0.2.3-orange.svg?style=for-the-badge)

![node](https://img.shields.io/badge/node-v16-blue.svg?style=for-the-badge)
![vue](https://img.shields.io/badge/vue%2Fcli-v4.5-blue.svg?style=for-the-badge)
![OS](https://img.shields.io/badge/OS-UNIX-blue.svg?style=for-the-badge)

Glados is a resource planning software with a web ui. The backend is located at [github.com/deloarts/glados-backend](https://github.com/deloarts/glados-backend).

Table of contents:

- [glados frontend](#glados-frontend)
  - [1 installation](#1-installation)
    - [1.1 system requirements](#11-system-requirements)
      - [1.2 glados directory](#12-glados-directory)
    - [1.3 software requirements](#13-software-requirements)
    - [1.3.1 install node](#131-install-node)
      - [1.3.2 install git](#132-install-git)
    - [1.4 clone the repository](#14-clone-the-repository)
    - [1.5 setup the config](#15-setup-the-config)
    - [1.6 install dependencies](#16-install-dependencies)
    - [1.7 build and deploy the app](#17-build-and-deploy-the-app)
  - [2 update](#2-update)
    - [2.1 git](#21-git)
    - [2.2 update the config file](#22-update-the-config-file)
    - [2.3 build and deploy the app](#23-build-and-deploy-the-app)
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

### 1.1 system requirements

- Unix (tested on Debian 11)
- Approx. 250GB free space
- Sudo rights required
- Web server

#### 1.2 glados directory

Create the glados app directory:

```bash
sudo mkdir /opt/glados
```

> ✏️ All bash commands for the glados directory refer to /opt/glados. If you change this, you'll have to keep in mind to change /opt/glados to your path.

### 1.3 software requirements

```bash
sudo apt update -y
```

### 1.3.1 install node

```bash
curl -sL https://deb.nodesource.com/setup_16.x | sudo bash -
```

Verify the sources with:

```bash
cat /etc/apt/sources.list.d/nodesource.list

# This should create the output:
deb https://deb.nodesource.com/node_16.x bullseye main
deb-src https://deb.nodesource.com/node_16.x bullseye main
```

Now install node:

```bash
sudo apt install nodejs -y
```

Verify the version with:

```bash
node -v

# This should create an output similar to this:
v16.19.0
```

#### 1.3.2 install git

```bash
sudo apt install git -y
```

### 1.4 clone the repository

To perform this you'll need:

- A [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) with repo-wide rights.
- At least read access to the repository.

```bash
cd /opt/glados
sudo git clone https://github.com/deloarts/glados-frontend.git
cd glados-frontend
git checkout {TAG_NAME}
```

Enter your username and your access token when prompted. Replace `{TAG_NAME}` with the version you want to clone, e.g. `v0.2.0`.

> ✏️ You can use this command to update the app as well. Just modify the tag name.
>
> ⚠️ Only clone the repository with a published version tag!
>
> ✏️ The glados frontend lives now in `/opt/glados/glados-frontend/`.

### 1.5 setup the config

Copy the `config.sample.ts` file located in the `src` folder and paste it as `config.ts` file. Then edit the config file to fit your needs (The only important thing to change is the server definition).

### 1.6 install dependencies

```bash
npm install
```

### 1.7 build and deploy the app

Run the build command:

```bash
npm run build
```

Run the deploy command (this copies the app from `./dist/` to `/var/www`)

```bash
npm run deploy
```

The app is now available at the IP address you've setup in the config.ts file.

> ✏️ You can also build the app on your local machine ans `scp` it to the server.

## 2 update

### 2.1 git

To update the app use:

```bash
cd /opt/glados/glados-frontend

git fetch --all --tags
git checkout {TAG_NAME}
```

Where `{TAG_NAME}` is the version of the app you want to use, e.g. `v0.2.0`.

### 2.2 update the config file

Compare the `config.sample.ts` file with your `config.ts` file and adjust, if necessary.

### 2.3 build and deploy the app

```bash
npm install
npm run build
npm run deploy
```

## 3 developing

### 3.1 repository

#### 3.1.1 cloning

Clone the repo to your local machine:

```powershell
git clone git@github.com:deloarts/glados-frontend.git
```

You'll need access to the repository.

#### 3.1.2 main branch protection

> ❗️ Never develop new features and fixes in the main branch!

The main branch is protected: it's not allowed to make changes directly to it. Create a new branch in order work on issues. The new branch should follow the naming convention from below.

#### 3.1.3 branch naming convention

1. Use grouping tokens at the beginning of your branch names, such as:
    - feature: A new feature that will be added to the project
    - fix: For bugfixes
    - tests: Adding or updating tests
    - docs: For updating the docs
    - wip: Work in progress, won't be finished soon
    - junk: Just for experimenting
2. Use slashes `/` as delimiter in branch names (`feature/docket-export`)
3. Avoid long descriptive names, rather refer to an issue
4. Do not use bare numbers as leading parts (`fix/108` is bad, `fix/issue108` is good)

#### 3.1.4 issues

Use the issue templates for creating an issue. Please don't open a new issue if you haven't met the requirements and add as much information as possible. Further:

- Format your code in an issue correctly with three backticks, see the [markdown guide](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax).
- Add the full error trace.
- Do not add screenshots for code or traces.

### 3.2 npm

#### 3.2.1 project setup

```sh
npm install
```

#### 3.2.2 compile and hot-reload for development

```sh
npm run dev
```

#### 3.2.3 type-check, compile and minify for production

```sh
npm run build
```

#### 3.2.4 lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### 3.3 vite config

See [Vite Configuration Reference](https://vitejs.dev/config/).

### 3.4 recommended ide setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

#### 3.4.1 type support for `.vue` imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

### 3.5 new revision checklist

1. Update the **version** in
   - [constants.ts](/src/constants.ts)
   - [package.json](package.json)
   - [README.md](README.md)
2. Update the **backend version** in
   - [constants.ts](/src/constants.ts)
   - [README.md](README.md)
3. Check **lint** output: `npm run lint`
4. Check if app can be built: `npm run build`
5. Lock **dependencies**: `npm install --package-lock-only`

## 4 license

No license.

## 5 changelog

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
