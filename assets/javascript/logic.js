

// Get a reference to the database service
let db;
let trains =[];



let firebaseConfig = {
    apiKey: "AIzaSyDqqi5k8t0ESWeZ2vOPJmYXb5qiSBTxyoo",
    authDomain: "gatech-train-homework.firebaseapp.com",
    databaseURL: "https://gatech-train-homework.firebaseio.com",
    projectId: "gatech-train-homework",
    storageBucket: "",
    messagingSenderId: "471414248059"
  };

function updateButtonHandler()
{
    upDateTable();
}

function calculateArrival(train)
{
    let retVal = "";
    initialTime = moment(train.firstTime, "HH:mm");
    let arrivalTime = initialTime;
    let now = moment();
    
    diff = moment(now).diff(initialTime, "minutes");
    if(diff <= 0)
    {
        retVal = initialTime.format("hh:mm");
      
    }
    else
    {
        while(diff > 0)
        {
            arrivalTime.add(train.frequency, "minutes");
            diff = moment(now).diff(arrivalTime, "minutes");
        } // End of while (diff > 0)

        retVal = arrivalTime.format("hh:mm");

    } // end of else
 
    
    return retVal;
}

function upDateTable()
{
   
    // First Clear the table of the stale values
    $('#train-body').empty();

    for(i=0; i<trains.length; ++i)
    {
        let arrival = calculateArrival(trains[i]);
        let now = moment();
        now.subtract(12, "hours");
        let arrivalMoment = moment(arrival, "HH:mm");
        let diff = arrivalMoment.diff(now, "minutes");
        $("#train-table").append("<tr><td></td><td scope=\"col\">" +
            trains[i].name +
           "</td><td scope=\"col\">" + trains[i].destination + 
           "</td><td scope=\"col\">" + trains[i].frequency + 
           "</td><td scope=\"col\">" + arrival + 
           "</td><td scope=\"col\">" + diff +
           "</td></tr>");
    }
} // End of upDateTable()

function db_callback(snapshot)
{
    
    while(trains.length > 0)
    {
        trains.pop();
    }

    function collectTrains(childSnapshot)
    {
        trains.push(childSnapshot.val());
    }

    snapshot.forEach(collectTrains);
    upDateTable();
  }

 function submitButtonHandler(event)
 {
    let name = $("#train-name").val();
    $("#train-name").val("");

    let destination = $("#destination").val();
    $("#destination").val("");

    let frequency = $("#frequency").val();
    $("#frequency").val("");

    let firstTime = $("#first-time").val();
    $("#first-time").val("");

    let newTrain = new Train(name, destination, frequency, firstTime);
    calculateArrival(newTrain);

    db.ref().push(newTrain);
}

$( document ).ready(function() 
{
    // Initialize firebase
    firebase.initializeApp(firebaseConfig);

    // Get a reference to the database
    db = firebase.database();

    // Add a click event listener for the "Submit" button.
    $("#submit-train").click(submitButtonHandler);

    // Register the database callback
    db.ref().on("value", db_callback);

    // Add a click event listener for the "Update Schedule" button
    $("#update-btn").click(updateButtonHandler);
    
}); // End of ready()
