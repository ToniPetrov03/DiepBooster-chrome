const target = document.getElementById('aa_main');
const config = { attributeFilter: ['class'] };

const targetClassNameStarter = 'diep-native aa_holder';
const targetClassNameStopper = 'diep-native aa_holder active';

const scriptsSwitch = (start, stop) => {
  if (!target || target.className !== targetClassNameStopper) {
    return start();
  }

  const switcher = {
    [targetClassNameStarter]: start,
    [targetClassNameStopper]: stop,
  };

  new MutationObserver(() => switcher[target.className]()).observe(target, config);
}

export default scriptsSwitch;
