'use strict';

(function () {
  var WIZARDS = {
    firstNames: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    lastNames: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
    coatColors: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    eyesColors: ['black', 'red', 'blue', 'yellow', 'green'],
    fireballColors: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
    amountOfwizards: 4
  };

  var ENTER_KEYCODE = 13;
  var ESCAPE_KEYCODE = 27;

  var getArrayElement = function (array) {
    var index = Math.floor(Math.random() * array.length);

    return array[index];
  };

  window.util = {
    WIZARDS: WIZARDS,
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESCAPE_KEYCODE: ESCAPE_KEYCODE,
    getArrayElement: getArrayElement
  };
})();
