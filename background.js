chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({ pageUrl: { hostEquals: 'diep.io' } })],
      actions: [new chrome.declarativeContent.ShowPageAction()],
    }]);
  });

  chrome.storage.local.set({
    octo: {
      bulletReload: 7,
      keyCode: 'KeyQ',
    },
    fighter: {
      bulletReload: 7,
      keyCode: 'KeyZ',
    },
    predator: {
      bulletReload: 7,
      keyCode: 'KeyF',
    },
  });
});
