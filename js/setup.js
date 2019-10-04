'use strict';
(function () {

  var myWizard = window.dialog.settingsPopup.querySelector('.setup-player');
  var similarWizardsContainer = window.dialog.settingsPopup.querySelector('.setup-similar');
  var similarWizardsList = similarWizardsContainer.querySelector('.setup-similar-list');
  var eyesColorInput = myWizard.querySelector('input[name="eyes-color"]');
  var coatColorInput = myWizard.querySelector('input[name="coat-color"]');
  var fireballColorInput = myWizard.querySelector('input[name="fireball-color"]');

  var getWizardProps = function (firstNames, lastNames, coatColors, eyesColors) {
    var firstName = window.util.getArrayElement(firstNames);
    var lastName = window.util.getArrayElement(lastNames);
    var coatColor = window.util.getArrayElement(coatColors);
    var eyesColor = window.util.getArrayElement(eyesColors);

    return {name: firstName + ' ' + lastName, coatColor: coatColor, eyesColor: eyesColor};
  };

  var getAllWizardsProps = function (wizards) {
    var WIZARDS_PROPS = [];

    for (var i = 0; i < wizards.amountOfwizards; i++) {
      var wizardProps = getWizardProps(
          wizards.firstNames,
          wizards.lastNames,
          wizards.coatColors,
          wizards.eyesColors
      );
      WIZARDS_PROPS.push(wizardProps);
    }

    return WIZARDS_PROPS;
  };

  var renderWizards = function (wizardsProps) {
    var fragment = new DocumentFragment();

    for (var j = 0; j < wizardsProps.length; j++) {
      var template = document.querySelector('#similar-wizard-template').content.cloneNode(true);

      var name = template.querySelector('.setup-similar-label');
      name.textContent = wizardsProps[j].name;

      var wizardCoat = template.querySelector('.wizard-coat');
      wizardCoat.style.fill = wizardsProps[j].coatColor;

      var wizardEyes = template.querySelector('.wizard-eyes');
      wizardEyes.style.fill = wizardsProps[j].eyesColor;

      fragment.appendChild(template);
    }

    similarWizardsList.appendChild(fragment);
    similarWizardsContainer.classList.remove('hidden');
  };

  var ALL_WIZARDS_PROPS = getAllWizardsProps(window.util.WIZARDS, window.util.WIZARDS, window.util.WIZARDS, window.util.WIZARDS, window.util.WIZARDS);
  renderWizards(ALL_WIZARDS_PROPS);

  var switchColor = function (colorsArray) {
    var colorsNumber = colorsArray.length;
    var index = 0;

    return function () {
      index += 1;

      if (index === colorsNumber) {
        index = 0;
      }

      return colorsArray[index];
    };
  };

  var chooseEyesColor = switchColor(window.util.WIZARDS.eyesColors);
  var chooseCoatColor = switchColor(window.util.WIZARDS.coatColors);
  var chooseFireballColor = switchColor(window.util.WIZARDS.fireballColors);

  var setMyWizardPartColor = function (color, part, input) {
    input.value = color;

    if (!part.classList.contains('setup-fireball')) {
      part.style.fill = color;
      return;
    }

    part.parentNode.style.backgroundColor = color;
  };

  var onMyWizardClick = function (evt) {
    var target = evt.target;

    if (target.classList.contains('wizard-eyes')) {
      var eyesColor = chooseEyesColor();
      setMyWizardPartColor(eyesColor, target, eyesColorInput);
    }

    if (target.classList.contains('wizard-coat')) {
      var coatColor = chooseCoatColor();
      setMyWizardPartColor(coatColor, target, coatColorInput);
    }

    if (target.classList.contains('setup-fireball')) {
      var fireballColor = chooseFireballColor();
      setMyWizardPartColor(fireballColor, target, fireballColorInput);
    }
  };

  myWizard.addEventListener('click', onMyWizardClick);
})();
