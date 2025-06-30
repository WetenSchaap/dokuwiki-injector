// Minimal DokuWiki JSON-RPC API client for searching pages by title/content
export class DokuWikiApi {
  constructor(configuration) {
    this.configuration = configuration;
    this._id = 0;
  }

  // Helper to perform JSON-RPC calls
  async jsonRpcCall(method, params = {}) {
    const { baseUrl, token, resultNum } = this.configuration;
    const body = {
      jsonrpc: "2.0",
      method,
      params,
      id: ++this._id,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    let url = `${baseUrl}/lib/exe/jsonrpc.php/${encodeURIComponent(method)}`;
    console.debug("API call to DokuWiki with method:", method, "and params:", params,"\nurl = ", url);

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`DokuWiki JSON-RPC error: ${response.statusText}`);
    }
    if (response.error) {
      throw new Error(`DokuWiki JSON-RPC error: ${response.error.message}`);
    }
    return response;
  }

  async search(query) {
      const { resultNum } = this.configuration; // max nr of results to return
      const results = await this.jsonRpcCall("core.searchPages", { "query" : query });
      const responseBody = await results.text();
      try {
        const data = JSON.parse(responseBody);
        console.debug("DokuWiki search results:", data); // Log the search results for debugging
        try {
            const mappedResults = data.result.map((page) => ({
            id: page.id,
            url: page.url,
            title: page.title || page.id.replace(/_/g, " "),
            snippet: page.snippet,
            revision: page.revision,
            size: page.size,
            permission: page.permission
            }));
            // If there are fewer results than resultNum, just return all of them, otherwise slice the array to the desired length
            return mappedResults.slice(0, Math.min(resultNum, mappedResults.length));
        } catch {
          // Handle the case where results are not in the expected format
          console.debug("Dokuwiki search results are invalid:", data); // Log the results
        };
      } catch (error) {
        console.error("Failed to parse DokuWiki search results as JSON:", error);
        console.debug("Raw response body:", responseBody); // Log the raw response body for debugging if they are not in JSON format
      }
  }


  // Test connection by getting version info
  async testConnection() { // TODO: Expand so we can distinguish between connection issue and API not activated in dokuwiki 
    try {
      const response = await this.jsonRpcCall("core.getAPIVersion");
      if (response && response.ok) { // all good
        console.debug("DokuWiki API version:", response.result);
        return true;
      } else {                      // some problem with the server
        console.error("Failed to get DokuWiki API version:", response.statusText);
        return false;
      }
    } catch (error) {               // some problem with the connection probably?
      console.error(error);
      return false;
    }
  }
}
