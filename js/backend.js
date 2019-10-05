'use strict';

(function () {
  function showErrorMessage(message) {
    console.error(message);
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
