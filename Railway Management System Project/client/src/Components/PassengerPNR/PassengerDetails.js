import React from 'react';

const PassengerDetails = ({ passengers }) => {
  return (
    <div className="container">
      <h5 className="mt-4 mb-3">Passenger Details</h5>
      <div className="row">
        {passengers.map((passenger, index) => (
          <div key={index} className="col-md-3">
            <div className="card mb-4">
              <div className="card-body">
                <p className="card-title">Name : {passenger.firstName} {passenger.lastName}</p>
                <p className="card-text">Gender: {passenger.gender}</p>
                <p className="card-text">Source: {passenger.source}</p>
                <p className="card-text">Destination: {passenger.destination}</p>
                <p className="card-text">Class: {passenger.trainClass}</p>
                <p className="card-text">Seat Number: {passenger.seatNumber}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PassengerDetails;
