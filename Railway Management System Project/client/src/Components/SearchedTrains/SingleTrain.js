import React, { useContext, useState } from "react";

import Modal from 'react-bootstrap/Modal';
import styled from "styled-components";
import TrainSeatClasses from "./TrainSeatClasses";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import StationContext from "../../Contexts/StationContext";

function SingleTrain({ train, searchData }) {

    console.log("In train");
    console.log(searchData);
    const getMonthDate = (dateString) => {
        const date = new Date(dateString);
        const options = { month: 'long', year: 'numeric', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const getHoursAndMinutes = (currentTime) => {
        const [hours, minutes] = currentTime.split(":").slice(0, 2);
        return hours + ":" + minutes;
    }

    const getDay = (currentDate) => {
        const date = new Date(currentDate);
        const dayNumber = date.getDay(); // Get the day of the week as a number
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayName = daysOfWeek[dayNumber];
        return dayName;
    }

    console.log(train);
    const {
        id,
        trainNumber,
        trainName,
        admin,
        source,
        destination,
        sourceDepartureDate,
        destinationArrivalDate,
        sourceDepartureTime,
        destinationArrivalTime,
        totalStops,
        trainStatus,
        stops,
        trainClasses
    } = train;
    // const { trainName, startTime, endTime, startStation, endStation, startDay, endDay, seats, price } = train;
    return (
        <Wrapper>
            <div className="big-container card container mt-4 p-1">
                <div className="card-body">
                    <p className="card-title fs-2 pb-0">{trainName} ---
                        <span className="text-muted fs-4 p-2">
                            {trainNumber}
                        </span>
                    </p>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <p>{getHoursAndMinutes(sourceDepartureTime)},{getDay(sourceDepartureDate).substring(0, 3)}</p>
                                <p className="text-muted city-text">{source.stationName}</p>
                            </div>
                            <div className="col-md-6">
                                <hr className="line" style={{ width: "80%" }} />
                                <p className="routes" onClick={handleShow}>View Routes</p> {/* Add your link here */}
                                <hr className="line" style={{ width: "80%" }} />

                                <Modal show={showModal} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Routes</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <p>{source.stationName} : {getMonthDate(sourceDepartureDate)} <span>----</span>  {getHoursAndMinutes(sourceDepartureTime)}</p>
                                        {
                                            stops.map((route) => {
                                                return (<>
                                                    <p> | </p>
                                                    <p>{route.station.stationName} : {getMonthDate(route.arrivalDate)} <span>----</span>  {getHoursAndMinutes(route.arrivalTime)}</p>
                                                </>
                                                )
                                            })
                                        }
                                        <p> | </p>
                                        <p>{destination.stationName} : {getMonthDate(destinationArrivalDate)} <span>----</span>  {getHoursAndMinutes(destinationArrivalTime)}</p>
                                    </Modal.Body>
                                </Modal>


                            </div>
                            <div className="col-md-3">
                                <p>{getHoursAndMinutes(destinationArrivalTime)},{getDay(destinationArrivalDate).substring(0, 3)}</p>
                                <p className="text-muted city-text">{destination.stationName}</p>
                            </div>
                        </div>
                    </div>

                    <div className="container padding-info">
                        <div className="bottom-paragraphs">
                            {/* <p className="card-text seats">No. of seats available : {seats}</p>
                            <p className="card-text price">Price : Rs. {price}</p> */}
                            {trainClasses.map((trainClass, index) => {
                                return <TrainSeatClasses key={index} trainClass={trainClass} />
                            })
                            }
                        </div>
                    </div>

                    <div className="col-md-12 text-center mt-3">
                        
                        <Link className="react-link" to="/confirm-booking" state= {{ train, searchData }}>
                            <button className="btn">
                                <p>Book Now</p>
                            </button>
                        </Link>
                    </div>

                </div>
            </div>
        </Wrapper>
    );
}

//SC - Sleeper Class
//CC - Chair Car
//3A - Third AC(Normal)
//2A - Two Bunks AC
//1A - Special Room with two bunks ACA

const Wrapper = styled.section`

.routes{
    position: relative;
    left: 30%;
    color: #30839f;
    cursor: pointer;
}

.card-title{
    font-size: 37px;
}

.bottom-paragraphs {
    display: flex;
    justify-content: space-between;
    
}
.price{
    padding-right: 5rem;
    }
    
    .line{
        margin-right: 150px;
    }
    
    .padding-info{
        background-color: #DADADA;
        padding: 10px 5px 0px 10px;
    }

    .city-text{
        margin-top: -1rem;
        font-size: 1.5rem;
    }
    .btn{
        height: 3.5rem;
        width: 11rem;
        border-radius: 50px;
        background-color: #189AD3;
        box-shadow: -5px 5px 10px rgba(0, 0, 0, 0.3);
        color: '#6b6b6b'
    }
    .btn-pad{
        padding: 8px 2px 12px 2px;
    }
    .big-container{
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
        margin-bottom: 2rem;
    }
    
    `

export default SingleTrain;