import React, { useState } from 'react';
import PassengerForm from '../Components/PassengerDetailsForm/PassengerForm';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import bookingService from '../Services/booking.service';
import { toast } from 'react-toast';
import Loading from '../Components/Loading/Loading';

const PassengerForms = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location)
    let { dataForPassengers } = location.state;
    const totalPassengers = dataForPassengers.totalPassengers;

    console.log(totalPassengers);
    const [numSeats, setNumSeats] = useState(totalPassengers);
    console.log(numSeats);
    const [passengersData, setPassengersData] = useState(Array(numSeats).fill({}));


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
            dataForPassengers = {...dataForPassengers, passengersDTO : passengersData}
            setLoading(true);
            bookingService.bookTrainWithPassengers(dataForPassengers.trainId, dataForPassengers)
            .then((response) => {
                console.log(response);
                navigate("/booking-details", {state : {passengersData, dataForPassengers}});
                toast.success(response.data.result);
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.response.data.message);
            })
            .finally(() => {
                setLoading(false);
            })
            
        } else {
            alert('Please fill in all fields for each passenger.');
        }
    };

    return (
        <> {loading && <Loading/>}
            {/* <Navbar /> */}
            <Wrapper>
                <form onSubmit={handleSubmit} className="mt-5">
                    {passengersData.map((passenger, index) => (
                        <PassengerForm
                            key={index}
                            index={index}
                            onPassengerChange={handlePassengerChange}
                        />
                    ))}

                    <div className="col-sm-10 offset-sm-1 text-center">
                        <button type="submit" className="btn btn-pad btn-secondary m-4">
                            <p>Make Payment</p>
                        </button>
                    </div>
                </form>
            </Wrapper>
        </>
    );
};

const Wrapper = styled.section`
    .btn-pad{
        height: 50px;
        padding: 8px 35px 5px 35px;
    }
`

export default PassengerForms;