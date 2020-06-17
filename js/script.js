'use strict';

(function () {
  window.fireballSize = 22;
  window.getFireballSpeed = function (isWindLeft) {
    if (isWindLeft) {
      return 5;
    }
    return 2;
  };

  window.wizardSpeed = 3;
  var wizardWidth = 70;
  window.getWizardHeight = function () {
    return 1.337 * wizardWidth;
  };
  window.getWizardX = function (gameFieldWidth) {
    return (gameFieldWidth - wizardWidth) / 2;
  };
  window.getWizardY = function (gameFieldHeight) {
    return gameFieldHeight / 3;
  };
}());
