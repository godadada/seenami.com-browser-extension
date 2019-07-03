import browser from "webextension-polyfill";

var defaultRgx = ["http://*/*", "https://*/*"];
function updateRegexpes() {
  browser.webRequest.onHeadersReceived.removeListener(setHeader);
  browser.webRequest.onHeadersReceived.addListener(
    setHeader,
    { urls: defaultRgx },
    ["blocking", "responseHeaders"]
  );
}
function setHeader(e) {
  for (var header of e.responseHeaders) {
    if (header.name.toLowerCase() === "x-frame-options") {
      header.value = "ALLOW";
    } else if (header.name.toLowerCase() === "content-security-policy") {
      header.value = header.value.replace(
        /frame-ancestors[^;]*;?/,
        "frame-ancestors http://* https://*;"
      );
    }
  }
  var myHeader = {
    name: "x-frame-options",
    value: "ALLOW"
  };
  e.responseHeaders.push(myHeader);
  return { responseHeaders: e.responseHeaders };
}
function framing() {
  return browser.tabs
    .query({
      url: "https://*.seenami.com/*",
      currentWindow: true,
      active: true
    })
    .then(updateRegexpes, err => {
      console.log("seenami/frame/framing/error: " + err.message);
    });
}

framing();
