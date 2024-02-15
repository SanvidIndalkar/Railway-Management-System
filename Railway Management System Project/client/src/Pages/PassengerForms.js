import React, { useState } from 'react';
import PassengerForm from '../Components/PassengerDetailsForm/PassengerForm';
import styled from 'styled-components';
import BookingDetails from './BookingDetails';
import { Link } from 'react-router-dom';

const PassengerForms = () => {
    const [numSeats, setNumSeats] = useState(1);
    const [passengersData, setPassengersData] = useState(Array(numSeats).fill({}));
    

    const handleSeatChange = (e) => {
        const selectedSeats = parseInt(e.target.value, 10);
        setNumSeats(selectedSeats);
        setPassengersData(Array(selectedSeats).fill({}));
    };

    const handlePassengerChange = (index, passenger) => {
        setPassengersData((prevPassengersData) => {
            const updatedPassengersData = [...prevPassengersData];
            updatedPassengersData[index] = passenger;
            return updatedPassengersData;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(passengersData);

        // Check if all passengers have filled the required fields
        const isFormValid = passengersData.every((passenger) => (
            passenger.firstName &&
            passenger.lastName &&
            passenger.age &&
            passenger.gender
        ));

        if (isFormValid) {
            // Handle form submission logic here
            console.log('Submitted:', passengersData);
            // <BookingDetails passengersData={passengersData}/>
            // Reset the form after submission if needed
            setPassengersData(Array(numSeats).fill({}));
        } else {
            alert('Please fill in all fields for each passenger.');
        }
    };

    return (
        <Wrapper>
            <label>
                Select Number of Seats:
                <select value={numSeats} onChange={handleSeatChange}>
                    {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                            {num}
                        </option>
                    ))}
                </select>
            </label>

            <form onSubmit={handleSubmit} className="mt-5">
                {passengersData.map((passenger, index) => (
                    <PassengerForm
                        key={index}
                        index={index}
                        onPassengerChange={handlePassengerChange}
                    />
                ))}

                <div className="row mb-3">
                    <div className="col-sm-10 offset-sm-1 text-center">
                        <button type="submit" className="btn btn-pad btn-secondary m-4">
                            <Link className="react-link" to="/booking-details">
                            <p>
                                Make Payment
                            </p>
                            </Link>
                        </button>
                    </div>
                </div>
            </form>
        </Wrapper>
    );
};

const Wrapper = styled.section`
    .btn-pad{
        height: 50px;
        padding: 8px 35px 5px 35px;
    }
`

export default PassengerForms;
