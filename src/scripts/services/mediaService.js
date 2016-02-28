angular.module('myApp')
    .factory('MediaService', MediaService);

function MediaService($sce) {
    var mediaVariables = {
        mediaUrl: 'http://util.mw.metropolia.fi/uploads/',
        userData: {},
        file: 0,
        files: {},
        logged: false
    };

    mediaVariables.setVariable = function (key, value) {
        mediaVariables[key] = value;
    };

    mediaVariables.handleError = function (error) {
        console.log(error);
    };

    mediaVariables.trustSrc = function (src) {
        return $sce.trustAsResourceUrl(mediaVariables.mediaUrl + src);
    };

    mediaVariables.dataURItoBlob = function (dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0) {
            byteString = window.atob(dataURI.split(',')[1]);
        } else {
            byteString = decodeURI(dataURI.split(',')[1]);
        }

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], {
            type: mimeString
        });
    };

    return mediaVariables;
}