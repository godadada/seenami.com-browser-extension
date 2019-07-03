import browser from "webextension-polyfill";

const DOMAIN = "seenami.com";
browser.tabs.onCreated.addListener(onTabCreated);
browser.tabs.onUpdated.addListener(onTabUpdated);

function onTabCreated(tab) {
    let url = urlToHostname(tab.url);
    if (url && url.includes(DOMAIN)) {
	    muteTab(tab.id);
    }
}

function onTabUpdated(tabId, changeInfo, tab) {
    let url = urlToHostname(tab.url);
	if (changeInfo.url && url && url.includes(DOMAIN)) {
		muteTab(tab.id);
	}
}

function urlToHostname(url) {
    let res = null;
    if (!url.toLowerCase().startsWith("http")) {
        return null;
    }
    let urlO = new URL(url);
    if (urlO) {
	    res = urlO.hostname.toLowerCase();
    }
    return res;
}

function muteTab(tabId) {
	browser.tabs.update(tabId, {muted: true});
}
