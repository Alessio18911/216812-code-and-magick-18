'use strict';

var WIZARDS_SHEET = document.querySelector('.setup');
WIZARDS_SHEET.classList.remove('hidden');

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_PROPS = [];
var WIZARDS_AMOUNT = 4;
var SIMILAR_WIZARDS_CONTAINER = WIZARDS_SHEET.querySelector('.setup-similar');
var SIMILAR_WIZARDS_LIST = WIZARDS_SHEET.querySelector('.setup-similar-list');

var getArrayElement = function (array) {
  var index = Math.floor(Math.random() * array.length);

  return array[index];
};

var getWizardProps = function (firstNames, lastNames, coatColors, eyesColors) {
  var firstName = getArrayElement(firstNames);
  var lastName = getArrayElement(lastNames);
  var coatColor = getArrayElement(coatColors);
  var eyesColor = getArrayElement(eyesColors);

  return {name: firstName + ' ' + lastName, coatColor: coatColor, eyesColor: eyesColor};
};

for (var i = 0; i < WIZARDS_AMOUNT; i++) {
  var wizardProps = getWizardProps(FIRST_NAMES, LAST_NAMES, COAT_COLORS, EYES_COLORS);
  WIZARDS_PROPS.push(wizardProps);
}

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

  SIMILAR_WIZARDS_LIST.appendChild(fragment);

  SIMILAR_WIZARDS_CONTAINER.classList.remove('hidden');
};

renderWizards(WIZARDS_PROPS);
