import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import CityDropdown from "./CitiesDropdown";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function HomeSearch(props) {
    console.log(props);
    const from = props.searchData !== undefined ? props.searchData.fromCity : "Delhi";
    const to = props.searchData !== undefined ? props.searchData.toCity : "Mumbai";
    const date = props.searchData !== undefined ? props.searchData.selectedDate : null;
    
    const [fromCity, setFromCity] = useState(from);
    const [toCity, setToCity] = useState(to);
    const [selectedDate, setSelectedDate] = useState(date);
    const [isFormValid, setIsFormValid] = useState(false);
    let navigate = useNavigate();


    const validateForm = () => {
        // Perform input validation here
        const isFromCityValid = fromCity.trim() !== '';
        const isToCityValid = toCity.trim() !== '';
        const isDateValid = selectedDate !== null;

        // Set the form validity
        setIsFormValid(isFromCityValid && isToCityValid && isDateValid);

        return isFromCityValid && isToCityValid && isDateValid;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            // Perform submission logic here
            console.log('Form submitted with:', fromCity, toCity, selectedDate);

            //*************************************************************************************************************************//
            /*Post this fromCity toCity and selectedDate to backend and get response then redirect to second Page i.e searchedtrains*/
            //*************************************************************************************************************************//
            return navigate("searched-trains", {state:{fromCity, toCity, selectedDate}});
        } else {
            console.log('Form validation failed');
        }
    };

    const handleFromCityChange = (selectedCity) => {
        setFromCity(selectedCity);
        // Disable selected city in "To" dropdown
        setToCity((prevToCity) => (prevToCity === selectedCity ? '' : prevToCity));
    };

    const handleToCityChange = (selectedCity) => {
        setToCity(selectedCity);
        // Disable selected city in "From" dropdown
        setFromCity((prevFromCity) => (prevFromCity === selectedCity ? '' : prevFromCity));
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <Wrapper>
            <div className="container p-2 top-margin">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="card">
                                <div className="card-body">
                                    <label>
                                        <h5 name="From" className="card-title">From</h5>
                                    </label>
                                    <p className="card-text">
                                        <CityDropdown
                                            selectedCity={fromCity}
                                            onCityChange={handleFromCityChange}
                                            disabledCities={[toCity]}
                                        />
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-4">
                            <div className="card">
                                <div className="card-body">
                                    <label>
                                        <h5 name="To" className="card-title">To</h5>
                                    </label>
                                    <p className="card-text">
                                        {/* <input name="To" className="custom-input" value="Mumbai" /> */}
                                        <CityDropdown
                                            selectedCity={toCity}
                                            onCityChange={handleToCityChange}
                                            disabledCities={[fromCity]}
                                        />
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-4">
                            <div className="card">
                                <div className="card-body">
                                    <label>
                                        <h5 name="Date" className="card-title">Date</h5>
                                    </label>
                                    <p className="card-text">
                                        <DatePicker selected={selectedDate} onChange={handleDateChange} />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3 mb-2">
                        <div className="col-sm-12 text-center">
                            {/* <Link className="react-link" to='/searched-trains'> */}
                            <button onClick={handleSubmit} className="btn btn-pad">
                                Search
                            </button>
                            {/* </Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    /* margin: 40vh 10vw 0vh 10vw; */
    position: relative;
    bottom: 2rem; 
    
    @media (max-width: 768px) {
        bottom: 1rem; 
    }

    @media (max-width: 576px) {
        bottom: 4rem; 
    }

    .custom-input {
      border: none;
      /* Additional styles as needed */
    }

    /* .container{
        background-color: skyblue;
    } */

    .card{
        box-shadow: -5px 5px 10px rgba(0, 0, 0, 0.3);
    }

    .btn{
        height: 3.5rem;
        width: 11rem;
        border-radius: 50px;
        background-color: #189AD3;
        /* background-color: #001a2d; */
     
        margin-top: 2rem;
        box-shadow: -5px 5px 10px rgba(0, 0, 0, 0.3)
    }
    .btn-pad{
        padding: 8px 2px 12px 2px;
    }
    .card{
        box-shadow: -5px 5px 10px rgba(0, 0, 0, 0.3);
    }
    .react-link{
        color: '#6b6b6b'
    }
`

export default HomeSearch;