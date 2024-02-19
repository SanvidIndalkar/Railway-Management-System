import React, { useState } from 'react';
import Loading from '../Components/Loading/Loading';
import bookingService from '../Services/booking.service';
import PassengerDetails from '../Components/PassengerPNR/PassengerDetails';

const PNRStatus = () => {
    // State to store the input PNR
    const [pnr, setPNR] = useState('');
    const [loading, setLoading] = useState(false);
    const [passengers, setPassengers] = useState([]);
    // Function to handle changes in the input field
    const handlePNRChange = (event) => {
        setPNR(event.target.value);
    };

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        bookingService.passengerDetailsOfPNR(pnr)
        .then((response) => {
            console.log(response)
            setPassengers(response.data.result)
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            setLoading(false);
        })
    };

    return ( 
        <>
            <div className="container mt-5">
            {loading && <Loading/>}
            <h2 className="mb-4"></h2>
            <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
                <div className="mb-3">
                    <label htmlFor="pnr" className="form-label">Enter PNR:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="pnr"
                        name='pnr'
                        value={pnr}
                        onChange={handlePNRChange}
                    />
                </div>
                <button type="submit" className="btn btn-success">Check Status</button>
            </form>
            {passengers.length != 0 &&
            <PassengerDetails passengers={passengers} />
            }
        </div>
        </>
    );
}

export default PNRStatus;
