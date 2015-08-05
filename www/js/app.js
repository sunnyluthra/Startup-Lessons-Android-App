// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova']).run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
}).config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('lessons', {
        url: '/lessons',
        templateUrl: 'templates/lessons.html',
        controller: 'LessonsController'
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/lessons');
}).controller('LessonsController', function($scope, $http, $ionicSlideBoxDelegate) {
    var url = 'https://spreadsheets.google.com/feeds/list/1oiR4BmGEqQugWFL__blQI_GEBoW4EbZwSOXdPYRrU14/od6/public/values?alt=json';

    var parse = function(entry) {
        return {
            title: entry.title.$t
        };
    };

    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    function setShareTitle($title) {
       $scope.shareTitle = $title;
    }

    $http.get(url).success(function(response) {
        var entries = response.feed.entry;
        var parsedEntries = [];
        for (var key in entries) {
            parsedEntries.push(parse(entries[key]));
        }
        shuffle(parsedEntries);
        $scope.lessons = parsedEntries;
        $ionicSlideBoxDelegate.update();
        setShareTitle($scope.lessons[0].title);
    });

    $scope.slideHasChanged = function($index) {
        setShareTitle($scope.lessons[$index].title);
    };

    $scope.next = function() {
        $ionicSlideBoxDelegate.next();
    };


}).directive('shareIt', ['$cordovaSocialSharing', function($cordovaSocialSharing) {
    return {
        restrict: 'C',
        replace: false,
        scope: {
            title: "@"
        },
        link: function(scope, elem, attrs) {
            elem.bind('click', function() {
                var message = scope.title,
                    subject = 'Startup Lessons',
                    file = null,
                    link = 'https://play.google.com/store/apps/details?id=com.mrova.startuplessonsbyharsha';
                $cordovaSocialSharing
                    .share(message, subject, file, link) // Share via native share sheet
                    .then(function(result) {
                        // Success!
                    }, function(err) {
                        // An error occured. Show a message to the user
                    });

            });
        }
    };
}]);;
