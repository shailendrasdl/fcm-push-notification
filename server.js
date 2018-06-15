var express = require('express');
var admin 	= require('firebase-admin');
var app     = express();


var serviceAccount = require('./config/ezzysalonowner-firebase-adminsdk-3djge-53f725c0d6.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ezzysalon-ec3ce.firebaseio.com"
});

var port = process.env.PORT || 4000;

app.post('/notifications',function(req,res){
    var registrationToken = 'eUtM6C9mVnE:APA91bFuFgfKxHrVljAg4Djf_ORovl2SJNsCcfi46QhbuvCR-Rx5HT5zcxaEMPJDgC3Bckc7MMPuHHD5LI6sr7rk-m4frNkV9S-kAWBuDp7zoC0BpoLWZkgeORpFvRiM77KObQbA5Lfp';
    var message = {
        notification: {
            title: "appointment status : ",
            body: "your appointment has been booked on next day",
        },
        data: {
          score: '850',
          time: '2:45'
        },
        token: registrationToken
      };
      
    admin.messaging().send(message).then(function(response,err){
        console.log("Notification ID : =>", response)
        if(response){
            console.log('Notification Send Successfully');
            return;
        } else {
            console.log("Notification not sent", err);
        }
    }).catch((error) => {
        console.log('Error sending message:', error);
    });
});

app.listen(port);	
console.log('App is Running On Port : ' + port); 
exports = module.exports = app; 