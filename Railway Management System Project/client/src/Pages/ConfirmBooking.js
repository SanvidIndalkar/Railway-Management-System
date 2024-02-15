import React from "react";
import { Link, useLocation } from "react-router-dom";

import styled from "styled-components";

function ConfirmBooking({props}) {
    console.log(props);
    const location = useLocation();

  // Access the data passed via state prop\
    console.log(location);
    const receivedData = location.state;
    console.log(receivedData);

    return (<Wrapper>
        <div className="container">
            <div className="details-container">
                <h4 className="mb-4 center-container p-4">Booking Details</h4>

                <div className="label-value p-4">
                    <label htmlFor="trainName" className="form-label"><h5>
                        Train Name:
                    </h5>
                    </label>
                    <h5 className="form-control-static text-muted">Shatabdi Express</h5>
                </div>

                <div className="label-value p-4">
                    <label htmlFor="trainNumber" className="form-label">
                        <h5>
                            Train Number:
                        </h5>
                    </label>
                    <h5 className="form-control-static text-muted">12345</h5>
                </div>

                <div className="label-value p-4">
                    <label htmlFor="seatNumber" className="form-label">
                        <h5>
                            Number of passengers:
                        </h5>
                    </label>
                    <h5 className="form-control-static text-muted">2</h5>
                </div>

                <div className="label-value p-4">
                    <label htmlFor="passengerName" className="form-label">
                        <h5>
                            User Name:
                        </h5>
                    </label>
                    <h5 className="form-control-static text-muted">Natasha</h5>
                </div>

                <div className="label-value p-4">
                    <label htmlFor="departureTime" className="form-label">
                        <h5>
                            Departure Time:
                        </h5>
                    </label>
                    <h5 className="form-control-static text-muted">12:00 PM</h5>
                </div>

                <div className="label-value p-4">
                    <label htmlFor="departureDate" className="form-label">
                        <h5>
                            Departure Date:
                        </h5>
                    </label>
                    <h5 className="form-control-static text-muted">2023-01-01</h5>
                </div>
                <div className="center-container p-4">
                    <Link className="react-link" to="/passenger-forms" >
                        <button type="submit" className="btn btn-primary">
                        Enter Passenger Details
                        </button>
                        </Link>
                </div>
            </div>
        </div>
    </Wrapper>);
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

    .label-value{
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }

    .label-value{
      margin-bottom: 0;
    }

    btn{
        color: black;
    }

`

export default ConfirmBooking;