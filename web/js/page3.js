$(document).ready(function ($) {

    var exploitInfo = {};

    $("#exp_search").on("click", function () {
        var osFilter = $("#exp_os");
        var nameFilter = $("#exp_name");
        var parameters = function () {
            var result = "-q__-x__search type:exploit";
            if (osFilter.val() !== "")  {
                result += " platform:" + osFilter.val();
            }
            if (nameFilter.val() !== "") {
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
                parameters: parameters(),
                launch_times: 1
            },
            success: function (e) {
                console.log(e);
                exploitInfo = e;
                generateTable();
            },
            error: function (e) {
                console.log(e);
            }
        });
    });

    $("#exploit_button").on("click", function () {
        var parameters = function () {
            var result = "-q__-x__"
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

    $("#text_area_button").on("click", function () {
        $("#text_area").html("");
        //...
    });

    function changeResultTextStatus(newValue, color) {
        var element = $("#resultText");
        element.html(newValue);
        element.css("color", color);
    }

    function generateTable() {

        var table = document.getElementById("table_exploit");
        table.innerHTML = "";

        //header row
        var header = table.createTHead();
        var iRow = header.insertRow(0);
        var iCell1 = iRow.insertCell(0);
        var iCell2 = iRow.insertCell(1);
        var iCell3 = iRow.insertCell(2);
        var iCell4 = iRow.insertCell(3);
        iCell1.innerHTML = "NAME".bold();
        iCell2.innerHTML = "DISCLOSURE DATE".bold();
        iCell3.innerHTML = "RANK".bold();
        iCell4.innerHTML = "DESCRIPTION".bold();
        iCell1.style.background = "#24478f";
        iCell2.style.background = "#24478f";
        iCell3.style.background = "#24478f";
        iCell4.style.background = "#24478f";
        iCell1.style.color = "#ffffff";
        iCell2.style.color = "#ffffff";
        iCell3.style.color = "#ffffff";
        iCell4.style.color = "#ffffff";

        //data rows
        for (var i=0; i<exploitInfo.exploitList.length; i++) {
            var row = table.insertRow(i+1);
            row.style.background = "#cce6ff";
            row.insertCell(0).innerHTML = exploitInfo.exploitList[i].name;
            row.insertCell(1).innerHTML = exploitInfo.exploitList[i].disclosureDate;
            row.insertCell(2).innerHTML = exploitInfo.exploitList[i].rank;
            row.insertCell(3).innerHTML = exploitInfo.exploitList[i].description;
        }
    }

});