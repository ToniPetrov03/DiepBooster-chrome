const reloadSpeedMs = (tank) => (15 - tanksInfo[tank].bulletReload) * reloadStep[tank];

const onKeyUp = (e) => {
  switch (e.code) {
    case tanksInfo.predator.keyCode: predatorStacking(reloadSpeedMs('predator')); break;
    case tanksInfo.octo.keyCode: group135DegreesStacking(reloadSpeedMs('octo')); break;
    case tanksInfo.fighter.keyCode: group135DegreesStacking(reloadSpeedMs('fighter')); break;
  }
};
