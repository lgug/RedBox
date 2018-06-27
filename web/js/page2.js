$(document).ready(function ($) {

    var vulnInfo = {};

    $("#vulnscan_button").on("click", function () {
        generatePieChart();
        // $.ajax({
        //     url : 'http://localhost:8080/exec',
        //     type : 'GET',
        //     dataType: "json",
        //     data : {
        //         command: "",
        //         parameters: "",
        //         launch_time: ""
        //     },
        //     success: function (e) {
        //         console.log(e);
        //         vulnInfo = e;
        //         generatePieChart();
        //     }
        // });
    });

    function generatePieChart() {
        var canvas = $("#vuln_chart");

        var options = {
            title: {
                display: true,
                text: "Vulnerabilities risk levels"
            },
            legend: {
                display: false,
                position: 'bottom'
            },
            animation: {
                duration: 2000
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            }
        };

        var data = {
            datasets: [{
                data: [10, 20, 30, 70],
                backgroundColor: ['red', 'orange', 'yellow', 'blue']
            }],

            labels: [
                'High',
                'Medium',
                'Low',
                'Log'
            ]
        };

        var chart = new Chart(canvas, {
            type: 'pie',
            data: data,
            options: options
        });
    }

    function generateVulnTable() {

    }

    function destroyPieChart() {

    }

    function destroyTable() {

    }

});