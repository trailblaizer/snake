/**
 * Created by Trailblazer on 08.03.2016.
 */

var snakeApp = snakeApp || {};

$(function () {
// FoodMaker Object
    snakeApp.FoodMaker = (function () {
        var _$food, i= 0, _timeOut, wiseGuy = snakeApp.WiseGuy;

        function _makeFood () {
            clearTimeout(_timeOut);

            _$food = $('<div class="food"/>').css({
                left: _getRandomPos(),
                top: _getRandomPos()
            });

            if (i == 5) {
                _$food.addClass('b');
                _setTimeOut();
                i=0;
            }

            snakeApp.Polygon.$el.append(_$food);
            i++;
        }

        function _setTimeOut () {
            _timeOut = setTimeout(function () {
                _$food.fadeIn('fast', function () {
                    $(this).remove();
                    _makeFood();
                });
            }, 3000);
        }

        function _getRandomPos () {
            return (Math.floor(Math.random() * 14) + 1) * 40;
        }

        wiseGuy.on('crash', function () {
            clearTimeout(_timeOut);
            _$food.remove();
        });

        return {
            make: _makeFood,
            getFood: function () {
                return _$food;
            }
        }
    }());
});