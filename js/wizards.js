'use strict';

(function () {

  var setup = document.querySelector('.setup');
  var similarListElement = setup.querySelector('.setup-similar-list');
  var wizardsContainer = document.querySelector('.setup-similar');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var wizardCoatColor = document.querySelector('input[name="coat-color"]');
  var wizardEyesColor = document.querySelector('input[name="eyes-color"]');
  var COUNTS = 4;

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
    similarListElement.innerHTML = '';
    similarListElement.appendChild(fragment);
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

  var createSimilarWizards = function (loadedData) {
    window.similarWizards = loadedData;

    window.updateWizards(window.similarWizards);
    wizardsContainer.classList.remove('hidden');
  };

  window.backend.load(createSimilarWizards, errorHandler);

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === wizardCoatColor.value) {
      rank += 2;
    }

    if (wizard.colorEyes === wizardEyesColor.value) {
      rank += 1;
    }

    return rank;
  };

  var compareNames = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var sortWizards = function (left, right) {
    var difference = getRank(right) - getRank(left);

    if (difference === 0) {
      difference = compareNames(left.name, right.name);
    }

    return difference;
  };

  var updateWizards = function (wizards) {
    wizards.sort(sortWizards);

    successHandler(wizards);
  };

  window.updateWizards = updateWizards;

})();
