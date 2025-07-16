<script>
  import { getConfiguration, saveConfiguration } from "./configuration";
  import { DokuWikiApi } from "./dokuwiki";

  let baseUrl;
  let token;
  let resultNum;
  let openLinkType;
  let themeDuckduckgo;
  let themeGoogle;
  let themeBrave;
  let themeSearx;
  let themeKagi;
  let themeQwant;
  let isSuccess;
  let isError;

  async function init() {
    const config = await getConfiguration();
    baseUrl = config.baseUrl;
    token = config.token;
    resultNum = config.resultNum;
    openLinkType = config.openLinkType;
    themeDuckduckgo = config.themeDuckduckgo;
    themeGoogle = config.themeGoogle;
    themeBrave = config.themeBrave;
    themeSearx = config.themeSearx;
    themeKagi = config.themeKagi;
    themeQwant = config.themeQwant;
  }

  init();

  async function handleSubmit() {
    const config = {
      baseUrl,
      token,
      resultNum,
      openLinkType,
      themeDuckduckgo,
      themeGoogle,
      themeBrave,
      themeSearx,
      themeKagi,
      themeQwant,
    };

    const testResult = await new DokuWikiApi(config).testConnection(config);

    console.debug("Test connection result:", testResult);

    if (testResult) {
      await saveConfiguration(config);
      isError = false;
      isSuccess = true;
    } else {
      isSuccess = false;
      isError = true;
    }
  }
</script>

<h6>Configuration</h6>
<div class="divider" />
<p>
  This is a companion extension for a Dokuwiki install. Before you can start using it, you have to:
  <ol>
    <li>Configure some basic settings here, so that the extension can communicate with your dokuwiki installation.</li>
    <li>Enable some settings in Dokuwiki, <a href="https://github.com/WetenSchaap/dokuwiki-injector/blob/master/docs/usage.md" target="_blank" rel="noopener noreferrer">see here</a>.</li>
  </ol>
</p>
<form class="form" on:submit|preventDefault={handleSubmit}>
  <div class="form-group">
    <label class="form-label" for="input-base-url"
      >Base URL <span class="text-error">*</span></label
    >
    <input
      class="form-input"
      type="text"
      id="input-base-url"
      placeholder="https://wiki.mydomain.com"
      bind:value={baseUrl}
    />
    <div class="form-input-hint">
      The base URL of your dokuwiki installation, <b>including</b> http(s)://, and <b>without</b> a trailing slash
    </div>
  </div>
  <div class="form-group">
    <label class="form-label" for="input-token"
      >API Token <span class="text-error">*</span></label
    >
    <input
      class="form-input"
      type="password"
      id="input-token"
      placeholder="API Token"
      bind:value={token}
    />
    <div class="form-input-hint">
      Enter your dokuwiki API token. You can generate a token in your dokuwiki user profile.
    </div>
  </div>
  <div class="form-group">
    <label class="form-label" for="input-search-num"
      >Maximum number of search results
    </label>
    <input
      class="form-input"
      type="number"
      id="input-search-num"
      placeholder="10"
      bind:value={resultNum}
    />
    <div class="form-input-hint">
      The maximum number of search results. High numbers could lead to worse
      performance.
    </div>
  </div>
  <div class="accordion">
    <input type="checkbox" id="accordion-1" name="accordion-checkbox" hidden />
    <label class="accordion-header" for="accordion-1">
      <i class="icon icon-arrow-right mr-1" />
      Advanced Settings
    </label>
    <div class="accordion-body">
      <div class="form-group">
        <div class="form-label">Default open link type</div>
        <label class="form-radio">
          <input
            type="radio"
            id="input-link-type"
            bind:group={openLinkType}
            value="newTab"
          />
          <i class="form-icon" />Open links in a new tab (default)
        </label>
        <label class="form-radio">
          <input
            type="radio"
            id="input-link-type"
            bind:group={openLinkType}
            value="sameTab"
          />
          <i class="form-icon" />Open links in the same tab
        </label>
      </div>
      <div class="form-group p-relative clearfix">
        <div class="form-label">Theme of injection box</div>
        <div class="form-label float-left">google</div>
        <label class="form-radio form-inline float-right">
          <input
            type="radio"
            id="google-light"
            bind:group={themeGoogle}
            value="light"
          />
          <i class="form-icon" />light
        </label>
        <label class="form-radio form-inline float-right">
          <input
            type="radio"
            id="google-dark"
            bind:group={themeGoogle}
            value="dark"
          />
          <i class="form-icon" />dark
        </label>
        <label class="form-radio form-inline float-right">
          <input
            type="radio"
            id="google-auto"
            bind:group={themeGoogle}
            value="auto"
          />
          <i class="form-icon" />auto (default)
        </label>
      </div>
      <div class="form-group p-relative clearfix">
        <div class="form-label float-left">DuckDuckGo</div>
        <label class="form-radio form-inline float-right">
          <input type="radio" bind:group={themeDuckduckgo} value="light" />
          <i class="form-icon" />light
        </label>
        <label class="form-radio form-inline float-right">
          <input type="radio" bind:group={themeDuckduckgo} value="dark" />
          <i class="form-icon" />dark
        </label>
        <label class="form-radio form-inline float-right">
          <input type="radio" bind:group={themeDuckduckgo} value="auto" />
          <i class="form-icon" />auto (default)
        </label>
      </div>
      <div class="form-group p-relative clearfix">
        <div class="form-label float-left">Brave Search†</div>
        <label class="form-radio form-inline float-right">
          <input type="radio" bind:group={themeBrave} value="light" />
          <i class="form-icon" />light
        </label>
        <label class="form-radio form-inline float-right">
          <input type="radio" bind:group={themeBrave} value="dark" />
          <i class="form-icon" />dark
        </label>
        <label class="form-radio form-inline float-right">
          <input type="radio" bind:group={themeBrave} value="auto" />
          <i class="form-icon" />auto (default)
        </label>
      </div>
      <div class="form-group p-relative clearfix">
        <div class="form-label float-left">SearX/SearXNG†</div>
        <label class="form-radio form-inline float-right">
          <input type="radio" bind:group={themeSearx} value="light" />
          <i class="form-icon" />light
        </label>
        <label class="form-radio form-inline float-right">
          <input type="radio" bind:group={themeSearx} value="dark" />
          <i class="form-icon" />dark
        </label>
        <label class="form-radio form-inline float-right">
          <input type="radio" bind:group={themeSearx} value="auto" />
          <i class="form-icon" />auto (default)
        </label>
      </div>
      <div class="form-group p-relative clearfix">
        <div class="form-label float-left">Kagi Search</div>
        <label class="form-radio form-inline float-right">
          <input type="radio" bind:group={themeKagi} value="light" />
          <i class="form-icon" />light
        </label>
        <label class="form-radio form-inline float-right">
          <input type="radio" bind:group={themeKagi} value="dark" />
          <i class="form-icon" />dark
        </label>
        <label class="form-radio form-inline float-right">
          <input type="radio" bind:group={themeKagi} value="auto" />
          <i class="form-icon" />auto (default)
        </label>
      </div>
      <div class="form-group p-relative clearfix">
        <div class="form-label float-left">Qwant</div>
        <label class="form-radio form-inline float-right">
          <input type="radio" bind:group={themeQwant} value="light" />
          <i class="form-icon" />light
        </label>
        <label class="form-radio form-inline float-right">
          <input type="radio" bind:group={themeQwant} value="dark" />
          <i class="form-icon" />dark
        </label>
        <label class="form-radio form-inline float-right">
          <input type="radio" bind:group={themeQwant} value="auto" />
          <i class="form-icon" />auto (default)
        </label>
      </div>
      <div class="form-input-hint">
        † Automatic theme detection may fail with these search engines unless
        you set a specific theme (not 'system') in the search engine settings.
      </div>
    </div>
  </div>

  <div class="divider" />

  <div class="button-row">
    {#if isSuccess}
      <div class="form-group has-success mr-2">
        <span class="form-input-hint"
          ><i class="icon icon-check" /> Connection successful
        </span>
      </div>
    {/if}
    {#if isError}
      <div class="form-group has-error mr-2">
        <span class="form-input-hint">
          <i class="icon icon-cross" /> Connection failed
        </span>
      </div>
    {/if}
    <button
      type="submit"
      class="btn btn-primary ml-2"
      disabled={!(baseUrl && token) || isSuccess}
    >
      Save
    </button>
  </div>
</form>

<style>
  .button-row {
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
  }
  .button-row button {
    padding-left: 32px;
    padding-right: 32px;
  }
</style>
