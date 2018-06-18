$(document).ready(function ($) {

    $("#IF_link").on("click", function () {
        $("#page").attr("data", "../html/page1.html");
        $("IF_link").addClass("active")
    });

    $("#VA_link").on("click", function () {
        $("#page").attr("data", "../html/page2.html");
        $("VA_link").addClass("active")
    });

    $("#EX_link").on("click", function () {
        $("#page").attr("data", "../html/page2.html");
        $("EX_link").addClass("active")
    });
});