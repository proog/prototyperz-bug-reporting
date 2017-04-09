var app = angular.module('ReportBackApp', ['ngRoute', 'route-segment', 'view-segment', 'ngAnimate', 'ngSanitize', 'ngResource', 'ui.bootstrap']);
/// <reference path="../app.ts" />
var LoginController = (function () {
    function LoginController(http) {
        this.http = http;
    }
    return LoginController;
}());
LoginController.$inject = ["$http"];
app.controller("loginController", LoginController);
/// <reference path="../app.ts" />
var ReportController = (function () {
    function ReportController(http, q) {
        this.http = http;
        this.q = q;
        this.baseUrl = "https://permortensen.com/bugs";
        this.projectId = "58ea0efc40a27fe61a55179a";
    }
    ReportController.prototype.getReports = function () {
        var _this = this;
        this.http.get(this.baseUrl + "/projects/" + this.projectId + "/reports")
            .then(function (response) {
            _this.reports = response.data;
        });
    };
    return ReportController;
}());
ReportController.$inject = ["$http", "$q"];
app.controller("reportController", ReportController);
