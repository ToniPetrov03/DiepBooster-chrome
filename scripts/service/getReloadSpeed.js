const reloadStep = { OCTO: 20, FIGHTER: 20, PREDATOR: 120 };

const getReloadSpeed = (tank, reload) => (15 - reload) * reloadStep[tank];

export default getReloadSpeed;
