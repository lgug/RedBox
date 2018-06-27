$(document).ready(function ($) {

    var netInfo = {};
    var portsInfo = {
        "scanningTime": 104.8,
        "hostScanList": [
            {
                "hostname": "192.168.1.1",
                "ports": [
                    {
                        "portNumber": 21,
                        "protocol": "TCP",
                        "portStatus": "OPEN",
                        "service": "ftp"
                    },
                    {
                        "portNumber": 22,
                        "protocol": "TCP",
                        "portStatus": "OPEN",
                        "service": "ssh"
                    },
                    {
                        "portNumber": 23,
                        "protocol": "TCP",
                        "portStatus": "OPEN",
                        "service": "telnet"
                    },
                    {
                        "portNumber": 80,
                        "protocol": "TCP",
                        "portStatus": "OPEN",
                        "service": "http"
                    },
                    {
                        "portNumber": 5431,
                        "protocol": "TCP",
                        "portStatus": "OPEN",
                        "service": "park-agent"
                    },
                    {
                        "portNumber": 50000,
                        "protocol": "TCP",
                        "portStatus": "OPEN",
                        "service": "ibm-db2"
                    }
                ],
                "up": true
            }
        ]
    };

    $("#net_scanning").on("click", function () {
        generateChart();
        var command = $("input[name=netscan]:checked").val();
        var parameters = function() {
            var result = "";
            switch (command) {
                case "fping":
                    result += "-g 192.168.1.0/24";
                    return result;
                case "nmap":
                    result += "-sP 192.168.1.0/24";
                    return result;
            }
        };
        $.ajax({
            url : 'http://localhost:8080/exec',
            type : 'GET',
            dataType: "json",
            data : {
                command: command,
                parameters: parameters(),
                launch_time: 1
            },
            success: function (e) {
                console.log(e);
                netInfo = e;
                generateChart();
            }
        });
    });

    $("#reset_chart").on("click", function () {
        destroyChart();
    });

    $("#portscan_button").on("click", function () {
        generatePortTable();
        var parameters = function() {
            var result = "";
            switch ($("input[name=tcp]:enabled").val()) {
                case "syn":
                    result += "-sS";
                    break;
                case "ack":
                    result += "-sA";
                    break;
                case "fin":
                    result += "-sF";
                    break;
                case "null":
                    result += "-sN";
                    break;
            }
            switch ($("input[name=timing]:enabled").val()) {
                case "paranoid":
                    result += "-T0";
                    break;
                case "sneaky":
                    result += "-T1";
                    break;
                case "polite":
                    result += "-T2";
                    break;
            }
            if ($("input[name=icmp]:enabled").val()) {
                result += "-Pn";
            }
            if ($("input[name=udp]:enabled").val()) {
                result += "-sU";
            }
            if ($("input[name=sctp]:enabled").val()) {
                result += "-sY";
            }
            if ($("input[name=ip]:enabled").val()) {
                result += "-sO";
            }
            result += $("#target").val();
            return result;
        };
        $.ajax({
            url : 'http://localhost:8080/exec',
            type : 'GET',
            dataType: "json",
            data : {
                command: "nmap",
                parameters: parameters()
            },
            success: function (e) {
                console.log(e);
                portsInfo = e;
                generatePortTable();
            }
        });
    });

    function generateChart() {
        var trace1 = {
            x: [1, 2, 3, 4],
            y: [0, 0, 0, 0],
            text: [
                'A size: 40',
                'B size: 60',
                'C size: 80',
                'D size: 100'
            ],
            mode: 'markers',
            marker: {
            color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
                size: [60, 60, 60, 60]
            }
        };

        var data = [trace1];

        var layout = {
            //title: 'Result scan for 192.168.1.0/24',
            showlegend: false,
            height: 250,
            width: 500
        };

        Plotly.newPlot('net_chart', data, layout);
    }

    function generatePortTable() {
        //delete old table, if exists
        //destroyTable();

        var table = document.getElementById("table_div");

        //header row
        var header = table.createTHead();
        var iRow = header.insertRow(0);
        var iCell1 = iRow.insertCell(0);
        var iCell2 = iRow.insertCell(1);
        var iCell3 = iRow.insertCell(2);
        var iCell4 = iRow.insertCell(3);
        var iCell5 = iRow.insertCell(4);
        iCell1.innerHTML = "HOSTNAME".bold();
        iCell2.innerHTML = "PORT".bold();
        iCell3.innerHTML = "PROTOCOL".bold();
        iCell4.innerHTML = "PORT STATUS".bold();
        iCell5.innerHTML = "SERVICE".bold();
        iCell1.style.background = "#D2D2D2";
        iCell2.style.background = "#D2D2D2";
        iCell3.style.background = "#D2D2D2";
        iCell4.style.background = "#D2D2D2";
        iCell5.style.background = "#D2D2D2";


        //data rows
        for (var i=0; i<portsInfo.hostScanList.length; i++) {
            var currentHostname = portsInfo.hostScanList[i].hostname;
            var row = table.insertRow(i+1);
            for (var j=0; j<portsInfo.hostScanList[i].ports.length; j++) {
                row.insertCell(0).innerHTML = currentHostname;
                row.insertCell(1).innerHTML = "" + portsInfo.hostScanList[i].ports[j].portNumber;
                row.insertCell(2).innerHTML = portsInfo.hostScanList[i].ports[j].protocol;
                row.insertCell(2).innerHTML = portsInfo.hostScanList[i].ports[j].portStatus;
                row.insertCell(4).innerHTML = portsInfo.hostScanList[i].ports[j].service;
            }
        }
    }

    function destroyChart() {
        //...
    }


    function generateChart2() {
        var bubbleChart = new d3.svg.BubbleChart({
            supportResponsive: true,
            //container: => use @default
            size: 600,
            //viewBoxSize: => use @default
            innerRadius: 600 / 3.5,
            //outerRadius: => use @default
            radiusMin: 50,
            //radiusMax: use @default
            //intersectDelta: use @default
            //intersectInc: use @default
            //circleColor: use @default
            data: {
                items: [
                    {text: "Java", count: "236"},
                    {text: ".Net", count: "382"},
                    {text: "Php", count: "170"},
                    {text: "Ruby", count: "123"},
                    {text: "D", count: "12"},
                    {text: "Python", count: "170"},
                    {text: "C/C++", count: "382"},
                    {text: "Pascal", count: "10"},
                    {text: "Something", count: "170"}
                ],
                eval: function (item) {return item.count;},
                classed: function (item) {return item.text.split(" ").join("");}
            },
            plugins: [
                {
                    name: "central-click",
                    options: {
                        text: "(See more detail)",
                        style: {
                            "font-size": "12px",
                            "font-style": "italic",
                            "font-family": "Source Sans Pro, sans-serif",
                            //"font-weight": "700",
                            "text-anchor": "middle",
                            "fill": "white"
                        },
                        attr: {dy: "65px"},
                        centralClick: function() {
                            alert("Here is more details!!");
                        }
                    }
                },
                {
                    name: "lines",
                    options: {
                        format: [
                            {// Line #0
                                textField: "count",
                                classed: {count: true},
                                style: {
                                    "font-size": "28px",
                                    "font-family": "Source Sans Pro, sans-serif",
                                    "text-anchor": "middle",
                                    fill: "white"
                                },
                                attr: {
                                    dy: "0px",
                                    x: function (d) {return d.cx;},
                                    y: function (d) {return d.cy;}
                                }
                            },
                            {// Line #1
                                textField: "text",
                                classed: {text: true},
                                style: {
                                    "font-size": "14px",
                                    "font-family": "Source Sans Pro, sans-serif",
                                    "text-anchor": "middle",
                                    fill: "white"
                                },
                                attr: {
                                    dy: "20px",
                                    x: function (d) {return d.cx;},
                                    y: function (d) {return d.cy;}
                                }
                            }
                        ],
                        centralFormat: [
                            {// Line #0
                                style: {"font-size": "50px"},
                                attr: {}
                            },
                            {// Line #1
                                style: {"font-size": "30px"},
                                attr: {dy: "40px"}
                            }
                        ]
                    }
                }]
        });
    }
});