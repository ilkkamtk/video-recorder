angular.module('myApp')
    .directive('dynamicUrl', function () {
        return {
            restrict: 'A',
            link: function postLink(scope, element, attr) {
                element.attr('src', attr.dynamicUrlSrc);
            }
        };
    });