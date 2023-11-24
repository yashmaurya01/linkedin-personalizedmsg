chrome.runtime.onInstalled.addListener(function () {
    console.log("LinkedIn Scraper Extension Installed");
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'extractInfo') {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'extractInfo' });
        });
    }
});

