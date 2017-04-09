var app = angular.module('ReportBackApp', ['ngRoute', 'route-segment', 'view-segment', 'ngAnimate', 'ngSanitize', 'ngResource', 'ui.bootstrap']);

var resolve = {
    delay: function ($q, $timeout) {
        var delay = $q.defer();
        $timeout(delay.resolve, 0, false);
        return delay.promise;
    }
};

app.factory('Page', function () {
    var title = 'Report Back App';
    return {
        title: function () {
            return title;
        },
        setTitle: function (newTitle) {
            title = newTitle + " | Report Back App";
        }
    };
});

// configure our routes
app.config(function ($routeSegmentProvider, $locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    $routeSegmentProvider.options.autoLoadTemplates = true;

    $routeSegmentProvider.otherwise = function (route) {
        $routeProvider.otherwise({redirectTo: route});
        return this;
    };


    $routeSegmentProvider

        .when('/', 'report')
        .otherwise('/')

        .segment('report', {
            default: true,
            templateUrl: 'app/views/reports.html',
            controller: 'reportController'
        });
});

app.run(function ($rootScope, $window) {
    // publish current transition direction on rootScope
    $rootScope.direction = 'left';
    // listen change start events
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        $rootScope.direction = 'right';
        // console.log(arguments);
        if (current && next && (current.depth > next.depth)) {
            $rootScope.direction = 'left';
        }
        // back
        $rootScope.back = function () {
            $window.history.back();
        };
    });
});