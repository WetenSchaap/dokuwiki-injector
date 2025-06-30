import { getBrowser, openOptions } from "./browser";
import { getConfiguration, isConfigurationComplete } from "./configuration";
import { DokuWikiApi } from "./dokuwiki";

const browser = getBrowser();

// Connection to search injection content script
let portFromCS;

function connected(p) {
  portFromCS = p;

  // When the content script sends the search term, search on dokuwiki and
  // return results
  portFromCS.onMessage.addListener(async function (m) {
    if (m.action == "openOptions") {
      // Open the add on options if the user clicks on the options link in the
      // injected box
      openOptions();
    } else if ((await isConfigurationComplete()) == false) {
      portFromCS.postMessage({
        message:
          "Connection to your dokuwiki instance is not configured yet! " +
          "Please configure the extension in the <a class='openOptions'>options</a>.",
      });
    } else {
      let config = await getConfiguration();

      const api = new DokuWikiApi(config);

      // Configuration is complete, execute a search on dokuWiki
      api
        .search(m.searchTerm)
        .then((results) => {
          const dwpageResults = results.map((dwpage) => ({
            url: dwpage.url,
            title: dwpage.title,
            snippet: dwpage.snippet,
            id: dwpage.id
          }));
          portFromCS.postMessage({
            results: dwpageResults,
            config: config,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });
}

browser.runtime.onConnect.addListener(connected);
