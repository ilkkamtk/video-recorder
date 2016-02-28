angular.module('myApp')
    .animation('.view-slide-in', function () {
        return {
            enter: function (element, done) {
                console.log(element);
                element.css({
                        position: "relative",
                        left: "100%"
                    })
                    .animate({
                        left: 0
                    }, 500, done);
            }
        };
    });