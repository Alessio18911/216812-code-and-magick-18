'use strict';

(function () {
  var FONT = '16px PT Mono';
  var TEXT_COLOR = '#000000';

  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_BOTTOM_Y = CLOUD_Y + CLOUD_HEIGHT;
  var CLOUD_PADDING_LEFT = 40;
  var CLOUD_COLOR = '#ffffff';

  var SHADOW_OFFSET_X = 10;
  var SHADOW_OFFSET_Y = 10;
  var SHADOW_X = CLOUD_X + SHADOW_OFFSET_X;
  var SHADOW_Y = CLOUD_Y + SHADOW_OFFSET_Y;
  var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';

  var HIST_HEIGHT = 0.55 * CLOUD_HEIGHT;
  var COLUMN_WIDTH = 40;
  var COLUMNS_SPACE = 50;
  var COLUMN_OFFSET_FROM_BOTTOM = 40;
  var NEXT_COLUMN_X = COLUMN_WIDTH + COLUMNS_SPACE;
  var MY_COLUMN_COLOR = 'rgba(255, 0, 0, 1)';
  var IS_HIST_COLUMN = false;

  var TITLE_OFFSET_X = 20;
  var TITLE_OFFSET_Y = 30;
  var TITLE_X = CLOUD_X + TITLE_OFFSET_X;
  var TITLE_Y = CLOUD_Y + TITLE_OFFSET_Y;
  var TITLE_SECOND_ROW_OFFSET_Y = 20;

  var TEXT_OFFSET_FROM_BOTTOM = 20;
  var TEXT_Y = CLOUD_BOTTOM_Y - TEXT_OFFSET_FROM_BOTTOM;
  var TIME_OFFSET_FROM_COLUMN_TOP = 10;

  var CONTENT_OFFSET_X = CLOUD_X + CLOUD_PADDING_LEFT;

  var toggleIsHistColumn = function (isHistColumn) {
    return !isHistColumn;
  };

  var renderRectangle = function (ctx, rectX, rectY, width, height, color) {
    ctx.fillStyle = color;

    if (IS_HIST_COLUMN) {
      height = -height;
    }

    ctx.fillRect(rectX, rectY, width, height);
  };

  var getDivisionValue = function (times) {
    var maxTime = Math.round(Math.max.apply(null, times));
    var divisionValue = HIST_HEIGHT / maxTime;

    return divisionValue;
  };

  var getColumnHeight = function (times, time) {
    var divisionValue = getDivisionValue(times);

    return Math.round(divisionValue * time);
  };

  var getColumnColor = function (name) {
    if (name === 'Вы') {
      return MY_COLUMN_COLOR;
    }

    var lightness = Math.floor(Math.random() * 100);
    return 'hsl(240, 100%, ' + lightness + '%)';
  };

  var setTextParams = function (ctx) {
    ctx.font = FONT;
    ctx.fillStyle = TEXT_COLOR;
  };

  var outputName = function (ctx, name, nameX, nameY) {
    setTextParams(ctx);
    ctx.fillText(name, nameX, nameY);
  };

  var outputTime = function (ctx, time, timeX, columnHeight) {
    setTextParams(ctx);
    var timeY = CLOUD_BOTTOM_Y - COLUMN_OFFSET_FROM_BOTTOM - columnHeight - TIME_OFFSET_FROM_COLUMN_TOP;
    ctx.fillText(Math.round(time), timeX, timeY);
  };

  var outputTitle = function (ctx, titleX, titleY) {
    setTextParams(ctx);
    ctx.fillText('Ура, Вы победили!', titleX, titleY);
    ctx.fillText('Список результатов:', titleX, titleY + TITLE_SECOND_ROW_OFFSET_Y);
  };

  window.renderStatistics = function (ctx, names, times) {
    renderRectangle(ctx, SHADOW_X, SHADOW_Y, CLOUD_WIDTH, CLOUD_HEIGHT, SHADOW_COLOR);
    renderRectangle(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_COLOR);
    outputTitle(ctx, TITLE_X, TITLE_Y);

    var startColumnX = CONTENT_OFFSET_X;
    var startColumnY = CLOUD_BOTTOM_Y - COLUMN_OFFSET_FROM_BOTTOM;

    for (var i = 0; i < times.length; i++) {
      var columnHeight = getColumnHeight(times, times[i]);
      var columnColor = getColumnColor(names[i]);

      outputName(ctx, names[i], startColumnX, TEXT_Y);
      outputTime(ctx, times[i], startColumnX, columnHeight);
      IS_HIST_COLUMN = toggleIsHistColumn(IS_HIST_COLUMN);
      renderRectangle(ctx, startColumnX, startColumnY, COLUMN_WIDTH, columnHeight, columnColor);
      IS_HIST_COLUMN = toggleIsHistColumn(IS_HIST_COLUMN);
      startColumnX += NEXT_COLUMN_X;
    }
  };
})();
