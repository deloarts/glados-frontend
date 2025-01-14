# update glados frontend

- [update glados frontend](#update-glados-frontend)
  - [1 git](#1-git)
  - [2 update the config file](#2-update-the-config-file)
  - [3 build and deploy the app](#3-build-and-deploy-the-app)


## 1 git

To update the app use:

```bash
cd /opt/glados/glados-frontend

git fetch --all --tags
git checkout {TAG_NAME}
```

Where `{TAG_NAME}` is the version of the app you want to use, e.g. `v0.12.6`.

## 2 update the config file

Compare the `config.sample.ts` file with your `config.ts` file and adjust, if necessary.

## 3 build and deploy the app

```bash
npm install
npm run build
npm run deploy
```
