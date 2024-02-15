import React, { useState } from "react";
import styled from "styled-components";

function RescheduleTrain() {
  const [showForm, setShowForm] = useState(false);

  const handleRescheduleClick = () => {
    setShowForm(true);
  };

  return (
    <Wrapper>
      <div className="content">
        <h5 className="mb-2 p-3" style={{ fontSize: "1.5rem" }}>
          <center>Reschedule Train</center>
        </h5>
        <div className="mb-3">
          <label htmlFor="trainNumber" className="form-label lead">
            Train Number
          </label>
          <input
            type="text"
            className="form-control"
            id="trainNumber"
            placeholder="Enter train number"
          />
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleRescheduleClick}
          >
            Reschedule Train
          </button>
        </div>
        {showForm && <RescheduleForm />}
        {showForm && (
          <div className="btn-container">
            <button type="submit" className="btn btn-success modify-btn">
              Modify
            </button>
          </div>
        )}
      </div>
    </Wrapper>
  );
}

function RescheduleForm() {
  return (
    <div className="mb-3">
      <label htmlFor="date" className="form-label lead">
        Date
      </label>
      <input
        type="date"
        className="form-control"
        id="date"
        placeholder="Select date"
      />
      <label htmlFor="sourceDepartureTime" className="form-label lead">
        Source Departure Time
      </label>
      <input
        type="time"
        className="form-control"
        id="sourceDepartureTime"
        placeholder="Select departure time"
      />
      <label htmlFor="destinationArrivalTime" className="form-label lead">
        Destination Arrival Time
      </label>
      <input
        type="time"
        className="form-control"
        id="destinationArrivalTime"
        placeholder="Select arrival time"
      />
      <label htmlFor="notes" className="form-label lead">
        Notes
      </label>
      <textarea
        className="form-control"
        id="notes"
        rows="3"
        placeholder="Enter notes"
      ></textarea>
    </div>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .content {
    width: 80%;
    max-width: 600px;
    padding: 20px;
    background-color: "red";
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    margin-top: 50px;
  }

  .form-label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 1rem;
  }

  .form-control {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
  }

  .btn-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }

  .modify-btn {
    width: 150px; /* Increase width of the button */
  }
`;

export default RescheduleTrain;
