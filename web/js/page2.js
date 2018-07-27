$(document).ready(function ($) {

    var vulnInfo = {};
    var configId = {
        "Discovery": "8715c877-47a0-438d-98a3-27c7a6ab2196",
        "Full and fast": "daba56c8-73ec-11df-a475-002264764cea",
        "Full and fast ultimate": "698f691e-7489-11df-9d8c-002264764cea",
        "Full and very deep": "708f25c4-7489-11df-8094-002264764cea",
        "Full and very deep ultimate": "74db13d6-7489-11df-91b9-002264764cea",
        "Host discovery": "2d3f051c-55ba-11e3-bf43-406186ea4fc5",
        "System discovery": "bbca7412-a950-11e3-9109-406186ea4fc5"
    };
    var reportFormatId = {
        "TXT": "a3810a62-1f62-11e1-9219-406186ea4fc5",
        "ANONYMOUS XML": "5057e5cc-b825-11e4-9d0e-28d24461215b"
    };
    var taskId = "36c17745-ff0b-4114-92bd-795441467de7";
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
                "<name>redboxtarget</name>" +
                "<hosts>" + host + "</hosts>" +
                "</create_target>";
        };
        var taskCreationParameters = function() {
            return defaultParams + "-X__" +
                "<create_task>" +
                "<name>redboxtask</name>" +
                "<config id=\"" + configId["Full and fast"] + "\"/>" +
                "<target id=\"" + targetId + "\"/>" +
                "</create_task>";
        };
        var startingTaskCreationParameters = function() {
            return defaultParams + "-X__" +
                "<start_task task_id=\"" + taskId + "\"/>"
        };
        /*$.ajax({
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
                                parameters: startingTaskCreationParameters(),
                                launch_time: 1
                            },
                            success: function (e) {
                                console.log(e);
                                reportId = e.reportId;
                                showRunningSymbol();
                            }
                        });
                    }
                });
            }
        });*/
        showRunningSymbol();
    });

    function showRunningSymbol() {
        var getTaskStatusCreationParameters = function () {
            return defaultParams + "-X__" +
                "<get_tasks task_id=\"" + taskId + "\" detail=\"1\"/>";
        };
        var reportStatus = "NEW";
        var runningStatus = 0;
        while (reportStatus !== "DONE"){
            setTimeout(function(){
                $.ajax({
                    url: 'http://localhost:8080/exec',
                    type: 'GET',
                    async: "false",
                    dataType: "json",
                    data: {
                        command: "omp",
                        parameters: getTaskStatusCreationParameters(),
                        launch_time: 1
                    },
                    success: function (e) {
                        console.log(e);
                        reportStatus = e.reportStatus;
                        runningStatus = e.runningStatus;
                        console.log(runningStatus);
                    },
                    error: function (e) {
                        //...
                    }
                });
                $("#tableDiv").html("<img id='loading' src='../resources/spinner.gif'>");
            }, 5000);
        }
        getReport();
    }

    function getReport() {
        var getReportCreationParameters = function () {
            return defaultParams + "-X__" +
                "<get_reports report_id=\"" + reportId + "\" " +
                "format_id=\"" + reportFormatId["ANONYMOUS XML"] + "\"/>";
        };
        $.ajax({
            url: 'http://localhost:8080/exec',
            type: 'GET',
            dataType: "json",
            data: {
                command: "omp",
                parameters: getReportCreationParameters(),
                launch_time: 1
            },
            success: function (e) {
                console.log(e);
                vulnInfo = e;
                generatePieChart();
                generateVulnTable();
            },
            error: function (e) {
                //...
            }
        });
    }

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

        var table = document.getElementById("tableDiv").createElement("table");

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