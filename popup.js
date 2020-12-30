document.getElementById('predator-refresh').addEventListener('click', () => {
  chrome.tabs.executeScript({ file: 'predator.js' });
});