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
        var $submitBtn = $('#report__back__wrapper .button__submit');
        $featureBtn.on("click", function () {
            _this.type = "feature";
            _this.showForm();
        });
        $bugBtn.on("click", function () {
            _this.type = "bug";
            _this.showForm();
        });
        $('#report__back__wrapper #report__back__form').on("submit", function (event) {
            event.preventDefault();
            var comment = $('#report__back__wrapper .form__report__comment').val(), email = $('#report__back__wrapper .form__report__email').val(), image = $('#report__back__wrapper .form__report__image');
            var formData = new FormData($('#report__back__wrapper #report__back__form')[0]);
            $.post({
                url: "https://permortensen.com/bugs/projects/" + window["_ReportBackProjectID"] + "/reports",
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success: function () {
                    console.log("Thank you!");
                },
                error: function () {
                    console.log("Fuck you!");
                }
            });
            return false;
        });
    };
    Main.prototype.showForm = function () {
        var $form__report = $('#report__back__wrapper .form__report');
        var $title = $form__report.find(".form__report__title");
        switch (this.type) {
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
