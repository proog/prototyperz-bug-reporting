/// <reference path="../app.ts" />

app.controller('mainController', function( $scope, $http, $location, $routeSegment, Page ) {
    $scope.Page = Page;
    $scope.$routeSegment = $routeSegment;
});