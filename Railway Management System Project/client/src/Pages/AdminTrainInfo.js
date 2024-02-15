import PassengersInfo from "../Components/AdminTrainInfo/PassengerInfo";
import TrainInfo from "../Components/AdminTrainInfo/TrainInfo";
import AdminNavbar from "../Components/Navbar/AdminNavbar";

import React from "react";

function AdminTrainInfo() {
    //train name start source time and destination time no. of stops seats avaliable total seats 
    const trainDetails = {
        trainName : "Shatabdi Express",

        startDate : "21 Feb 2024",
        startStation : "Delhi",
        startTime : "10.12",
        startDay : "Thu",

        endDate : "22 Feb 2024",
        endStation : "Mumbai",
        endTime : "02:23",
        endDay : "Fri",

        totalSeats : {"SL":15, "1A" : 15, "2A": 15, "3A": 15},

        trainStops : ["Mumbai", "Kalyan", "Pune", "Satara", "Sangli"],
        trainSeats : [ {"SL":15, "1A" : 15, "2A": 15, "3A": 15},
                        {"SL":15, "1A" : 15, "2A": 15, "3A": 15}]
    }

    const passengersDetails = [{
        PNR : 1000,
        firstName : "Sanvid",
        lastName: "Indalkar",
        age: 23,
        gender: "M",
        from: "Kalyan",
        to: "Mumbai",
        email: "sanvid@gmail.com"
    },{PNR : 1001,
    firstName : "Mahesh",
    lastName: "Indalkar",
    age: 53,
    gender: "M",
    from: "Pune",
    to: "Mumbai",
    email: "mahesh@gmail.com"},
    {PNR : 1002,
        firstName : "Riya",
        lastName: "Mokashi",
        age: 23,
        gender: "F",
        from: "Mumbai",
        to: "Kolhapur",
        email: "riya@gmail.com"}]
    return ( <>
    <div>
        <TrainInfo trainDetails={trainDetails}/>
    </div>
    <section>
        <PassengersInfo passengersDetails = {passengersDetails}/>
    </section>
    </> );
}

export default AdminTrainInfo;