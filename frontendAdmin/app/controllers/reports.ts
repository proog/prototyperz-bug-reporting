/// <reference path="../app.ts" />

class ReportController {
    baseUrl = "https://permortensen.com/bugs";
    projectId = "58ea0efc40a27fe61a55179a";
    reports: any[];

    static $inject = ["$http", "$q"];

    constructor(private http: ng.IHttpService, private q: ng.IQService) {

    }

    getReports() {
        this.http.get(`${this.baseUrl}/projects/${this.projectId}/reports`)
            .then(response => {
                this.reports = response.data as any[];
            });
    }
}

app.controller("reportController", ReportController);
