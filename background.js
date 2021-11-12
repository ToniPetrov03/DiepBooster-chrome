chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({ pageUrl: { hostEquals: 'diep.io' } })],
      actions: [new chrome.declarativeContent.ShowPageAction()],
    }]);
  });

  chrome.storage.local.set({
    predator: {
      bulletReload: 7,
      keyCode: 'KeyX',
    },
    octoTank: {
      bulletReload: 7,
      keyCode: 'KeyV',
    },
  });
});
