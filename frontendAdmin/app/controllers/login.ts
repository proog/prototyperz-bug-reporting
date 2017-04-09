/// <reference path="../app.ts" />

class LoginController {
    static $inject = ["$http", "Page"];

    constructor(private http: ng.IHttpService, public Page) {

    }
}

app.controller("loginController", LoginController);
