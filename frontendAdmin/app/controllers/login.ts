/// <reference path="../app.ts" />

class LoginController {
    static $inject = ["$http"];

    constructor(private http: ng.IHttpService) {

    }
}

app.controller("loginController", LoginController);
