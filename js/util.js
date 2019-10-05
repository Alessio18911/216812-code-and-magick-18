'use strict';

(function () {
  var WIZARDS_PROPS = {
    colorCoat: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    colorEyes: ['black', 'red', 'blue', 'yellow', 'green'],
    colorFireball: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };

  var ENTER_KEYCODE = 13;
  var ESCAPE_KEYCODE = 27;

  var getArrayElement = function (array) {
    var index = Math.floor(Math.random() * array.length);

    return array[index];
  };

  window.util = {
    WIZARDS_PROPS: WIZARDS_PROPS,
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESCAPE_KEYCODE: ESCAPE_KEYCODE,
    getArrayElement: getArrayElement
  };
})();
