var app = angular.module('insightApp', ['ngRoute', 'route-segment', 'view-segment', 'ngAnimate', 'angular-loading-bar', 'ngSanitize', 'dropzone', 'wu.masonry', 'ngResource', 'ui.bootstrap', 'angular-jqcloud']);
/// <reference path="../app.ts" />
var LoginController = (function () {
    function LoginController(http) {
        this.http = http;
    }
    LoginController.prototype.hej = function (u) {
        this.http.get("user").then(function (response) {
            var asdasd = response.data;
        });
    };
    return LoginController;
}());
LoginController.$inject = ["$http"];
app.controller("loginController", LoginController);
