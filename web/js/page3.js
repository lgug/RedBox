$(document).ready(function ($) {

    var exploitInfo = {};

    $("#exp_search").on("click", function () {
        var osFilter = $("#exp_os");
        var nameFilter = $("#exp_name");
        var parameters = function () {
            var result = "-q__-x__search type:exploit";
            if (osFilter.val() !== null)  {
                result += " platform:" + osFilter.val();
            }
            if (nameFilter.val() !== null) {
                result += " name:" + nameFilter.val();
            }
            result += ";exit";
            return result;
        };
        $.ajax({
            url : 'http://localhost:8080/exec',
            type : 'GET',
            dataType: "json",
            data : {
                command: "msfconsole",
                parameters: parameters()
            },
            beforeSend: function() {
                changeResultTextStatus("trying to access...", "#0066ff");
            },
            success: function (e) {
                console.log(e);
                exploitInfo = e;
                generateTable();
                changeResultTextStatus("success: access granted", "#009900");
            },
            error: function (e) {
                console.log(e);
                changeResultTextStatus("error: access not granted", "#ff0000")
            }
        });
    });

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