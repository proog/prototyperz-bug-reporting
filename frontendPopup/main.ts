/// <reference path="node_modules/@types/jquery/index.d.ts"/>
'use strict';
type ReportType = "feature" | "bug";

class Main {
    type: ReportType;

    constructor() {
        jQuery(document).ready(() => {
            $.get("form.html", (data) => {
                $("body").append(data);
                this.buttonListener();
                console.log(window["_ReportBackProjectID"] as string);
            });
        });
    }

    buttonListener() {
        let $featureBtn = $('#report__back__wrapper .button__feature');
        let $bugBtn = $('#report__back__wrapper .button__bug');
        let $submitBtn = $('#report__back__wrapper .button__submit');

        $featureBtn.on("click", () => {
            this.type = "feature";
            this.showForm();
        });

        $bugBtn.on("click", () => {
            this.type = "bug";
            this.showForm();
        });

        $submitBtn.on("click", () => {
            let comment = $('#report__back__wrapper .form__report__comment').val(),
                email = $('#report__back__wrapper .form__report__email').val();
            $.post({
                url: `https://permortensen.com/bugs/projects/${window["_ReportBackProjectID"]}/reports`,
                contentType: "application/json",
                data: JSON.stringify({
                    type: this.type,
                    comment: comment,
                    email: email
                }),
                success: () => {
                    console.log("Thank you!");
                },
                error: () => {
                    console.log("Fuck you!");
                }
            });
        });
    }

    showForm() {
        let $form__report = $('#report__back__wrapper .form__report');
        let $title = $form__report.find(".form__report__title")
        switch (this.type) {
            case "feature":
                $title.text("I have a feature to report!");
                break;
            case "bug":
                $title.text("I found a bug!");
                break;
        }
        $form__report.show();
    }
}

var main:Main = new Main();
