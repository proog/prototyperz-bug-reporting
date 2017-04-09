/// <reference path="node_modules/@types/jquery/index.d.ts"/>
'use strict';
type ReportType = "feature" | "bug";

class Main {

    constructor() {
        jQuery(document).ready(() => {
            $.get("form.html", (data) => {
                $("body").append(data);
                this.buttonListener();
            });
        });
    }

    buttonListener() {
        let $featureBtn = $('#report__back__wrapper .button__feature');
        let $bugBtn = $('#report__back__wrapper .button__bug');

        $featureBtn.on("click", () => {
           this.showForm("feature");
        });

        $bugBtn.on("click", () => {
            this.showForm("bug");
        });
    }

    showForm(type : ReportType) {
        let $form__report = $('#report__back__wrapper .form__report');
        let $title = $form__report.find(".form__report__title")
        switch (type) {
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
