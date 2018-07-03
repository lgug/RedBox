$(document).ready(function ($) {

    var netInfo = {};
    var portsInfo = {};

    $("#net_scanning").on("click", function () {
        var command = $("input[name=netscan]:checked").val();
        var parameters = function() {
            var result = "";
            switch (command) {
                case "fping":
                    result += "-g__192.168.1.0/24";
                    return result;
                case "nmap":
                    result += "-sP__192.168.1.0/24";
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
                $("#net_chart_button").html(netInfo.hostScanList.length + "<br>hosts");
                generateHostsTable();
            }
        });

    });

    $("#portscan_button").on("click", function () {
        var parameters = function() {
            var result = "";
            var tcp = $("#tcp").val();
            var icmp = $("#icmp").val();
            if (tcp !== "no") {
                result += tcp + "__";
            }
            result += icmp + "__";
            if ($("input[name='other1']").is(":checked")) {
                result += $("input[name='other1']").val() + "__";
            }
            if ($("input[name='other2']").is(":checked")) {
                result += $("input[name='other2']").val() + "__";
            }
            if ($("input[name='other3']").is(":checked")) {
                result += $("input[name='other3']").val() + "__";
            }
            return result + $("#target_text").val();

        };
        $.ajax({
            url : 'http://localhost:8080/exec',
            type : 'GET',
            dataType: "json",
            data : {
                command: "nmap",
                parameters: parameters(),
                launch_times: 1
            },
            success: function (e) {
                console.log(e);
                portsInfo = e;
                generatePortTable();
            }
        });
    });

    function generateHostsTable() {
        var table = document.getElementById("net_table");
        table.innerHTML = "";

        //header row
        var header = table.createTHead();
        var iRow = header.insertRow(0);
        var iCell1 = iRow.insertCell(0);
        iCell1.innerHTML = "HOSTS".bold();
        iCell1.style.background = "#000000";
        iCell1.style.color = "#ffffff";

        //data rows
        for (var i=0; i<netInfo.hostScanList.length; i++) {
            var currentHostname = netInfo.hostScanList[i].hostname;
            var row = table.insertRow(i+1);
            row.insertCell(0).innerHTML = currentHostname;
            row.style.background = "#cccccc";
        }
    }

    function generatePortTable() {

        var table = document.getElementById("table_div");
        table.innerHTML = "";

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
        iCell1.style.background = "#b30000";
        iCell2.style.background = "#b30000";
        iCell3.style.background = "#b30000";
        iCell4.style.background = "#b30000";
        iCell5.style.background = "#b30000";
        iCell1.style.color = "#ffffff";
        iCell2.style.color = "#ffffff";
        iCell3.style.color = "#ffffff";
        iCell4.style.color = "#ffffff";
        iCell5.style.color = "#ffffff";

        //data rows
        for (var i=0; i<portsInfo.hostScanList.length; i++) {
            var currentHostname = portsInfo.hostScanList[i].hostname;
            for (var j=0; j<portsInfo.hostScanList[i].ports.length; j++) {
                var row = table.insertRow(i+1);
                row.insertCell(0).innerHTML = currentHostname;
                row.insertCell(1).innerHTML = "" + portsInfo.hostScanList[i].ports[j].portNumber;
                row.insertCell(2).innerHTML = portsInfo.hostScanList[i].ports[j].protocol;
                row.insertCell(3).innerHTML = portsInfo.hostScanList[i].ports[j].portStatus;
                row.insertCell(4).innerHTML = portsInfo.hostScanList[i].ports[j].service;
                if (portsInfo.hostScanList[i].ports[j].portStatus === "OPEN") {
                    row.style.background = "#ff704d"
                } else {
                    row.style.background = "#ffb84d";
                }
            }
        }
    }

});