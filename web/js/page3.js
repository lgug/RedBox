$(document).ready(function ($) {

    var exploitInfo = {
        "exploitList": [
            {
                "name": "exploit/aix/local/ibstat_path",
                "disclosureDate": "2013-09-24",
                "rank": "EXCELLENT",
                "description": "ibstat $PATH Privilege Escalation"
            },
            {
                "name": "exploit/aix/rpc_cmsd_opcode21",
                "disclosureDate": "2009-10-07",
                "rank": "GREAT",
                "description": "AIX Calendar Manager Service Daemon (rpc.cmsd) Opcode 21 Buffer Overflow"
            },
            {
                "name": "exploit/aix/rpc_ttdbserverd_realpath",
                "disclosureDate": "2009-06-17",
                "rank": "GREAT",
                "description": "ToolTalk rpc.ttdbserverd _tt_internal_realpath Buffer Overflow (AIX)"
            },
            {
                "name": "exploit/android/adb/adb_server_exec",
                "disclosureDate": "2016-01-01",
                "rank": "EXCELLENT",
                "description": "Android ADB Debug Server Remote Payload Execution"
            },
            {
                "name": "exploit/android/browser/samsung_knox_smdm_url",
                "disclosureDate": "2014-11-12",
                "rank": "EXCELLENT",
                "description": "Samsung Galaxy KNOX Android Browser RCE"
            },
            {
                "name": "exploit/android/browser/stagefright_mp4_tx3g_64bit",
                "disclosureDate": "2015-08-13",
                "rank": "NORMAL",
                "description": "Android Stagefright MP4 tx3g Integer Overflow"
            },
            {
                "name": "exploit/android/browser/webview_addjavascriptinterface",
                "disclosureDate": "2012-12-21",
                "rank": "EXCELLENT",
                "description": "Android Browser and WebView addJavascriptInterface Code Execution"
            },
            {
                "name": "exploit/android/fileformat/adobe_reader_pdf_js_interface",
                "disclosureDate": "2014-04-13",
                "rank": "GOOD",
                "description": "Adobe Reader for Android addJavascriptInterface Exploit"
            },
            {
                "name": "exploit/android/local/futex_requeue",
                "disclosureDate": "2014-05-03",
                "rank": "EXCELLENT",
                "description": "Android 'Towelroot' Futex Requeue Kernel Exploit"
            },
            {
                "name": "exploit/android/local/put_user_vroot",
                "disclosureDate": "2013-09-06",
                "rank": "EXCELLENT",
                "description": "Android get_user/put_user Exploit"
            },
            {
                "name": "exploit/apple_ios/browser/safari_libtiff",
                "disclosureDate": "2006-08-01",
                "rank": "GOOD",
                "description": "Apple iOS MobileSafari LibTIFF Buffer Overflow"
            },
            {
                "name": "exploit/apple_ios/browser/webkit_trident",
                "disclosureDate": "2016-08-25",
                "rank": "MANUAL",
                "description": "WebKit not_number defineProperties UAF"
            },
            {
                "name": "exploit/apple_ios/email/mobilemail_libtiff",
                "disclosureDate": "2006-08-01",
                "rank": "GOOD",
                "description": "Apple iOS MobileMail LibTIFF Buffer Overflow"
            },
            {
                "name": "exploit/apple_ios/ssh/cydia_default_ssh",
                "disclosureDate": "2007-07-02",
                "rank": "EXCELLENT",
                "description": "Apple iOS Default SSH Password Vulnerability"
            },
            {
                "name": "exploit/bsdi/softcart/mercantec_softcart",
                "disclosureDate": "2004-08-19",
                "rank": "GREAT",
                "description": "Mercantec SoftCart CGI Overflow"
            },
            {
                "name": "exploit/dialup/multi/login/manyargs",
                "disclosureDate": "2001-12-12",
                "rank": "GOOD",
                "description": "System V Derived /bin/login Extraneous Arguments Buffer Overflow"
            },
            {
                "name": "exploit/firefox/local/exec_shellcode",
                "disclosureDate": "2014-03-10",
                "rank": "EXCELLENT",
                "description": "Firefox Exec Shellcode from Privileged Javascript Shell"
            },
            {
                "name": "exploit/freebsd/ftp/proftp_telnet_iac",
                "disclosureDate": "2010-11-01",
                "rank": "GREAT",
                "description": "ProFTPD 1.3.2rc3 - 1.3.3b Telnet IAC Buffer Overflow (FreeBSD)"
            },
            {
                "name": "exploit/freebsd/http/watchguard_cmd_exec",
                "disclosureDate": "2015-06-29",
                "rank": "EXCELLENT",
                "description": "Watchguard XCS Remote Command Execution"
            },
            {
                "name": "exploit/freebsd/local/mmap",
                "disclosureDate": "2013-06-18",
                "rank": "GREAT",
                "description": "FreeBSD 9 Address Space Manipulation Privilege Escalation"
            },
            {
                "name": "exploit/freebsd/local/watchguard_fix_corrupt_mail",
                "disclosureDate": "2015-06-29",
                "rank": "MANUAL",
                "description": "Watchguard XCS FixCorruptMail Local Privilege Escalation"
            },
            {
                "name": "exploit/freebsd/misc/citrix_netscaler_soap_bof",
                "disclosureDate": "2014-09-22",
                "rank": "NORMAL",
                "description": "Citrix NetScaler SOAP Handler Remote Code Execution"
            },
            {
                "name": "exploit/freebsd/samba/trans2open",
                "disclosureDate": "2003-04-07",
                "rank": "GREAT",
                "description": "Samba trans2open Overflow (*BSD x86)"
            },
            {
                "name": "exploit/freebsd/tacacs/xtacacsd_report",
                "disclosureDate": "2008-01-08",
                "rank": "AVERAGE",
                "description": "XTACACSD report() Buffer Overflow"
            },
            {
                "name": "exploit/freebsd/telnet/telnet_encrypt_keyid",
                "disclosureDate": "2011-12-23",
                "rank": "GREAT",
                "description": "FreeBSD Telnet Service Encryption Key ID Buffer Overflow"
            },
            {
                "name": "exploit/hpux/lpd/cleanup_exec",
                "disclosureDate": "2002-08-28",
                "rank": "EXCELLENT",
                "description": "HP-UX LPD Command Execution"
            },
            {
                "name": "exploit/irix/lpd/tagprinter_exec",
                "disclosureDate": "2001-09-01",
                "rank": "EXCELLENT",
                "description": "Irix LPD tagprinter Command Execution"
            },
            {
                "name": "exploit/linux/antivirus/escan_password_exec",
                "disclosureDate": "2014-04-04",
                "rank": "EXCELLENT",
                "description": "eScan Web Management Console Command Injection"
            },
            {
                "name": "exploit/linux/browser/adobe_flashplayer_aslaunch",
                "disclosureDate": "2008-12-17",
                "rank": "GOOD",
                "description": "Adobe Flash Player ActionScript Launch Command Execution Vulnerability"
            },
            {
                "name": "exploit/linux/ftp/proftp_sreplace",
                "disclosureDate": "2006-11-26",
                "rank": "GREAT",
                "description": "ProFTPD 1.2 - 1.3.0 sreplace Buffer Overflow (Linux)"
            },
            {
                "name": "exploit/linux/ftp/proftp_telnet_iac",
                "disclosureDate": "2010-11-01",
                "rank": "GREAT",
                "description": "ProFTPD 1.3.2rc3 - 1.3.3b Telnet IAC Buffer Overflow (Linux)"
            },
            {
                "name": "exploit/linux/games/ut2004_secure",
                "disclosureDate": "2004-06-18",
                "rank": "GOOD",
                "description": "Unreal Tournament 2004 \"secure\" Overflow (Linux)"
            },
            {
                "name": "exploit/linux/http/accellion_fta_getstatus_oauth",
                "disclosureDate": "2015-07-10",
                "rank": "EXCELLENT",
                "description": "Accellion FTA getStatus verify_oauth_token Command Execution"
            }
        ],
        "accessGranted": false
    };

    $("#exp_search").on("click", function () {
        generateTable();
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