// Globals
let tab;
let hidden = true;
let isMedium = false;
const ids = {
  hide: 'hide-premium-content'
}
const menu = chrome.contextMenus;
const message = chrome.tabs.sendMessage;

// Functions
function isTab() {
  if (tab && tab.url.includes('medium')) {
    isMedium = true;
      if (isMedium) {
        message(tab.id, { command: 'hide' });
        chrome.browserAction.setIcon({path: './icons/icon_16.png'});
    }
  } else {
    isMedium = false;
    chrome.browserAction.setIcon({ path: './icons/icon_grey_16.png'});
  }
}

function show() {
  message(tab.id, { command: 'show' });
  chrome.browserAction.setIcon({ path: './icons/icon_grey_16.png'});
}

function hide() {
  message(tab.id, { command: 'hide' });
  chrome.browserAction.setIcon({ path: './icons/icon_16.png'});
}

// Listeners
chrome.browserAction.onClicked.addListener(function() {
  if (isMedium) {
    hidden = !hidden;
    if (hidden) {
      hide();
    } else {
      show();
    }
  }
});

chrome.webRequest.onCompleted.addListener(function(e) {
  if (e.type === 'xmlhttprequest' && hidden) {
    isTab();
  }
},
{
  urls: [ "*://*.medium.com/*" ]
});

chrome.tabs.onUpdated.addListener(function(e) {
  chrome.tabs.query({ active: true }, (tabs) => {
    tab = tabs[0];
    isTab();
  });
})

chrome.tabs.onActivated.addListener(function (e) {
  chrome.tabs.query({ active: true }, (tabs) => {
    tab = tabs[0];
    isTab();
  });
});

