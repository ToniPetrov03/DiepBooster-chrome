const target = document.getElementById('aa_main');
const config = { attributeFilter: ['class'] };

const targetClassNameStarter = 'diep-native aa_holder';
const targetClassNameStopper = 'diep-native aa_holder active';

const scriptsSwitch = (start, stop) => {
  if (target?.className !== targetClassNameStopper) {
    return start();
  }

  const callback = () => {
    target.className === targetClassNameStarter && start();
    target.className === targetClassNameStopper && stop();
  }

  const observer = new MutationObserver(callback);

  observer.observe(target, config);
}

export default scriptsSwitch;
