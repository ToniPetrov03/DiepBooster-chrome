chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({ pageUrl: { hostEquals: 'diep.io' } })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });

  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log('onUpdated', tab)
    if (tab.status === 'complete' && tab.active && tab.url?.startsWith('https://diep.io')) {
      chrome.tabs.executeScript({ file: 'predator.js' });
    }
  });

  chrome.tabs.onActivated.addListener((activeInfo) => {
    console.log('onUpdated', activeInfo)
  });
});