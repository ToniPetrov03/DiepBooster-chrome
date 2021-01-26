let tanksInfo;

const getTanksInfo = () => chrome.storage.local.get(['predator', 'octoTank'], (r) => tanksInfo = r);

chrome.storage.onChanged.addListener(getTanksInfo);

getTanksInfo();
