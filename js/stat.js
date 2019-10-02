'use strict';

var FONT = '16px PT Mono';
var TEXT_COLOR = '#000000';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_PADDING_LEFT = 40;
var CLOUD_PADDING_BOTTOM = CLOUD_Y + CLOUD_HEIGHT - 37;
var CLOUD_COLOR = '#ffffff';

var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var SHADOW_OFFSET_X = 10;
var SHADOW_OFFSET_Y = 10;
var SHADOW_X = CLOUD_X + SHADOW_OFFSET_X;
var SHADOW_Y = CLOUD_Y + SHADOW_OFFSET_Y;

var HIST_HEIGHT = 150;
var COLUMN_WIDTH = 40;
var COLUMN_OFFSET_X = 50;
var NEXT_COLUMN_X = COLUMN_WIDTH + COLUMN_OFFSET_X;
var MY_COLUMN_COLOR = 'rgba(255, 0, 0, 1)';

var renderRectangle = function (ctx, color, rectX, rectY, width, height) {
  ctx.fillStyle = color;
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

var outputName = function (ctx, name, nameX) {
  setTextParams(ctx);
  var nameY = CLOUD_PADDING_BOTTOM + 20;
  ctx.fillText(name, nameX, nameY);
};

var outputTime = function (ctx, timeX, time, columnHeight) {
  setTextParams(ctx);
  var timeY = CLOUD_PADDING_BOTTOM - columnHeight - 10;
  ctx.fillText(Math.round(time), timeX, timeY);
};

var outputTitle = function (ctx) {
  setTextParams(ctx);
  var titleX = CLOUD_X + 20;
  var titleY = CLOUD_Y + 30;
  ctx.fillText('Ура, Вы победили!', titleX, titleY);
  ctx.fillText('Список результатов:', titleX, titleY + 20);
};

window.renderStatistics = function (ctx, names, times) {
  renderRectangle(ctx, SHADOW_COLOR, SHADOW_X, SHADOW_Y, CLOUD_WIDTH, CLOUD_HEIGHT);
  renderRectangle(ctx, CLOUD_COLOR, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);
  outputTitle(ctx);

  var startColumnX = CLOUD_X + CLOUD_PADDING_LEFT;

  for (var i = 0; i < times.length; i++) {
    var columnHeight = getColumnHeight(times, times[i]);
    var columnColor = getColumnColor(names[i]);

    outputName(ctx, names[i], startColumnX);
    outputTime(ctx, startColumnX, times[i], columnHeight);
    renderRectangle(ctx, columnColor, startColumnX, CLOUD_PADDING_BOTTOM, COLUMN_WIDTH, -columnHeight);

    startColumnX += NEXT_COLUMN_X;
  }
};
