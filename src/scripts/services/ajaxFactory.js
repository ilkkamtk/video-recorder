angular.module('myApp')
    .factory('AjaxFactory', AjaxFactory);

function AjaxFactory($http, $httpParamSerializer) {
    var urlBase = 'http://util.mw.metropolia.fi/ImageRekt/api/v2/';
    var ajaxFunctions = {};

    ajaxFunctions.register = function (args) {
        return $http.post(urlBase + 'register', $httpParamSerializer(args), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    };

    ajaxFunctions.login = function (args) {
        return $http.post(urlBase + 'login', $httpParamSerializer(args), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    };

    ajaxFunctions.fileByUser = function (args) {
        return $http.get(urlBase + 'files/user/' + args);
    };

    ajaxFunctions.saveMedia = function (args, win, fail) {
        var fileURL = args.url;

        var options = new FileUploadOptions();
        options.fileKey = 'file';
        options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
        options.mimeType = args.mimeType;

        var params = {};
        params.user = args.user;
        params.type = args.type;
        params.httpMethod = 'POST';
        params.title = args.title;
        params.description = args.description;

        options.params = params;

        options.headers = {
            Connection: 'close'
        };
        options.chunkedMode = false;

        var ft = new FileTransfer();
        ft.upload(fileURL, encodeURI(urlBase + 'upload'), win, fail, options, true);
    };


    return ajaxFunctions;
}