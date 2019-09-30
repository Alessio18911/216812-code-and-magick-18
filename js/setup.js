'use strict';

var WIZARDS = {
  firstNames: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  lastNames: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  coatColors: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  eyesColors: ['black', 'red', 'blue', 'yellow', 'green'],
  fireballColors: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
  amountOfwizards: 4
};

var WIZARDS_PROPS = [];
var ENTER_KEYCODE = 13;
var ESCAPE_KEYCODE = 27;

var wizardsSheet = document.querySelector('.setup');
var wizardsSheetOpenButton = document.querySelector('.setup-open');
var wizardsSheetCloseButton = wizardsSheet.querySelector('.setup-close');
var wizardsSheetIcon = document.querySelector('.setup-open-icon');
var similarWizardsContainer = wizardsSheet.querySelector('.setup-similar');
var similarWizardsList = wizardsSheet.querySelector('.setup-similar-list');
var userName = wizardsSheet.querySelector('.setup-user-name');
var myWizard = document.querySelector('.setup-player');
var eyesColorInput = myWizard.querySelector('input[name="eyes-color"]');
var coatColorInput = myWizard.querySelector('input[name="coat-color"]');
var fireballColorInput = myWizard.querySelector('input[name="fireball-color"]');

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

for (var i = 0; i < WIZARDS.amountOfwizards; i++) {
  var wizardProps = getWizardProps(WIZARDS.firstNames, WIZARDS.lastNames, WIZARDS.coatColors, WIZARDS.eyesColors);
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

  similarWizardsList.appendChild(fragment);

  similarWizardsContainer.classList.remove('hidden');
};

var openWizardsSheet = function () {
  wizardsSheet.classList.remove('hidden');
};

var closeWizardsSheet = function () {
  wizardsSheet.classList.add('hidden');
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

var setMyWizardPartColor = function (color, part, input) {
  input.value = color;

  if (!part.classList.contains('setup-fireball')) {
    part.style.fill = color;
    return;
  }

  part.parentNode.style.backgroundColor = color;
};

var chooseEyesColor = switchColor(WIZARDS.eyesColors);
var chooseCoatColor = switchColor(WIZARDS.coatColors);
var chooseFireballColor = switchColor(WIZARDS.fireballColors);

myWizard.addEventListener('click', function (evt) {
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
});

wizardsSheetOpenButton.addEventListener('click', openWizardsSheet);
wizardsSheetCloseButton.addEventListener('click', closeWizardsSheet);
wizardsSheetCloseButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeWizardsSheet();
  }
});

wizardsSheetIcon.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openWizardsSheet();
  }
});

document.addEventListener('keydown', function (evt) {
  var focusedElement = document.activeElement;
  if (evt.keyCode === ESCAPE_KEYCODE && focusedElement !== userName) {
    closeWizardsSheet();
  }
});

renderWizards(WIZARDS_PROPS);
