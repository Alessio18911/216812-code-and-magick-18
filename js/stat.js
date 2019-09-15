'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_COLOR = '#ffffff';

var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var SHADOW_X = CLOUD_X + 10;
var SHADOW_Y = CLOUD_Y + 10;

var FONT = '16px PT Mono';
var TEXT_COLOR = '#000000';

var PADDING_LEFT = CLOUD_X + 40;
var COLUMN_PADDING_BOTTOM = CLOUD_Y + CLOUD_HEIGHT - 50;
var HIST_HEIGHT = 150;
var COLUMN_WIDTH = 40;
var COLUMN_OFFSET = 50;
var NEXT_COLUMN_X = COLUMN_WIDTH + COLUMN_OFFSET;
var MY_COLUMN_COLOR = 'rgba(255, 0, 0, 1)';

var renderRectangle = function (ctx, color, offsetX, offsetY, width, height) {
  ctx.fillStyle = color;
  ctx.fillRect(offsetX, offsetY, width, height);
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

var outputName = function (ctx, name, offsetX) {
  ctx.font = FONT;
  ctx.fillStyle = TEXT_COLOR;
  var offsetY = COLUMN_PADDING_BOTTOM + 20;
  ctx.fillText(name, offsetX, offsetY);
};

var outputTime = function (ctx, time, offsetX, columnHeight) {
  ctx.font = FONT;
  ctx.fillStyle = TEXT_COLOR;
  var offsetY = COLUMN_PADDING_BOTTOM - columnHeight - 10;
  ctx.fillText(Math.round(time), offsetX, offsetY);
};

window.renderStatistics = function (ctx, names, times) {
  renderRectangle(ctx, SHADOW_COLOR, SHADOW_X, SHADOW_Y, CLOUD_WIDTH, CLOUD_HEIGHT);
  renderRectangle(ctx, CLOUD_COLOR, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

  var startOffsetX = PADDING_LEFT;

  for (var i = 0; i < times.length; i++) {
    var columnHeight = getColumnHeight(times, times[i]);
    var columnColor = getColumnColor(names[i]);

    outputName(ctx, names[i], startOffsetX);
    outputTime(ctx, times[i], startOffsetX, columnHeight);
    renderRectangle(ctx, columnColor, startOffsetX, COLUMN_PADDING_BOTTOM, COLUMN_WIDTH, -columnHeight);

    startOffsetX += NEXT_COLUMN_X;
  }
};
