const firebase = require("firebase")


var app = firebase.initializeApp({
apiKey: "AIzaSyD6f14ph0RzjoUn673MPGri_NxOkPEvccs",
authDomain: "diplist-a1ba9.firebaseapp.com",
databaseURL: "https://diplist-a1ba9.firebaseio.com",
});

module.exports = app