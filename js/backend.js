'use strict';

(function () {
  function showErrorMessage(message) {
    var errorWindow = document.createElement('div');
    errorWindow.style.width = '500px';
    errorWindow.style.minHeight = '250px';
    errorWindow.style.padding = '30px';
    errorWindow.style.position = 'absolute';
    errorWindow.style.top = 'calc(50% - 150px)';
    errorWindow.style.left = 'calc(50% - 250px)';
    errorWindow.style.zIndex = 5;
    errorWindow.style.fontSize = '16px';
    errorWindow.style.color = 'red';
    errorWindow.style.backgroundColor = 'lightblue';
    errorWindow.style.borderRadius = '70px 20px';
    errorWindow.style.boxSizing = 'border-box';
    errorWindow.style.wordWrap = 'break-word';
    errorWindow.textContent = message + '. Перезагрузите страницу и повторите действие';

    document.body.insertAdjacentElement('afterbegin', errorWindow);
  }

  function load(onLoad, onError) {
    var url = 'https://js.dump.academy/code-and-magick/data';
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      var error;

      switch (xhr.status) {
        case 200:
          onLoad(JSON.parse(xhr.responseText));
          break;

        case 400:
          error = 'Неверный запрос';
          break;

        case 401:
          error = 'Пользователь не авторизован';
          break;

        case 404:
          error = 'Ничего не найдено';
          break;

        default:
          error = 'Ошибка ' + xhr.status + ' ' + xhr.responseText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не выполнился за ' + xhr.timeout / 1000 + ' секунд');
    });

    xhr.open('GET', url);
    xhr.send();
    xhr.timeout = 10000;
  }

  function save(data, onLoad, onError) {
    var url = 'https://js.dump.academy/code-and-magick';
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      var error;

      switch (xhr.status) {
        case 200:
          onLoad(JSON.parse(xhr.responseText));
          break;

        case 400:
          error = 'Неверный запрос';
          break;

        case 401:
          error = 'Пользователь не авторизован';
          break;

        case 404:
          error = 'Ничего не найдено';
          break;

        default:
          error = 'Ошибка ' + xhr.status + ' ' + xhr.responseText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не выполнился за ' + xhr.timeout / 1000 + ' секунд');
    });

    xhr.open('POST', url);
    xhr.send(data);
  }

  window.backend = {
    load: load,
    save: save,
    showErrorMessage: showErrorMessage
  };
})();
