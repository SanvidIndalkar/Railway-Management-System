import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import StationContext from "../Contexts/StationContext";
import UserContext from "../Contexts/UserContext"
function ConfirmBooking() {

    const navigate = useNavigate();

    const {user} = useContext(UserContext);
    const { allStations, setAllStations } = useContext(StationContext);

    useEffect(() => {     
        if(!user.loggedIn) return navigate('/login');
        if(user.role === "ROLE_ADMIN") return navigate("/admin/dashboard");
    })

    console.log(allStations);
    const location = useLocation();
    const [totalPassengers, setTotalPassengers] = useState(1);
    const [selectedClass, setSelectedClass] = useState("");
    console.log(location);
    const handleSubmit = () => {
        // Handle submission logic here, such as storing totalPassengers in state or proceeding to the next step
        console.log("Total passengers:", totalPassengers);
        console.log("Train Class : ", selectedClass);
        const dataForPassengers = {
            trainId : train.id,
            userId: user.id,
            source: {
              id: searchData.fromCity,
            },
            destination: {
              id: searchData.toCity,
            },
            trainClass: selectedClass,
            totalPassengers,
            passengersDTO: []
        }

        navigate('/passenger-forms', {state:{dataForPassengers}});
    };


    const getArrivalTimeById = (id) => {
        // Check if the source id matches
        if (train.source.id === id) {
            return train.sourceDepartureTime;
        }
    
        // Iterate over stops array
        for (const stop of train.stops) {
            // Check if the stop's station id matches
            if (stop.station.id === id) {
                return stop.arrivalTime;
            }
        }
    
        // If no match found, return null or handle the case accordingly
        return null;
    }


    const { train, searchData } = location.state;
    // const { trainName, trainNumber } = train;
    console.log(searchData);
    console.log(train);
    // const { fromCity, toCity, journeyDate } = searchData;


    const formatDate = (date) => {
        // Array of month names
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
    
        // Extract day, month, and year from the Date object
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
    
        // Get the month name from the monthNames array
        const monthName = monthNames[monthIndex];
    
        // Return the formatted string
        return `${monthName} ${day}, ${year}`;
    }

    return (
        <Wrapper>

            <div className="container">
                 <div className="details-container">
                    <h4 className="mb-4 center-container p-4">Booking Details</h4>

                    <div className="label-value m-2 p-2">
                        <label htmlFor="trainName" className="form-label">
                            <p>Train Name:</p>
                        </label>
                        <p className="form-control-static text-muted">{train.trainName}</p>
                    </div>

                    <div className="label-value m-2 p-2">
                        <label htmlFor="trainNumber" className="form-label">
                            <p>Train Number:</p>
                        </label>
                        <p className="form-control-static text-muted">{train.trainNumber}</p>
                    </div>

                    <div className="label-value m-2 p-2">
                        <label htmlFor="journeyDate" className="form-label">
                            <p>Departure Date :</p>
                        </label>
                        <p className="form-control-static text-muted">{formatDate(searchData.selectedDate)}</p>
                    </div>
                    <div className="label-value m-2 p-2">
                        <label htmlFor="journeyDate" className="form-label">
                            <p>Departure Time :</p>
                        </label>
                        <p className="form-control-static text-muted">{getArrivalTimeById(parseInt(searchData.fromCity))}</p>
                    </div>
                    <div className="label-value m-2 p-2">
                        <label htmlFor="fromCity" className="form-label">
                            <p>From :</p>
                        </label>
                        <p className="form-control-static text-muted">{allStations[parseInt(searchData.fromCity)].stationName}</p>
                    </div>
                    <div className="label-value m-2 p-2">
                        <label htmlFor="toCity" className="form-label">
                            <p>To :</p>
                        </label>
                        <p className="form-control-static text-muted">{allStations[parseInt(searchData.toCity)].stationName}</p>
                    </div>

                    <div className="label-value m-2 p-2">
                        <label htmlFor="trainClass" className="form-label">
                            <p>Train Class:</p>
                        </label>
                        <select
                            id="trainClass"
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            className="form-select form-control"
                        >
                            <option value="">Select Class</option>
                            {train.trainClasses.map((classItem, index) => (
                                <option key={index} value={classItem.name}>{classItem.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="label-value m-1 row">
                        <label htmlFor="totalPassengers" className="form-label col-sm-7">
                            <p>Total Passengers:</p>
                        </label>
                        <input
                            type="number"
                            id="totalPassengers"
                            name="totalPassengers"
                            value={totalPassengers}
                            onChange={(e) => setTotalPassengers(Number(e.target.value))}
                            min={1}
                            className="form-control col-sm-3"
                        />
                    </div>

                    <div className="center-container">
                        <button onClick={handleSubmit} className="btn btn-primary">
                            Enter Passenger Details
                        </button>
                    </div>
                </div>
            </div> 
        </Wrapper>
    );
}

const Wrapper = styled.section`
  .details-container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    background-color: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    margin-top: 50px;
  }

  .label-value {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px; /* Adjusted margin */
  }

  p {
    margin: 0; /* Remove default margin for heading */
  }

  .center-container {
    text-align: center; /* Center align button */
  }

  btn {
    color: black;
  }
`;

export default ConfirmBooking;
