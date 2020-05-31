'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 20;
var TEXT_WIDTH = 50;
var BAR_WIDTH = 40;
var barHEIGHT = 150 - FONT_GAP;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';

  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP * 2);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillText(players[i], CLOUD_X + TEXT_WIDTH + (BAR_WIDTH + TEXT_WIDTH) * i, CLOUD_Y + GAP + FONT_GAP + barHEIGHT + FONT_GAP + TEXT_WIDTH);
    ctx.fillText(Math.ceil(times[i]), CLOUD_X + TEXT_WIDTH + (BAR_WIDTH + TEXT_WIDTH) * i, CLOUD_HEIGHT - FONT_GAP - BAR_WIDTH - (barHEIGHT * times[i]) / maxTime);

    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      ctx.fillRect(CLOUD_X + TEXT_WIDTH + (TEXT_WIDTH + BAR_WIDTH) * i, CLOUD_HEIGHT - BAR_WIDTH - (barHEIGHT * times[i]) / maxTime, BAR_WIDTH, (barHEIGHT * times[i]) / maxTime);
      ctx.fillStyle = '#000';
    } else {
      ctx.fillStyle = 'hsl(240, ' + 25 * i + '%, 50%)';
      ctx.fillRect(CLOUD_X + TEXT_WIDTH + (TEXT_WIDTH + BAR_WIDTH) * i, CLOUD_HEIGHT - BAR_WIDTH - (barHEIGHT * times[i]) / maxTime, BAR_WIDTH, (barHEIGHT * times[i]) / maxTime);
      ctx.fillStyle = '#000';
    }
  }
};
