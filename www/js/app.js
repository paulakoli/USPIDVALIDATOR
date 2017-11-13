/*
 * Please see the included README.md file for license terms and conditions.
 */


// This file is a suggested starting place for your code.
// It is completely optional and not required.
// Note the reference that includes it in the index.html file.


/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false app:false, dev:false, cordova:false */



// This file contains your event handlers, the center of your application.
// NOTE: see app.initEvents() in init-app.js for event handler initialization code.



function myEventHandler() {
    "use strict";
    
    

    var ua = navigator.userAgent;
    var str;

    if (window.Cordova && dev.isDeviceReady.c_cordova_ready__) {
        str = "It worked! Cordova device ready detected at " + dev.isDeviceReady.c_cordova_ready__ + " milliseconds!";
    } else if (window.intel && intel.xdk && dev.isDeviceReady.d_xdk_ready______) {
        str = "It worked! Intel XDK device ready detected at " + dev.isDeviceReady.d_xdk_ready______ + " milliseconds!";
    } else {
        str = "Bad device ready, or none available because we're running in a browser.";
    }

    console.log(str);
}


// ...additional event handlers here...

function thirdPartyEmulator() {
    
    alert("This feature uses a third party barcode scanner plugin. Third party plugins are not supported on emulator or app preview. Please build app to test.");
}

function searchid() {
    
    var studentid = document.getElementById('id_txt').value;
    var ustudentid = studentid.toUpperCase();
    var regexp = "^[S][0-9]{8}$";
    if( ustudentid && ustudentid.match(regexp) ) {
        //document.getElementById("content").innerHTML='<object type="text/html" data="https://sols1.usp.ac.fj/oreg/validateid.pl?id='+ustudentid+'&pid='+device.uuid+'" style="width: 90%; width: 90vw; height:90vh;"></object>';
        $('<object type="text/html" data="https://sols1.usp.ac.fj/oreg/validateid.pl?id='+ustudentid+'&pid='+device.uuid+'" ></object>').modal({showClose: true});
        searchlogins(ustudentid);
        //console.log('<object type="text/html" data="https://sols1.usp.ac.fj/oreg/validateid.pl?id='+ustudentid+'&pid='+device.uuid+'" style="width: 90%; width: 90vw; height:90vh;"></object>');
    }else{
        alert('Please Enter Correct Student ID');
    }
}

function searchlogins(sid) {
    
    var deviceID = device.uuid;
    
    $.getJSON("https://sols1.usp.ac.fj/oreg/insertshistory.pl?id="+sid+"&uuid="+deviceID, function(data){
        console.log( data.a );
    });
    
}

function checkConnection() {

    
    $.getJSON("https://api.ipify.org/?format=json", function(e) {
        var clientip;
        clientip = e.ip;
        
        var id_device = device.uuid;
        if(clientip.substring(0,7) != '144.120'){
            document.write("This app is not allowed on current network!!<br/><br/IP Address: "+clientip);
        }
        
        $.getJSON("https://sols1.usp.ac.fj/oreg/getphonedetl.pl?id="+id_device, function(data){
            if(data[0].phactive == '0'){
                document.write("Your phone is not authorised to access this app!!<br/><br/>Device ID: "+id_device);
            }
        });
    });    
    
    
    
    /**var deviceID = device.uuid;
    alert(deviceID);
    $.getJSON("https://sols1.usp.ac.fj/oreg/getphonedetl.pl?id="+deviceID, function(data){
        if(data[0].phactive == '0'){
            document.write("Your phone is not authorised to access this app!!<br/><br/>Device ID: "+deviceID);
        }
    });**/
}

function scan() {
    
    
    "use strict";
    var fName = "scan():";
    console.log(fName, "entry");
    try {
        if (window.tinyHippos) {
            thirdPartyEmulator();
            console.log(fName, "emulator alert");
        } else {
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    var studentid = result.text;
                    var ustudentid = studentid.toUpperCase();
                    console.log(fName, "Scanned result found!");
                    searchlogins(result.text);
                    //document.getElementById("content").innerHTML='<object type="text/html" data="https://sols1.usp.ac.fj/oreg/validateid.pl?id='+ustudentid+'&pid='+device.uuid+'" style="width: 90%; width: 90vw; height:90vh;"></object>';
                    $('<object type="text/html" data="https://sols1.usp.ac.fj/oreg/validateid.pl?id='+ustudentid+'&pid='+device.uuid+'" ></object>').modal({showClose: true});
                },
                function (error) {
                    alert("Scanning failed: " + error);
                },
                {
                  
                  showFlipCameraButton : true, // iOS and Android
                  showTorchButton : true, // iOS and Android
              }
            );
        }
    } catch (e) {
        console.log(fName, "catch, failure");
    }

    console.log(fName, "exit");
}


/**function checkConnection2() {

    var mtext = '2';
    
    $.getJSON("https://api.ipify.org/?format=json", function(e) {
        var clientip;
        clientip = e.ip;
        
        var id_device2 = device.uuid;
        if(clientip.substring(0,7) != '144.120'){
            mtext += "This app is not allowed on current network!!<br/><br/IP Address: "+clientip;
            //document.write("This app is not allowed on current network!!<br/><br/IP Address: "+clientip);
        }
        
        $.getJSON("https://sols1.usp.ac.fj/oreg/getphonedetl.pl?id="+id_device2, function(data){
            if(data[0].phactive == '0'){
                mtext += "Your phone is not authorised to access this app!!<br/><br/>Device ID: "+id_device2;
                //document.write("Your phone is not authorised to access this app!!<br/><br/>Device ID: "+id_device);
            }
        });
    }); 
    
    return mtext;
    
}**/


