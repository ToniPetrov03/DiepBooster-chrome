chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({ pageUrl: { hostEquals: 'diep.io' } })],
      actions: [new chrome.declarativeContent.ShowPageAction()],
    }]);
  });

  chrome.storage.local.set({
    OCTO: {
      bulletReload: 7,
      keyCode: 'KeyQ',
    },
    FIGHTER: {
      bulletReload: 7,
      keyCode: 'KeyZ',
    },
    PREDATOR: {
      bulletReload: 7,
      keyCode: 'KeyF',
    },
  });
});
