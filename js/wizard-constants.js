'use strict';

(function () {
  var fireballSize = 22;
  var wizardSpeed = 3;
  var wizardWidth = 70;

  var getFireballSpeed = function (left) {
    return left ? 5 : 2;
  };

  var getWizardHeight = function (widthOfWizard) {
    return 1.337 * widthOfWizard;
  };

  var getWizardX = function (width) {
    return (width - wizardWidth) / 2;
  };

  var getWizardY = function (height) {
    return height / 3;
  };

  window.wizardConstants = {
    fireballSize: fireballSize,
    wizardSpeed: wizardSpeed,
    wizardWidth: wizardWidth,
    getFireballSpeed: getFireballSpeed,
    getWizardHeight: getWizardHeight,
    getWizardX: getWizardX,
    getWizardY: getWizardY
  };
})();
