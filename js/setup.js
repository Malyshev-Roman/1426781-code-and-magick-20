'use strict';

var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марьян', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var COUNTS = 4;
var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = document.querySelector('.setup-user-name');
var wizardCoat = document.querySelector('.wizard-coat');
var wizardEyes = document.querySelector('.wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');
var setupPlayer = document.querySelector('.setup-player');
var inputFirst = setupPlayer.querySelector('input');
var inputLast = setupPlayer.querySelector('input:last-child');
var fireBallInput = setupPlayer.querySelector('.setup-fireball-wrap input');
var wizards = [];

var arrayWizardElement = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

var createWizards = function () {
  for (var i = 0; i < COUNTS; i++) {
    wizards [i] = {
      name: arrayWizardElement(WIZARD_FIRST_NAMES) + ' ' + arrayWizardElement(WIZARD_LAST_NAMES),
      coatColor: arrayWizardElement(WIZARD_COAT_COLORS),
      eyesColor: arrayWizardElement(WIZARD_EYES_COLORS)
    };
  }
  return wizards;
};

createWizards();

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var createFragment = function (wizard) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizard.length; i++) {
    fragment.appendChild(renderWizard(wizard[i]));
  }
  similarListElement.appendChild(fragment);
};
createFragment(wizards);
document.querySelector('.setup-similar').classList.remove('hidden');

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape' && evt.target.className !== 'setup-user-name') {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', openPopup);

var keyCodeEnter = function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
};

setupOpen.addEventListener('keydown', keyCodeEnter);

setupClose.addEventListener('click', closePopup);

setupClose.addEventListener('keydown', keyCodeEnter);

var changeCoatColor = function () {
  var colorCoat = arrayWizardElement(WIZARD_COAT_COLORS);
  wizardCoat.style.fill = colorCoat;
  inputFirst.value = colorCoat;
};

var changeEyesColor = function () {
  var colorEyes = arrayWizardElement(WIZARD_EYES_COLORS);
  wizardEyes.style.fill = colorEyes;
  inputLast.value = colorEyes;
};

var changeFireballColor = function () {
  var colorFireball = arrayWizardElement(WIZARD_FIREBALL_COLORS);
  wizardFireball.style.background = colorFireball;
  fireBallInput.value = colorFireball;
};

wizardCoat.addEventListener('click', changeCoatColor);

wizardEyes.addEventListener('click', changeEyesColor);

wizardFireball.addEventListener('click', changeFireballColor);

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function () {
  var valueLength = userNameInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - MIN_NAME_LENGTH) + ' симв.');
  } else {
    userNameInput.setCustomValidity('');
  }
});
