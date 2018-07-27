$(document).ready(function ($) {

    $("#IF_link").on("click", function () {
        $("#page").attr("src", "../html/page1.html");
        $("#IF_link").addClass("active")
    });

    $("#VA_link").on("click", function () {
        $("#page").attr("src", "../html/page2.html");
        $("#VA_link").addClass("active")
    });

    $("#EX_link").on("click", function () {
        $("#page").attr("src", "../html/page3.html");
        $("#EX_link").addClass("active")
    });

    $("#PC_link").on("click", function () {
        $("#page").attr("src", "../html/page4.html");
        $("#PC_link").addClass("active")
    });

    $("#PR_link").on("click", function () {
        $("#page").attr("src", "../html/page5.html");
        $("#PR_link").addClass("active")
    });

});