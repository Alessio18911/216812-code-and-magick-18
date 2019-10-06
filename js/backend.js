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

  function httpRequest(url, method, data, callback) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      var error;

      switch (xhr.status) {
        case 200:
          callback(JSON.parse(xhr.responseText));
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
          error = 'Ошибка ' + xhr.status;
      }

      if (error) {
        showErrorMessage(error);
      }
    });

    xhr.addEventListener('error', function () {
      showErrorMessage('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      showErrorMessage('Запрос не выполнился за ' + xhr.timeout / 1000 + ' секунд');
    });

    xhr.open(method, url);
    xhr.send(data);
    xhr.timeout = 10000;
  }

  function load(data, onLoad) {
    var url = 'https://js.dump.academy/code-and-magick/data';
    httpRequest(url, 'GET', data, onLoad);
  }

  function save(data, onLoad) {
    var url = 'https://js.dump.academy/code-and-magick';
    httpRequest(url, 'POST', data, onLoad);
  }

  window.backend = {
    load: load,
    save: save,
    showErrorMessage: showErrorMessage
  };
})();
