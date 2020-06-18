'use strict';

(function () {

  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var COUNTS = 4;

  var userDialog = document.querySelector('.setup');
  userDialog.classList.remove('hidden');

  var setupForm = userDialog.querySelector('.setup-wizard-form');
  var setupFormBtn = setupForm.querySelector('.setup-submit');
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
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

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < COUNTS; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
    document.querySelector('.setup-similar').classList.remove('hidden');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  var onCoatClick = function () {
    var colorCoat = arrayWizardElement(WIZARD_COAT_COLORS);
    wizardCoat.style.fill = colorCoat;
    inputFirst.value = colorCoat;
  };

  var onEyesClick = function () {
    var colorEyes = arrayWizardElement(WIZARD_EYES_COLORS);
    wizardEyes.style.fill = colorEyes;
    inputLast.value = colorEyes;
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
