'use strict';

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_PROPS = [];
var WIZARDS_AMOUNT = 4;
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
var eyesColorInput = myWizard.querySelector('input[name=\'eyes-color\']');
var coatColorInput = myWizard.querySelector('input[name=\'coat-color\']');
var fireballColorInput = myWizard.querySelector('input[name=\'fireball-color\']');

var counter = function () {
  var i = 1;

  return {
    count: function (arrayLength) {
      if (i === arrayLength) {
        this.reset();
      }

      return i++;
    },

    reset: function () {
      i = 0;
    }
  };
};

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

  similarWizardsList.appendChild(fragment);

  similarWizardsContainer.classList.remove('hidden');
};

var openWizardsSheet = function () {
  wizardsSheet.classList.remove('hidden');
};

var closeWizardsSheet = function () {
  wizardsSheet.classList.add('hidden');
};

var colorizeMyWizard = function (counterForArrayIndexes, colorArray, article) {
  var arrayLength = colorArray.length;
  var index = counterForArrayIndexes.count(arrayLength);
  var color = colorArray[index];

  if (article.classList.contains('setup-fireball')) {
    article.parentNode.style.backgroundColor = color;
    return color;
  }

  article.style.fill = color;
  return color;
};

var counterForEyesColor = counter();
var counterForCoatColor = counter();
var counterForFireballColor = counter();

myWizard.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('wizard-eyes')) {
    eyesColorInput.value = colorizeMyWizard(counterForEyesColor, EYES_COLORS, evt.target);
  }

  if (evt.target.classList.contains('wizard-coat')) {
    coatColorInput.value = colorizeMyWizard(counterForCoatColor, COAT_COLORS, evt.target);
  }

  if (evt.target.classList.contains('setup-fireball')) {
    fireballColorInput.value = colorizeMyWizard(counterForFireballColor, FIREBALL_COLORS, evt.target);
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
