/**
 * Created by Trailblazer on 03.03.2016.
 */

var snakeApp = snakeApp || {};

$(function () {
    // Snake Object
    snakeApp.Snake = (function () {
        var o = {
                speed: 100
            },
            NODE_SIZE = 40,
            nodes_amount = 5,
            headPos = {},
            polygon = snakeApp.Polygon,
            dashboard = snakeApp.Dashboard,
            foodMaker = snakeApp.FoodMaker,
            wiseGuy = snakeApp.WiseGuy,
            $head,
            _interval,
            prognosisHead = {left: 1, top: 1},
            course = 'right'; // left, right, up, down

        function _makeNode() {
            return $('<div class="node"/>');
        }

        // Method for detect crash
        function _beforeMove () {
            var flag = true;

            if (
                prognosisHead.top < 0 ||
                prognosisHead.top > polygon.height ||
                prognosisHead.left < 0 ||
                prognosisHead.left > polygon.width
            ) {
                flag = false;
            }

            $head.prevAll('.node').each(function () {
                if (
                    parseInt( $(this).css('left') ) == prognosisHead.left &&
                    parseInt( $(this).css('top') ) == prognosisHead.top
                ) {
                    flag = false;
                }
            });

            return flag;
        }

        function _eatFood () {

            if (
                parseInt( foodMaker.getFood().css('left') ) == prognosisHead.left &&
                parseInt( foodMaker.getFood().css('top') ) == prognosisHead.top
            ) {
                $head.removeClass('head');

                if (foodMaker.getFood().hasClass('b')) {
                    dashboard.setPoints(100);
                } else {
                    dashboard.setPoints();
                }

                $head = foodMaker.getFood().removeClass('food').addClass('head node');

                foodMaker.make();
                return true;
            }

            return false;
        }

        function _setHeadPos (pos) {
            var newPos;

            if (_beforeMove()) {

                if (!_eatFood()) {
                    if (course == 'left' || course == 'up') {
                        _setBodyPos();
                        newPos = headPos[pos] - NODE_SIZE;
                    } else {
                        _setBodyPos();
                        newPos = headPos[pos] + NODE_SIZE;
                    }

                    // Set head position
                    $head
                        .css(
                            pos,
                            newPos
                        );
                }

            } else {
                clearInterval(_interval);
                wiseGuy.trigger('crash');
            }

        }

        function _setBodyPos () {
            $head.prevAll('.node').each(function (i) {
                var $this = $(this);

                $this
                    .data('prevPos', {
                        top: parseInt( $this.css('top') ),
                        left: parseInt( $this.css('left') )
                    });

                if (i == 0) {

                    $this
                        .css({
                            'left' : headPos.left,
                            'top' : headPos.top
                        });

                } else {

                    $this
                        .css({
                            'left' : $this.next('.node').data('prevPos').left,
                            'top' : $this.next('.node').data('prevPos').top
                        });

                }

            });
        }

        function _move () {
            headPos.left = parseInt( $head.css('left') );
            headPos.top =  parseInt( $head.css('top') );

            switch (course) {
                case 'left':
                    prognosisHead.left = headPos.left - NODE_SIZE;
                    _setHeadPos('left');
                    break;
                case 'right':
                    prognosisHead.left = headPos.left + NODE_SIZE;
                    _setHeadPos('left');
                    break;
                case 'up':
                    prognosisHead.top = headPos.top - NODE_SIZE;
                    _setHeadPos('top');
                    break;
                case 'down':
                    prognosisHead.top = headPos.top + NODE_SIZE;
                    _setHeadPos('top');
                    break;
            }
        }

        function _pause () {
            if (_interval) {
                clearInterval(_interval);
                _interval = false;
            } else {
                _interval = setInterval(_move, o.speed);
            }
        }

        function _userEventHandler () {
            var e = arguments[0];
            switch(e.which) {
                case 37: // left
                    if (course != 'right') {
                        course = 'left';
                    }
                    break;

                case 38: // up
                    if (course != 'down') {
                        course = 'up';
                    }
                    break;

                case 39: // right
                    if (course != 'left') {
                        course = 'right';
                    }
                    break;

                case 40: // down
                    if (course != 'up') {
                        course = 'down';
                    }
                    break;

                case 13: // enter
                    // Invoke from this only first time
                    if (!_interval) {
                        _start();
                    }
                    break;

                case 32: // space
                    _pause();
                    break;

                default: return; // exit this handler for other keys
            }
            e.preventDefault(); // prevent the default action (scroll / move caret)
        }

        function _toInitialPosition () {
            //Make initial snake
            for (var  i=0; i < nodes_amount; i++) {
                var $newNode = _makeNode();

                if (i != 0) {
                    $newNode.css('left', NODE_SIZE*i);
                }

                if (i == nodes_amount-1) {
                    $head = $newNode.addClass('head');
                }

                polygon.$el.append($newNode);
            }
        }

        function _start (options) {
            if (options) {
                o = $.extend(o, options);
            }
            _interval = setInterval(_move, o.speed);
            foodMaker.make();
        }

        _toInitialPosition();
        $(document).keydown(_userEventHandler);

        return {
            start: _start
        }
    }());
});
