$(document).ready(function ($) {

    var exploitInfo = {};

    $("#exploit_button").on("click", function () {
        var parameters = function () {
            var result = "-q -x"
        };
        $.ajax({
            url : 'http://localhost:8080/exec',
            type : 'GET',
            dataType: "json",
            data : {
                command: "msfconsole",
                parameters: "",
                launch_time: ""
            },
            beforeSend: function() {
                changeResultTextStatus("trying to access...", "#0066ff");
            },
            success: function (e) {
                console.log(e);
                exploitInfo = e;
                changeResultTextStatus("success: access granted", "#009900");
            },
            error: function (e) {
                console.log(e);
                changeResultTextStatus("error: access not granted", "#ff0000")
            }
        });
    });


    function changeResultTextStatus(newValue, color) {
        var element = $("#resultText");
        element.html(newValue);
        element.css("color", color);
    }

    function generateTable() {

    }

});