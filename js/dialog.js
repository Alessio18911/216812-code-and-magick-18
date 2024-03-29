'use strict';

(function () {
  var settingsPopup = document.querySelector('.setup');
  var settingsForm = settingsPopup.querySelector('.setup-wizard-form');
  var settingsPopupPosition = getComputedStyle(settingsPopup);
  var settingsPopupStartX = settingsPopupPosition.getPropertyValue('left');
  var settingsPopupStartY = settingsPopupPosition.getPropertyValue('top');
  var settingsPopupOpenButton = document.querySelector('.setup-open');
  var settingsPopupCloseButton = settingsPopup.querySelector('.setup-close');
  var settingsPopupIcon = settingsPopupOpenButton.querySelector('.setup-open-icon');
  var upload = settingsPopup.querySelector('.upload');
  var userName = settingsPopup.querySelector('.setup-user-name');

  var positionPopup = function (popup, coordX, coordY) {
    popup.style.left = coordX;
    popup.style.top = coordY;
  };

  var uploadMyWizardProps = function () {
    settingsPopup.classList.add('hidden');
  };

  var onKeydown = function (evt) {
    var focusedElement = document.activeElement;
    if (evt.keyCode === window.util.ESCAPE_KEYCODE && focusedElement !== userName) {
      onCloseButtonClick();
    }
  };

  var onOpenButtonClick = function () {
    window.backend.load(null, window.setup.renderWizards);
  };

  var onCloseButtonClick = function () {
    settingsPopup.classList.add('hidden');
    positionPopup(settingsPopup, settingsPopupStartX, settingsPopupStartY);
  };

  var onCloseButtonKeydown = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      onCloseButtonClick();
    }
  };

  var onIconKeydown = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      onOpenButtonClick();
    }
  };

  var onFormSubmit = function (evt) {
    window.backend.save(new FormData(settingsForm), uploadMyWizardProps);
    evt.preventDefault();
  };

  document.addEventListener('keydown', onKeydown);
  settingsPopupOpenButton.addEventListener('click', onOpenButtonClick);
  settingsPopupCloseButton.addEventListener('click', onCloseButtonClick);
  settingsPopupCloseButton.addEventListener('keydown', onCloseButtonKeydown);
  settingsPopupIcon.addEventListener('keydown', onIconKeydown);
  upload.addEventListener('mousedown', function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      settingsPopup.style.left = settingsPopup.offsetLeft - shift.x + 'px';
      settingsPopup.style.top = settingsPopup.offsetTop - shift.y + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (dragged) {
        var onClickPreventDefault = function (draggedEvt) {
          draggedEvt.preventDefault();
          upload.removeEventListener('click', onClickPreventDefault);
        };

        upload.addEventListener('click', onClickPreventDefault);
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  settingsForm.addEventListener('submit', onFormSubmit);

  window.dialog = {
    settingsPopup: settingsPopup
  };
})();
