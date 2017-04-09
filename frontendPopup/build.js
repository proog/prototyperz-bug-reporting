/// <reference path="node_modules/@types/jquery/index.d.ts"/>
'use strict';
var Main = (function () {
    function Main() {
        var _this = this;
        jQuery(document).ready(function () {
            $.get("form.html", function (data) {
                $("body").append(data);
                _this.buttonListener();
                console.log(window["_ReportBackProjectID"]);
            });
        });
    }
    Main.prototype.buttonListener = function () {
        var _this = this;
        var $featureBtn = $('#report__back__wrapper .button__feature');
        var $bugBtn = $('#report__back__wrapper .button__bug');
        $featureBtn.on("click", function () {
            _this.showForm("feature");
        });
        $bugBtn.on("click", function () {
            _this.showForm("bug");
        });
    };
    Main.prototype.showForm = function (type) {
        var $form__report = $('#report__back__wrapper .form__report');
        var $title = $form__report.find(".form__report__title");
        switch (type) {
            case "feature":
                $title.text("I have a feature to report!");
                break;
            case "bug":
                $title.text("I found a bug!");
                break;
        }
        $form__report.show();
    };
    return Main;
}());
var main = new Main();
