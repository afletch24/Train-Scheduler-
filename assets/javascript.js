  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC6SqH-1FsijkcIRo1EwXX4d524u_1Cy8A",
    authDomain: "train-scheduler-faea4.firebaseapp.com",
    databaseURL: "https://train-scheduler-faea4.firebaseio.com",
    projectId: "train-scheduler-faea4",
    storageBucket: "",
    messagingSenderId: "1055622325276"
  };
  
  firebase.initializeApp(config);

var database = firebase.database();

$("#submitButton").on("click", function(){
   

    var name = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrainTime = $("#firstTrainTime").val().trim();
    var frequency = $("#frequency").val().trim();

    var newTrain= {
        name: name,
        destination: destination,
        time: firstTrainTime,
        frequency: frequency,
    };

    database.ref().push(newTrain);

    console.log(firstTrainTime);

    // console.log(newTrain.name);
    // console.log(newTrain.destination);
    // console.log(newTrain.time);
    // console.log(newTrain.frequency);

    $("#trainName").val(" ");
    $("#destination").val(" ");
    $("#firstTrainTime").val(" ");
    $("#frequency").val(" ");

     event.preventDefault();
});

database.ref().on("child_added", function(childSnapshot, prevChildKey){

    // console.log(childSnapshot.val());

    var Tname = childSnapshot.val().name;
    var Tdestination = childSnapshot.val().destination;
    var TfirstTrainTime = childSnapshot.val().time;
    var Tfrequency = childSnapshot.val().frequency;

    // console.log(Tname);
    // console.log(Tdestination);
    // console.log(TfirstTrainTime); 
    // console.log(Tfrequency);


    var tFrequency = Tfrequency;
    console.log(tFrequency + " **frequency");
   
    var firstTimeConverted = moment(TfirstTrainTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted + " first time converted");

    // var firstTrainTime = moment($("#inputFirstTrainTime").val().trim(), "hh:mm a").format("HH:mm");

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder + " remainder");

    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    var train = moment(nextTrain).format("hh:mm");


    $("#trainTable > tbody").append("<tr><td>" + Tname + "</td><td>" + Tdestination + "</td><td>" +
    Tfrequency + "</td><td>" + train + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});