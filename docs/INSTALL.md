# install glados frontend

- [install glados frontend](#install-glados-frontend)
  - [1 system requirements](#1-system-requirements)
  - [2 filesystem](#2-filesystem)
  - [3 software requirements](#3-software-requirements)
  - [3.1 install node](#31-install-node)
    - [3.2 install git](#32-install-git)
  - [4 clone the repository](#4-clone-the-repository)
  - [5 setup the config file](#5-setup-the-config-file)
  - [6 install dependencies](#6-install-dependencies)
  - [7 build and deploy the app](#7-build-and-deploy-the-app)

## 1 system requirements

- Unix (tested on Debian 11)
- Approx. 250GB free space
- Sudo rights required
- Web server
- Node v22

## 2 filesystem

Create the glados app directory:

```bash
sudo mkdir /opt/glados
```

> ✏️ All bash commands for the glados directory refer to /opt/glados. If you change this, you'll have to keep in mind to change /opt/glados to your path.

## 3 software requirements

```bash
sudo apt update -y
```

## 3.1 install node

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh
sudo -E bash nodesource_setup.sh
sudo apt-get install -y nodejs
```

Verify the version with:

```bash
node -v

# This should create an output similar to this:
v22.11.0
```

### 3.2 install git

```bash
sudo apt install git -y
```

## 4 clone the repository

To perform this you'll need:

- A [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) with repo-wide rights.
- At least read access to the repository.

```bash
cd /opt/glados
sudo git clone https://github.com/deloarts/glados-frontend.git
cd glados-frontend
git checkout {TAG_NAME}
```

Enter your username and your access token when prompted. Replace `{TAG_NAME}` with the version you want to clone, e.g. `v0.13.1`.

> ✏️ You can use this command to update the app as well. Just modify the tag name.
>
> ⚠️ Only clone the repository with a published version tag!
>
> ✏️ The glados frontend lives now in `/opt/glados/glados-frontend/`.

## 5 setup the config file

Copy the [config.sample.ts](/src/config.sample.ts) file located in the `src` folder and paste it as `config.ts` file. Then edit the config file to fit your needs (The only important thing to change is the server definition).

key | value | description
--- | --- | ---
debug | `boolean` | Wether or not the app is in debug mode. Disable for production
demo | `boolean` | Wether or not the app is in demo mode
company | `string` | The company name which is shown in the footer
items/nameIsPartnumber | `boolean` | If set to `false`, the partnumber will be set as `name - order number - manufacturer`. If `true` the partnumber will be just the name
items/displayPartnumberAsName | `boolean` | Wether to show `Name` or `Partnumber` in the data table header
build/base | `string` | The apps base path relative from the domain
url/backend | `string` | The backend address. Can be empty if the backend handles static file requests
url/domain | `string` | The URL under which glados is reachable (e.g. `glados.company.local` on your intranet)
url/rfidAuth | `string` | The URL where the rfid-auth-app can be reached on the local machine
patExpireMinutes | `number` | The expiration time in minutes for the personal access token

## 6 install dependencies

```bash
npm install
```

## 7 build and deploy the app

Run the build command:

```bash
npm run build
```

Run the deploy command (this copies the app from `./dist/` to `/var/www`)

```bash
npm run deploy
```

The app is now available at the IP address you've setup in the `config.ts` file.

> ✏️ You can also build the app on your local machine and `scp` it to the server
