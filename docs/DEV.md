# developing

- [developing](#developing)
  - [1 repository](#1-repository)
    - [1.1 cloning](#11-cloning)
    - [1.2 main branch protection](#12-main-branch-protection)
    - [1.3 branch naming convention](#13-branch-naming-convention)
    - [1.4 issues](#14-issues)
    - [3 npm](#3-npm)
    - [2.1 project setup](#21-project-setup)
    - [2.2 compile and hot-reload for development](#22-compile-and-hot-reload-for-development)
    - [2.3 type-check, compile and minify for production](#23-type-check-compile-and-minify-for-production)
    - [2.4 lint with ESLint](#24-lint-with-eslint)
    - [3.3 vite config](#33-vite-config)
    - [3.4 recommended ide setup](#34-recommended-ide-setup)
    - [4.1 type support for `.vue` imports in TS](#41-type-support-for-vue-imports-in-ts)
    - [3.5 new revision checklist](#35-new-revision-checklist)


## 1 repository

### 1.1 cloning

Clone the repo to your local machine:

```powershell
git clone git@github.com:deloarts/glados-frontend.git
```

You'll need access to the repository.

### 1.2 main branch protection

> ❗️ Never develop new features and fixes in the main branch!

The main branch is protected: it's not allowed to make changes directly to it. Create a new branch in order work on issues. The new branch should follow the naming convention from below.

### 1.3 branch naming convention

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

### 1.4 issues

Use the issue templates for creating an issue. Please don't open a new issue if you haven't met the requirements and add as much information as possible. Further:

- Format your code in an issue correctly with three backticks, see the [markdown guide](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax).
- Add the full error trace.
- Do not add screenshots for code or traces.

### 3 npm

### 2.1 project setup

```sh
npm install
```

### 2.2 compile and hot-reload for development

```sh
npm run dev
```

### 2.3 type-check, compile and minify for production

```sh
npm run build
```

### 2.4 lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### 3.3 vite config

See [Vite Configuration Reference](https://vitejs.dev/config/).

### 3.4 recommended ide setup

[VSCode](https://code.visualstudio.com/) + [Vue Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) + [Vite](https://marketplace.visualstudio.com/items?itemName=antfu.vite)

### 4.1 type support for `.vue` imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

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
