'use strict';

(function () {

  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var userDialog = document.querySelector('.setup');
  userDialog.classList.remove('hidden');

  var setupForm = userDialog.querySelector('.setup-wizard-form');
  var setupFormBtn = setupForm.querySelector('.setup-submit');
  var wizardCoat = document.querySelector('.wizard-coat');
  var wizardEyes = document.querySelector('.wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');
  var setupPlayer = document.querySelector('.setup-player');
  var inputFirst = setupPlayer.querySelector('input');
  var inputLast = setupPlayer.querySelector('input:last-child');
  var fireBallInput = setupPlayer.querySelector('.setup-fireball-wrap input');

  var arrayWizardElement = function (arr) {
    var rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
  };

  var updateWizardRender = (function () {
    window.updateWizards(window.similarWizards);
  });

  var onCoatClick = function () {
    var colorCoat = arrayWizardElement(WIZARD_COAT_COLORS);
    wizardCoat.style.fill = colorCoat;
    inputFirst.value = colorCoat;
    window.debounce(updateWizardRender());
  };

  var onEyesClick = function () {
    var colorEyes = arrayWizardElement(WIZARD_EYES_COLORS);
    wizardEyes.style.fill = colorEyes;
    inputLast.value = colorEyes;
    window.debounce(updateWizardRender());
  };

  var onFireballClick = function () {
    var colorFireball = arrayWizardElement(WIZARD_FIREBALL_COLORS);
    wizardFireball.style.background = colorFireball;
    fireBallInput.value = colorFireball;
  };

  var onFormSendSuccess = function () {
    userDialog.classList.add('hidden');
    setupFormBtn.disabled = false;
  };

  var onFormSendError = function (errorMessage) {
    window.util.showError(errorMessage);
    setupFormBtn.disabled = false;
  };

  setupForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    setupFormBtn.disabled = true;

    window.backend.save(new FormData(setupForm), onFormSendSuccess, onFormSendError);
  });

  wizardCoat.addEventListener('click', onCoatClick);
  wizardEyes.addEventListener('click', onEyesClick);
  wizardFireball.addEventListener('click', onFireballClick);
})();
