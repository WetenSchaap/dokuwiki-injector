![logo](/icons/logo_full.png)

Community browser extension for a [dokuwiki](https://www.dokuwiki.org/dokuwiki) server.

***Do you forget the things that you have written in your wiki? Find yourself searching solutions to problems you already found the answer to? This extension may be for you!***

**Features**

- When searching on a search engine the search term is also sent to your Dokuwiki instance and results are added in a new box in the sidebar right to the search engine results.
- Supports the following search engines:
  - [google](https://www.google.com/)
  - [duckduckgo](https://duckduckgo.com/)
  - [SearX/SearXNG](https://duckduckgo.com/)*
  - [Brave Search](https://search.brave.com/)
  - [Kagi](https://kagi.com/)
  - [Qwant](https://www.qwant.com/)
- Automatic light or dark theme detection

Works with: Firefox, Chrome

_\* experimental, please read [this](https://github.com/Fivefold/linkding-injector/wiki/SearX-SearXNG-support) if you have problems_

**Usage**

Before you can use this extension, you need to configure your dokuwiki instance (or ask your admin to do it for you): in the configuration settings, under `Authentication`: first enable `remote`, and second `remoteuser` needs to set to either your username (say `wetenschaap`) or the user group you want to use (like `@user`).

![dokuwiki config](/docs/dokuwiki-settings.png)

When you've done that, you need to configure the extension. Either open the extension options in the browser extension manager or follow the link in the new Dokuwiki injector box on your search engine. There, you just need to set your Dokuwiki address and a Dokuwiki auth token.

To get a Dokuwiki auth token, go to *Update Profile* in Dokuwiki, and copy the token given there, see below.

![dokuwiki auth](/docs/dokuwiki-authtoken.png)

Once the extension is properly configured Dokuwiki search results will show in the right sidebar. If there are no search results nothing will appear.

**Screenshots**

![kagi](/docs/kagi.png "Kagi")
![google](/docs/google.png "Google")

## Installation

Currently, only manually until I have tested this in my day-to-day work for a few days/weeks.

### Firefox

Run the build as described below and then follow the instructions [here](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#installing) to load it into Firefox.

### Chrome

Run the build as described below and then follow the instructions [here](https://developer.chrome.com/docs/extensions/mv3/getstarted/#manifest) to load it into Chrome.

## Build

**Requirements**
- Latest LTS Node version (v14+)
- Latest LTS NPM version (v6+)
- bash (on Linux) or powershell (on Windows)
- npx (included with npm v5.2+)

Internally, we use `web-ext` to bundle a distribution package for the extension for Firefox. You do not need to install `web-ext`. Note that `web-ext` will generate a zip file which can also be used for the Chrome Web Store (but see the next section for Chrome-specific build instructions).

Then run the following script to generate a build (might need to make the file executable on Linux using `chmod +x build.sh`):

```bash
./build.sh # Linux
```![logo](/icons/logo_full.png)

Community browser extension for a [dokuwiki](https://www.dokuwiki.org/dokuwiki) server.

***Do you forget the things that you have written in your wiki? Find yourself searching solutions to problems you already found the answer to? This extension may be for you!***

**Features**

- When searching on a search engine the search term is also sent to your Dokuwiki instance and results are added in a new box in the sidebar right to the search engine results.
- Supports the following search engines:
  - [google](https://www.google.com/)
  - [duckduckgo](https://duckduckgo.com/)
  - [SearX/SearXNG](https://duckduckgo.com/)*
  - [Brave Search](https://search.brave.com/)
  - [Kagi](https://kagi.com/)
  - [Qwant](https://www.qwant.com/)
- Automatic light or dark theme detection

Works with: Firefox, Chrome

_\* experimental, please read [this](https://github.com/Fivefold/linkding-injector/wiki/SearX-SearXNG-support) if you have problems_

**Usage**

Before you can use this extension, you need to configure your dokuwiki instance (or ask your admin to do it for you): in the configuration settings, under `Authentication`: first enable `remote`, and second `remoteuser` needs to set to either your username (say `wetenschaap`) or the user group you want to use (like `@user`).

![dokuwiki config](/docs/dokuwiki-settings.png)

When you've done that, you need to configure the extension. Either open the extension options in the browser extension manager or follow the link in the new Dokuwiki injector box on your search engine. There, you just need to set your Dokuwiki address and a Dokuwiki auth token.

To get a Dokuwiki auth token, go to *Update Profile* in Dokuwiki, and copy the token given there, see below.

![dokuwiki auth](/docs/dokuwiki-authtoken.png)

Once the extension is properly configured Dokuwiki search results will show in the right sidebar. If there are no search results nothing will appear.

**Screenshots**

![kagi](/docs/kagi.png "Kagi")
![google](/docs/google.png "Google")

## Installation

Currently, only manually until I have tested this in my day-to-day work for a few days/weeks.

### Firefox

Run the build as described below and then follow the instructions [here](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#installing) to load it into Firefox.

### Chrome

Run the build as described below and then follow the instructions [here](https://developer.chrome.com/docs/extensions/mv3/getstarted/#manifest) to load it into Chrome.

## Build

**Requirements**
- Latest LTS Node version (v14+)
- Latest LTS NPM version (v6+)
- bash (on Linux) or powershell (on Windows)
- npx (included with npm v5.2+)

Internally, we use `web-ext` to bundle a distribution package for the extension for Firefox. You do not need to install `web-ext`. Note that `web-ext` will generate a zip file which can also be used for the Chrome Web Store (but see the next section for Chrome-specific build instructions).

Then run the following script to generate a build (might need to make the file executable on Linux using `chmod +x build.sh`):

```bash
./build.sh # Linux
```

```powershell
./build.ps1 # Windows
```

The script does:

- Install all dependencies using NPM
- Runs rollup to transpile and minify source files, with output written to the `build` directory
- Run web-ext to package the extension for uploading to the Mozilla addon store

After the build the root directory contains the complete, unpackaged extension. Use the `manifest.json` file to load it manually into the browser.

The packaged extension can be found in the `web-ext-artifacts` folder.

For developing you might prefer using `npm run dev` to create an unpackaged development build. This won't package the extension and won't minify the code but is faster and makes debugging in the browser easier.

### Building for Chrome-based browsers

Chrome switched over to Manifest V3. Same build instructions as above apply, but before building you need to check out the `chrome_manifest_v3` branch. The only relevant difference in that branch is the [manifest.json](https://github.com/Fivefold/linkding-injector/blob/master/manifest.json).

## Acknowledgements

This extension is a fork of [Linkding Injector](https://github.com/Fivefold/linkding-injector/). I adapted it to work with Dokuwiki instead of Linkding. The code that inserts search results was kept the same whenever possible; the API calls were adapted to get Dokuwiki results. I really don't know that much about browser extensions or Javascript - so I will rely on linkding injector heavily to keep things working properly.

I thought this would be useful for myself, and so I tried some stuff and it worked out! It does mean this extension will rely on the work on the Linkding injector heavily for continued function as search engines formatting, etc., are updated.

```powershell
./build.ps1 # Windows
```

The script does:

- Install all dependencies using NPM
- Runs rollup to transpile and minify source files, with output written to the `build` directory
- Run web-ext to package the extension for uploading to the Mozilla add-on store

After the build the root directory contains the complete, unpackaged extension. Use the `manifest.json` file to load it manually into the browser.

The packaged extension can be found in the `web-ext-artifacts` folder.

For developing you might prefer using `npm run dev` to create an unpackaged development build. This won't package the extension and won't minify the code but is faster and makes debugging in the browser easier.

### Building for Chrome-based browsers

Chrome switched over to Manifest V3. Same build instructions as above apply, but before building you need to check out the `chrome_manifest_v3` branch. The only relevant difference in that branch is the [manifest.json](https://github.com/Fivefold/linkding-injector/blob/master/manifest.json).

## Acknowledgements

This extension is a fork of [Linkding Injector](https://github.com/Fivefold/linkding-injector/). I adapted it to work with Dokuwiki instead of Linkding. The code that inserts search results was kept the same whenever possible; the API calls were adapted to get Dokuwiki results. I really don't know that much about browser extensions or Javascript - so I will rely on linkding injector heavily to keep things working properly.

I thought this would be useful for myself, and so I tried some stuff and it worked out! It does mean this extension will rely on the work on the Linkding injector heavily for continued function as search engines formatting, etc., are updated.
