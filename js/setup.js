'use strict';
(function () {
  var myWizard = document.querySelector('.setup-player');
  var similarWizardsContainer = document.querySelector('.setup-similar');
  var similarWizardsList = similarWizardsContainer.querySelector('.setup-similar-list');
  var eyesColorInput = myWizard.querySelector('input[name="eyes-color"]');
  var coatColorInput = myWizard.querySelector('input[name="coat-color"]');
  var fireballColorInput = myWizard.querySelector('input[name="fireball-color"]');

  var renderWizards = function (wizardsProps) {
    similarWizardsList.innerHTML = '';
    var amountOfWizards = 4;
    var fragment = new DocumentFragment();

    for (var j = 0; j < amountOfWizards; j++) {
      var wizard = window.util.getArrayElement(wizardsProps);
      var template = document.querySelector('#similar-wizard-template').content.cloneNode(true);

      var name = template.querySelector('.setup-similar-label');
      name.textContent = wizard.name;

      var wizardCoat = template.querySelector('.wizard-coat');
      wizardCoat.style.fill = wizard.colorCoat;

      var wizardEyes = template.querySelector('.wizard-eyes');
      wizardEyes.style.fill = wizard.colorEyes;

      fragment.appendChild(template);
    }

    similarWizardsList.appendChild(fragment);
    similarWizardsContainer.classList.remove('hidden');
  };

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

  var chooseEyesColor = switchColor(window.util.WIZARDS_PROPS.colorEyes);
  var chooseCoatColor = switchColor(window.util.WIZARDS_PROPS.colorCoat);
  var chooseFireballColor = switchColor(window.util.WIZARDS_PROPS.colorFireball);

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

  window.setup = {
    renderWizards: renderWizards
  };
})();
