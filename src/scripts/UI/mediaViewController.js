angular.module('myApp')
    .controller('MediaViewController', MediaViewController);

function MediaViewController($scope, $state, $swipe, MediaService, AjaxFactory) {
    var x0 = 0;
    var x1 = 0;
    var x2 = 0;
    var c = 0;
    var move = false;
    $scope.swiping = false;

    $swipe.bind($('#swCont'), {
        start: function (evt) {
            console.log('start');
            x0 = evt.x;
            x1 = $('#swCont').width();
            x2 = $('#swCont').offset().left;
            c = x1 / 2;
            move = false;
        },
        move: function (evt) {
            console.log('move');
            move = true;
            $('#swCont').css({
                left: -(x0 - evt.x) + 'px'
            });
        },
        end: function (evt) {
            if (move) {
                console.log('end');
                $scope.path = '';
                $scope.exif = 'No exif data';
                if ($scope.direction === 'left') {
                    x0 = $('#swCont').width();
                } else {
                    x0 = -$('#swCont').width();
                }
                $('#swCont').css({
                    left: x0 + 'px',
                    opacity: 0
                });
                $('#swCont').animate({
                    left: '0px',
                    opacity: 1
                });
            }
        }
    });

    $scope.trustSrc = MediaService.trustSrc;

    $scope.getExif = function (element) {
        $scope.loaded = true;
        $scope.$apply();
        // console.log($scope.loaded); 
        EXIF.getData(element, function () {
            $scope.exif = EXIF.pretty(element);
        });
    };

    $scope.$watch(function () {
        return MediaService.file;
    }, function (newVal) {
        getFile(newVal);
    });

    var getFile = function (newValue) {
        //console.log(newValue);
        AjaxFactory.getFile(MediaService.files[newValue].fileId)
            .then(function (response) {
                //console.log(response);
                $scope.loaded = false;
                $scope.setCurrentSlideIndex(newValue);
                $scope.id = MediaService.files[newValue].fileId;
                $scope.type = response.data.type;
                $scope.title = response.data.title;
                $scope.description = response.data.description;
                $scope.path = response.data.path;
                $scope.mimeType = response.data.mimeType;
            }, function (error) {
                MediaService.handleError(error);
            });

    };


    $scope.direction = 'left';

    $scope.setCurrentSlideIndex = function (index) {
        $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
        $scope.currentIndex = index;
    };

    $scope.prevSlide = function () {
        console.log('prev');
        $scope.direction = 'left';
        $scope.currentIndex = ($scope.currentIndex < MediaService.files.length - 1) ? ++$scope.currentIndex : 0;
        getFile($scope.currentIndex);
    };

    $scope.nextSlide = function () {
        console.log('next');
        $scope.direction = 'right';
        $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : MediaService.files.length - 1;
        getFile($scope.currentIndex);
    };

    $scope.test = function () {
        if ($scope.swiping) {
            return;
        }
        $state.go('single/' + $scope.id);
    };
}