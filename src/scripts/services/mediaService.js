angular.module('myApp')
    .service('MediaService', function () {
        var mediaVariables = {
            mediaUrl: 'http://util.mw.metropolia.fi/uploads/',
            userData: {}
        };

        mediaVariables.handleError = function (error) {
            console.log(error.data);
        };

        return mediaVariables;
    });