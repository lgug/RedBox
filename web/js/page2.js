$(document).ready(function ($) {

    var vulnInfo = {};
    var configId = "daba56c8-73ec-11df-a475-002264764cea";
    var txtId = "a3810a62-1f62-11e1-9219-406186ea4fc5";
    var taskId;
    var reportId;
    var targetId;

    var defaultParams = "-u__admin__-w__admin__-h__0.0.0.0__-p__9390__";

    //operations on page loading
    generatePieChartWIthNullValue();

    $("#vulnscan_button").on("click", function () {
        var host = $("#target").val();
        var targetCreationParameters = function () {
            return defaultParams + "-X__" +
                "<create_target>" +
                "<name>redboxtask</name>" +
                "<hosts>" + host + "</hosts>" +
                "</create_target>";
        };
        var taskCreationParameters = function() {
            return defaultParams + "-X__" +
                "<create_task>" +
                "<name>taskdiprova</name>" +
                "<config id=\"" + configId + "\"/>" +
                "<target id=\"" + targetId + "\"/>" +
                "</create_task>";
        };
        $.ajax({
            url : 'http://localhost:8080/exec',
            type : 'GET',
            dataType: "json",
            data : {
                command: "omp",
                parameters: targetCreationParameters(),
                launch_time: 1
            },
            success: function (e) {
                console.log(e);
                targetId = e.targetId;
                $.ajax({
                    url : 'http://localhost:8080/exec',
                    type : 'GET',
                    dataType: "json",
                    data : {
                        command: "omp",
                        parameters: taskCreationParameters(),
                        launch_time: 1
                    },
                    success: function (e) {
                        console.log(e);
                        taskId = e.taskId;
                        $.ajax({
                            url : 'http://localhost:8080/exec',
                            type : 'GET',
                            dataType: "json",
                            data : {
                                command: "omp",
                                parameters: defaultParams + "--start-task__" + taskId,
                                launch_time: 1
                            },
                            success: function (e) {
                                console.log(e);
                                reportId = e.reportId;
                            }
                        });
                    }
                });
            }
        });
    });

    $("#result_button").on("click", function () {
        $.ajax({
            url : 'http://localhost:8080/exec',
            type : 'GET',
            dataType: "json",
            data : {
                command: "omp",
                parameters: defaultParams + "-R__" + reportId + "__-f__" + txtId,
                launch_time: 1
            },
            success: function (e) {
                console.log(e);
                vulnInfo = e.taskResult;
                generatePieChart();
                generateVulnTable();
            }
        });
    });

    function generatePieChartWIthNullValue() {
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
                data: [
                    100
                ],
                backgroundColor: ['gray']
            }],

            labels: [
                'Nothing'
                ]
        };

        var chart = new Chart(canvas, {
            type: 'pie',
            data: data,
            options: options
        });
    }

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
                data: [
                    vulnInfo.logNumber,
                    vulnInfo.lowNumber,
                    vulnInfo.mediumNumber,
                    vulnInfo.highNumber
                ],
                backgroundColor: ['#3399ff', 'yellow', 'orange', 'red']
            }],

            labels: [
                'Log',
                'Low',
                'Medium',
                'High'
            ]
        };

        var chart = new Chart(canvas, {
            type: 'pie',
            data: data,
            options: options
        });
    }

    function generateVulnTable() {

        var table = document.getElementById("vulnTable");
        table.innerHTML = "";

        //header row
        var header = table.createTHead();
        var iRow = header.insertRow(0);
        var iCell1 = iRow.insertCell(0);
        var iCell2 = iRow.insertCell(1);
        var iCell3 = iRow.insertCell(2);
        var iCell4 = iRow.insertCell(3);
        iCell1.innerHTML = "NAME".bold();
        iCell2.innerHTML = "PORT".bold();
        iCell3.innerHTML = "THREAT LEVEL".bold();
        iCell4.innerHTML = "DESCRIPTION".bold();
        iCell1.style.background = "#000000";
        iCell2.style.background = "#000000";
        iCell3.style.background = "#000000";
        iCell4.style.background = "#000000";
        iCell1.style.color = "#ffffff";
        iCell2.style.color = "#ffffff";
        iCell3.style.color = "#ffffff";
        iCell4.style.color = "#ffffff";

        //data rows
        for (var i=0; i<vulnInfo.vulnerabilityList.length; i++) {
            var row = table.insertRow(i+1);
            if (vulnInfo.vulnerabilityList[i].threatLevel.search("Log") > -1) row.style.background = "#cce6ff";
            else if (vulnInfo.vulnerabilityList[i].threatLevel.search("Low") > -1) row.style.background = "#ffff66";
            else if (vulnInfo.vulnerabilityList[i].threatLevel.search("Medium") > -1) row.style.background = "#ff8533";
            else if (vulnInfo.vulnerabilityList[i].threatLevel.search("High") > -1) row.style.background = "#ff3333";
            row.insertCell(0).innerHTML = vulnInfo.vulnerabilityList[i].name;
            row.insertCell(1).innerHTML = vulnInfo.vulnerabilityList[i].port;
            row.insertCell(2).innerHTML = vulnInfo.vulnerabilityList[i].threatLevel;
            row.insertCell(3).innerHTML = vulnInfo.vulnerabilityList[i].description;
        }
    }

});