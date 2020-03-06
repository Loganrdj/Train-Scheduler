var firebaseConfig = {
    apiKey: "AIzaSyCvHD1AJqZiSqkNSIkHL3_mGatWX90oHf8",
    authDomain: "hw-trainscheduler-9338d.firebaseapp.com",
    databaseURL: "https://hw-trainscheduler-9338d.firebaseio.com",
    projectId: "hw-trainscheduler-9338d",
    storageBucket: "hw-trainscheduler-9338d.appspot.com",
    messagingSenderId: "181765974532",
    appId: "1:181765974532:web:f8d29f48f6adb18795e351"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var minutesAway = 0;


$("#submitButton").on("click", function(event) {
  event.preventDefault();

  name = $("input[name=trainName]").val().trim();
  destination = $("input[name=destination]").val().trim();
  frequency = $("input[name=frequency]").val().trim();
  firstTrain = $("input[name=firstTrain]").val().trim();

  // Code for the push
  database.ref().push({

    name: name,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
});



database.ref().on("child_added", function(childSnapshot) {

  // Then we console.log the value of childSnapshot
  console.log(childSnapshot.val());

  $(".trainSchedule").append("<div class='row trainContent'>" + 
    "<div class='col-md'>" + childSnapshot.val().name + "</div>" +
    "<div class='col-md'>" + childSnapshot.val().destination + "</div>" +
    "<div class='col-md'>" + childSnapshot.val().frequency + "</div>" +
    "<div class='col-md'>" + childSnapshot.val().firstTrain + "</div>" +
    "<div class='col-md'>" + minutesAway + "</div> <hr class='my-4'> " +
    "</div>"
  );

  // $('input[name=trainName').val
  

  // Update the clickCounter variable with data from the database.
  // clickCounter = snapshot.val().clickCount;

  // Then we change the html associated with the number.
  // $("#click-value").text(snapshot.val().clickCount);

  // If there is an error that Firebase runs into -- it will be stored in the "errorObject"
  // Again we could have named errorObject anything we wanted.
}, function(errorObject) {

  // In case of error this will print the error
  console.log("The read failed: " + errorObject.code);
});