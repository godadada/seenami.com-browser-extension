import browser from "webextension-polyfill";

const manifest = browser.runtime.getManifest();
document.body.classList.add("installedSeenamiExt" + manifest.version);

let csPort = browser.runtime.connect({
  name: "port-from-cs"
});
window.addEventListener("message", handler, false);

function handler(event) {
  function reportError(error) {
    console.log("seenami/content/handler: " + error);
  }
  if (event.data && event.data.direction && event.data.direction === "p2c") {
    let data = event.data;
    data.direction = "c2b";
    csPort.postMessage(data);
  }
}

csPort.onMessage.addListener(notify);

function notify(message) {
  if (message.direction && message.direction === "b2c") {
    message.direction = "c2p";
    window.postMessage(message, "https://www.seenami.com");
  }
}
