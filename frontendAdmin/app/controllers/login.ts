/// <reference path="../app.ts" />


class LoginController {
    static $inject = ["$http", "Page"];

    constructor(private http: ng.IHttpService, public Page) {

    }

    hej(u: any)    {
        this.http.get("user").then((response) => {
            let asdasd = response.data;
        })
    }
}

app.controller("loginController", LoginController);