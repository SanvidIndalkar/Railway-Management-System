import React from "react";
import { Navbar } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import styled from "styled-components";

function BookingDetails() {

    const location = useLocation();
    console.log(location);
    const {passengersData, dataForPassengers} = location.state;
    console.log(dataForPassengers, passengersData);
    return (
        <>
            <Wrapper>
                <div className="container booking-details-container">
                    <h5 className="m-4">Booking Details</h5>
                    <ul>
                        <li>Booking Date: {new Date().toLocaleDateString()}</li>
                    </ul>
                    <div className="m-4">
                        <h5>Passenger Information</h5>
                    </div>
                    {passengersData.map((passenger, index) => (
                        <div key={index} className="card mb-3">
                            <div className="card-body">
                                <p className="card-title">Passenger {index + 1}</p>
                                <p className="card-text">
                                    Name: {passenger.firstName} {passenger.lastName}
                                </p>
                                <p className="card-text">
                                    Age: {passenger.age}
                                </p>
                                <p className="card-text">
                                    Gender: {passenger.gender}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Wrapper>
        </>
    );
}

const Wrapper = styled.div`
    .passenger-information-heading{
        
    }
    
    .booking-details-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
}

    .passenger-info {
         margin-bottom: 20px;
    }

/* Add additional styles for responsiveness */
    @media screen and (max-width: 600px) {
        .booking-details-container {
        padding: 10px;
    }

  /* Adjust other styles for smaller screens */
}
`

export default BookingDetails;