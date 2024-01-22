document.addEventListener('DOMContentLoaded', function () {
  const switchElementIG = document.getElementById('optionSwitchIG');
  const switchElementTT = document.getElementById('optionSwitchTT');
  const radioOptions = document.querySelectorAll('.option');

  // Open Supported URLs link
  let openLink = document.getElementById('openLink');
  openLink.addEventListener('click', function() {
    window.open('supported.html', '_blank');
  });

  // Change switch
  switchElementIG.addEventListener('change', handleSwitchChangeIG);
  switchElementTT.addEventListener('change', handleSwitchChangeTT);

  // Change redirection
  radioOptions.forEach(option => {
    option.addEventListener('change', handleOptionChange);
  });

  // Storage switch
  chrome.storage.sync.get('checkboxStateIG', function(data) {
    if (data.checkboxStateIG) {
      switchElementIG.checked = data.checkboxStateIG;
    }
  });

  chrome.storage.sync.get('checkboxStateTT', function(data) {
    if (data.checkboxStateTT) {
      switchElementTT.checked = data.checkboxStateTT;
    }
  });

  switchElementIG.addEventListener('change', function() {
    chrome.storage.sync.set({ 'checkboxStateIG': switchElementIG.checked });
  });

  switchElementTT.addEventListener('change', function() {
    chrome.storage.sync.set({ 'checkboxStateTT': switchElementTT.checked });
  });

  // Storage redirection
  chrome.storage.sync.get({ selectedOption: 'picuki' }, function(data) {
    const selectedOption = data.selectedOption;
    document.querySelector(`input[value="${selectedOption}"]`).checked = true;
  });

  radioOptions.forEach(function(option) {
    option.addEventListener('change', function() {
      const selectedOption = document.querySelector('input[name="option"]:checked').value;

      chrome.storage.sync.set({ selectedOption: selectedOption });
    });
  });
});

// Communication with the background.js file
function handleSwitchChangeIG() {
  const switchStateIG = document.getElementById('optionSwitchIG').checked;
  chrome.runtime.sendMessage({ switchStateIG });
}

function handleSwitchChangeTT() {
  const switchStateTT = document.getElementById('optionSwitchTT').checked;
  chrome.runtime.sendMessage({ switchStateTT });
}

function handleOptionChange() {
  const selectedOption = document.querySelector('input[name="option"]:checked').value;
  chrome.runtime.sendMessage({ selectedOption });
}
