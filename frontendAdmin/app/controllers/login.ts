/// <reference path="../app.ts" />


class LoginController {
    static $inject = ["$http"];

    constructor(private http: ng.IHttpService) {

    }

    hej(u: any)    {
        this.http.get("user").then((response) => {
            let asdasd = response.data;
        })
    }
}

app.controller("loginController", LoginController);