/**
 * Created by Trailblazer on 08.03.2016.
 */

var snakeApp = snakeApp || {};

$(function () {
    // Dashboard Object
    snakeApp.Dashboard = (function () {
        var _speed = {
            'Slow': 400,
            'Normal': 250,
            'Fast': 100,
            'Faster': 50
        };
        var snake = snakeApp.Snake,
            $start = $('#start').click(function(){
                snakeApp.Snake.start({
                    speed: _speed[$('#speed input[name=speed]:checked').val()]
                });
            }),
            $points = $('#points');

        return {
            setPoints: function (points) {
                points = points || 25;
                $points.text(parseInt($points.text()) + points);
            }
        }
    }());
});