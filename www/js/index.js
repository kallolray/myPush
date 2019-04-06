/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


var pushApp = {
    statusData : "",
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    addStatus: function(text){
        pushApp.statusData += (text + "<br>");
        // var ds = document.getElementById("status");
        // ds.appendChild(document.createTextNode(text));
        // ds.appendChild(document.createElement("br"));
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'pushApp.receivedEvent(...);'
    onDeviceReady: function() {
        console.log('Received Device Ready Event');
        console.log('calling setup push');
        pushApp.addStatus("Received Device Ready Event");
        pushApp.addStatus("calling setup push");
        pushApp.setupPush();
    },
    setupPush: function() {
        console.log('calling push init');
        pushApp.addStatus("calling push init"); 
        var push = PushNotification.init({
            "android": {
                "senderID": "XXXXXXXX"
            },
            "browser": {},
            "ios": {
                "sound": true,
                "vibration": true,
                "badge": true
            },
            "windows": {}
        });
        console.log('after init');
        pushApp.addStatus("After Init"); 

        push.on('registration', function(data) {
            console.log('registration event: ' + data.registrationId);
            pushApp.addStatus('registration event: ' + data.registrationId);
            document.getElementById("regID").value = data.registrationId;
            var oldRegId = localStorage.getItem('registrationId');
            if (oldRegId !== data.registrationId) {
                // Save new registration ID
                localStorage.setItem('registrationId', data.registrationId);
                // Post registrationId to your pushApp server as the value has changed
            }

            // var parentElement = document.getElementById('registration');
            // var listeningElement = parentElement.querySelector('.waiting');
            // var receivedElement = parentElement.querySelector('.received');

            // listeningElement.setAttribute('style', 'display:none;');
            // receivedElement.setAttribute('style', 'display:block;');

            
        });

        push.on('error', function(e) {
            console.log("push error = " + e.message);
            pushApp.addStatus("push error = " + e.message); 
        });

        push.on('notification', function(data) {
            console.log('notification event');
            pushApp.addStatus("notification event"); 
            navigator.notification.alert(
                data.message,         // message
                null,                 // callback
                data.title,           // title
                'Ok'                  // buttonName
            );
       });
    }
};

function showStatus(){
    //window.alert(pushApp.statusData);
    document.getElementById("status").innerText(pushApp.statusData)
}
