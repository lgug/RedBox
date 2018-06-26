$(document).ready(function ($) {

    var vulnInfo = {};

    function generatePieChart() {

    }

    function generateVulnTable() {
        //delete old table, if exists
        //destroyTable();

        table = document.getElementById("table_div");

        //header row
        var header = table.createTHead();
        var iRow = header.insertRow(0);
        var iCell1 = iRow.insertCell(0);
        var iCell2 = iRow.insertCell(1);
        var iCell3 = iRow.insertCell(2);
        var iCell4 = iRow.insertCell(3);
        iCell1.innerHTML = "Status".bold();
        iCell2.innerHTML = "Date".bold();
        iCell3.innerHTML = "Value in open".bold();
        iCell4.innerHTML = "Value in close".bold();
        iCell1.style.background = "#D2D2D2";
        iCell2.style.background = "#D2D2D2";
        iCell3.style.background = "#D2D2D2";
        iCell4.style.background = "#D2D2D2";


        //data rows
        for (var i=0; i<listDate.length; i++) {
            date = listDate[i];
            var row = table.insertRow(i+1);
            if (dataOutput['Time Series (Daily)'][date]['1. open'] < dataOutput['Time Series (Daily)'][date]['4. close']) {
                row.insertCell(0).innerHTML = "<img src=img/Increase.svg width=15 height=15>";
            } else if (dataOutput['Time Series (Daily)'][date]['1. open'] > dataOutput['Time Series (Daily)'][date]['4. close']){
                row.insertCell(0).innerHTML = "<img src=img/Decrease.png width=15 height=15>";
            } else {
                row.insertCell(0).innerHTML = "<img src=img/Steady.png width=15 height=15>";
            }
            row.insertCell(1).innerHTML = date;
            row.insertCell(2).innerHTML = dataOutput['Time Series (Daily)'][date]['1. open'];
            row.insertCell(3).innerHTML = dataOutput['Time Series (Daily)'][date]['4. close'];
        }
    }

    function destroyPieChart() {

    }

    function destroyTable() {

    }

});