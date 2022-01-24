const reloadStep = { predator: 120, group135: 20 };

let tanksInfo;

const getTanksInfo = () => chrome.storage.local.get((result) => {
  tanksInfo = result;

  for (const tank in tanksInfo) {
    if (tanksInfo.hasOwnProperty(tank)) {
      tanksInfo[tank].reloadSpeedMs = (15 - tanksInfo[tank].bulletReload) * reloadStep[tank];
    }
  }
});

chrome.storage.onChanged.addListener(getTanksInfo);

getTanksInfo();
