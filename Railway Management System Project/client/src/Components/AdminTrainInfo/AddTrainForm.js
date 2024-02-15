import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function AddTrain() {
  return (
    <Wrapper>
      <div className="container p-1">
        <div className="form-container p-3 bg-light">
          <h5 className="mb-2 p-3 btn-container" style={{ fontSize: "1.5rem" }}>
            Add Train
          </h5>

          <form>
            <div className="mb-3">
              <label htmlFor="trainNumber" className="form-label lead">
                Train Number
              </label>
              <input
                type="text"
                className="form-control"
                id="trainNumber"
                placeholder="Enter train number"
                style={{ width: "100%", padding: "0.5rem", fontSize: "1rem" }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="trainName" className="form-label lead">
                Train Name
              </label>
              <input
                type="text"
                className="form-control"
                id="trainName"
                placeholder="Enter train name"
                style={{ width: "100%", padding: "0.5rem", fontSize: "1rem" }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="sourceStation" className="form-label lead">
                Source Station
              </label>
              <input
                type="text"
                className="form-control"
                id="sourceStation"
                placeholder="Enter source station name"
                style={{ width: "100%", padding: "0.5rem", fontSize: "1rem" }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="destinationStation" className="form-label lead">
                Destination Station
              </label>
              <input
                type="text"
                className="form-control"
                id="destinationStation"
                placeholder="Enter destination station name"
                style={{ width: "100%", padding: "0.5rem", fontSize: "1rem" }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="sourceDepartureTime" className="form-label lead">
                Source Departure Time
              </label>
              <input
                type="text"
                className="form-control"
                id="sourceDepartureTime"
                placeholder="Enter source departure time"
                style={{ width: "100%", padding: "0.5rem", fontSize: "1rem" }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="destinationArrivalTime" className="form-label lead">
                Destination Arrival Time
              </label>
              <input
                type="text"
                className="form-control"
                id="destinationArrivalTime"
                placeholder="Enter destination arrival time"
                style={{ width: "100%", padding: "0.5rem", fontSize: "1rem" }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="totalStops" className="form-label lead">
                Total Stops
              </label>
              <input
                type="text"
                className="form-control"
                id="totalStops"
                placeholder="Enter total stops"
                style={{ width: "100%", padding: "0.5rem", fontSize: "1rem" }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="totalSeats" className="form-label lead">
                Total Seats
              </label>
              <input
                type="text"
                className="form-control"
                id="totalSeats"
                placeholder="Enter total seats"
                style={{ width: "100%", padding: "0.5rem", fontSize: "1rem" }}
              />
            </div>

            <div className="btn-container">
              <button type="submit" className="btn btn-primary" style={{ width: "50%", padding: "0.75rem 1rem", fontSize: "1rem" }}>
                Add Train
              </button>
            </div>
          </form>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .form-container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    background-color: 'red';
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    margin-top: 50px;
  }

  .btn-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
`;

export default AddTrain;
