'use strict';

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS = [];
var WIZARDS_AMOUNT = 4;
var SETUP_SIMILAR = document.querySelector('.setup-similar');
var WIZARDS_LIST = SETUP_SIMILAR.querySelector('.setup-similar-list');

var getArrayIndex = function (array) {
  var length = array.length;
  return Math.floor(Math.random() * length);
};

var getArrayValue = function (values) {
  var index = getArrayIndex(values);
  return values[index];
};

var createWizardProps = function (firstNames, lastNames, coatColors, eyesColors) {
  var firstName = getArrayValue(firstNames);
  var lastName = getArrayValue(lastNames);
  var coatColor = getArrayValue(coatColors);
  var eyesColor = getArrayValue(eyesColors);

  var wizard = {
    name: firstName + ' ' + lastName,
    coatColor: coatColor,
    eyesColor: eyesColor
  };

  return wizard;
};

for (var i = 0; i < WIZARDS_AMOUNT; i++) {
  var newWizard = createWizardProps(FIRST_NAMES, LAST_NAMES, COAT_COLORS, EYES_COLORS);
  WIZARDS.push(newWizard);
}

var createWizardsSet = function (wizards) {
  var fragment = new DocumentFragment();

  for (var j = 0; j < wizards.length; j++) {
    var template = document.querySelector('#similar-wizard-template').content.cloneNode(true);

    var name = template.querySelector('.setup-similar-label');
    name.textContent = wizards[j].name;

    var wizardCoat = template.querySelector('.wizard-coat');
    wizardCoat.style.fill = wizards[j].coatColor;

    var wizardEyes = template.querySelector('.wizard-eyes');
    wizardEyes.style.fill = wizards[j].eyesColor;

    fragment.appendChild(template);
  }

  WIZARDS_LIST.appendChild(fragment);

  SETUP_SIMILAR.classList.remove('hidden');
};

createWizardsSet(WIZARDS);
