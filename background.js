chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({ pageUrl: { hostEquals: 'diep.io' } })],
      actions: [new chrome.declarativeContent.ShowPageAction()],
    }]);
  });

  chrome.storage.sync.set({
    predator: {
      reload: 7,
      keyCode: 'KeyR',
    },
    octoTank: {
      reload: 7,
      keyCode: 'KeyV',
    },
  });
});
