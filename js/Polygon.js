/**
 * Created by Trailblazer on 08.03.2016.
 */

var snakeApp = snakeApp || {};

$(function () {
// Polygon Object
    snakeApp.Polygon = (function () {
        var $polygon = $('#polygon'),
            $cover = $('#polygon-cover'),
            wiseGuy = snakeApp.WiseGuy,
            params = {
                width: parseInt($polygon.width()),
                height: parseInt($polygon.height())
            };

        wiseGuy.on('crash', function () {
            $cover.show();
        });

        return {
            $el: $polygon,
            width: params.width,
            height: params.height
        }
    }());
});
