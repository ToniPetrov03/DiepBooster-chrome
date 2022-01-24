let tanksInfo;

const getTanksInfo = () => chrome.storage.local.get((result) => tanksInfo = result);

chrome.storage.onChanged.addListener(getTanksInfo);

getTanksInfo();
