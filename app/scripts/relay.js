import browser from "webextension-polyfill";

let pattern = /^https:\/\/([a-z0-9]+[.])*seenami\.com/;
let regExp = new RegExp(pattern, "i");

function startsWSeenami(link) {
  return regExp.test(link);
}

let bgPort;

function connected(p) {
  bgPort = p;
  bgPort.onMessage.addListener(messageHandler);
}

browser.runtime.onConnect.addListener(connected);

function queryCK(callback) {
  browser.tabs
    .query({
      url: "https://*.seenami.com/*",
      currentWindow: true,
      active: true
    })
    .then(callback, err => {
      console.log("seenami/relay/queryCK: " + err.message);
    });
}

function messageHandler(message) {
  queryCK(logTabs);
  let origin = new URL(message.current_url).origin;

  function logTabs(tabs) {
    let activeTab = tabs[0];
    if (!activeTab) {
      console.log("Seenami/relay, active tab not found");
      return;
    }
    let tId = activeTab.id;
    if (message.direction && message.direction === "c2b") {
      browser.webNavigation
        .getAllFrames({
          tabId: tId
        })
        .then(frames => {
          for (let i = 0; i < frames.length; i++) {
            if (
              frames[i].parentFrameId == 0 &&
              frames[i].url.startsWith(origin) &&
              frames[i].frameId
            ) {
              drive(tId, frames[i].frameId, message);
              break;
            }
          }
        });
    }
  }
}

function send2c(c_url, len, msg_frm_ifrm, m_pulse) {
  bgPort.postMessage({
    current_url: c_url,
    tracks_len: len,
    direction: "b2c",
    pulse: m_pulse,
    html: msg_frm_ifrm
  });
}

function drive(tId, frId, message) {
  let c_url = message.current_url;
  let len = message.tracks_len;
  let d_page = message.drive_page;
  //console.log("Seenami/drive/d_page: ", d_page);
  browser.tabs
    .executeScript(tId, {
      runAt: "document_idle",
      frameId: frId,
      code: d_page[0]
    })
    .then(result => {
      //console.log("Seenami/relay/result: ", result);
      if (result[0] != null) {
        send2c(c_url, len, result[0], "OK");
      }
    })
    .then(() => {
      if (d_page[1]) {
        return browser.tabs.executeScript(tId, {
          runAt: "document_end",
          frameId: frId,
          code: d_page[1]
        });
      }
    })
    .catch(err => {
      console.log("seenami/relay/drive: " + err.message + " for " + c_url);
    });
}
