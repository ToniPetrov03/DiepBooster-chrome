const target = document.getElementById('aa_main');
const config = { attributeFilter: ['class'] };

const targetClassNameStopper = 'diep-native aa_holder active';

const scriptsSwitch = (start, stop) => {
  const callback = () => target?.className === targetClassNameStopper ? stop() : start();

  const observer = new MutationObserver(callback);

  observer.observe(target, config);
}

export default scriptsSwitch;
