/// <reference path="../app.ts" />

class ReportController {
    baseUrl = "https://permortensen.com/bugs";
    projectId = "58ea0efc40a27fe61a55179a";
    reports: Report[];
    project: Project;

    static $inject = ["$http", "$q"];

    constructor(private http: ng.IHttpService, private q: ng.IQService) {
        this.getProject().then(()=> {
            this.getReports();
        });
    }

    getProject() {
        return this.http.get(`${this.baseUrl}/projects/${this.projectId}`)
            .then(response => {
                this.project = response.data as Project;
            });
    }

    getReports() {
        this.http.get(`${this.baseUrl}/projects/${this.projectId}/reports`)
            .then(response => {
                this.reports = response.data as Report[];
            });
    }
}

app.controller("reportController", ReportController);
