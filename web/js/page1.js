$(document).ready(function ($) {

    var netInfo = {};

    $("#net_scanning").on("click", function () {
        $.ajax({
            url : 'http://localhost:8080/exec',
            type : 'GET',
            dataType: "json",
            data : {
                command: "nmap",
                parameters: "-sP 192.168.1.0/24"
            },
            success: function (e) {
                netInfo = e;
                generateChart();
            }
        });
    });

    $("#reset_chart").on("click", function () {

    });

    $("#portscan_button").on("click", function () {
        $.ajax({
            url : 'http://localhost:8080/exec',
            type : 'GET',
            dataType: "json",
            data : {
                command: "nmap",
                parameters: ""
            },
            success: function (e) {
                //...
            }
        });
    });

    function generateChart() {

    }

    function generatePortTable() {

    }

});