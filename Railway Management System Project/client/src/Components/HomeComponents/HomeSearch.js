import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import CityDropdown from "./CitiesDropdown";
import StationContext from '../../Contexts/StationContext'
import UserSearchedTrains from '../../Contexts/UserSearchedTrains'

import trainService from "../../Services/train.service"

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import bookingService from "../../Services/booking.service";
import Loading from "../Loading/Loading";

function HomeSearch(props) {

    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const {userSearchedTrains, setUserSearchedTrains} = useContext(UserSearchedTrains);

    const { allStations, setAllStations } = useContext(StationContext);
    console.log(allStations);
    console.log(props);
    const fromIndex = props.searchData !== undefined ? props.searchData.fromCity : allStations[0]?.id;
    const toIndex = props.searchData !== undefined ? props.searchData.toCity : allStations[1]?.id;
    const date = props.searchData !== undefined ? props.searchData.selectedDate : null;

    console.log(fromIndex);
    console.log(toIndex);

    const [fromCity, setFromCity] = useState(fromIndex);
    const [toCity, setToCity] = useState(toIndex);
    const [selectedDate, setSelectedDate] = useState(date);
    const [isFormValid, setIsFormValid] = useState(false);
    let navigate = useNavigate();

    const currentDate = new Date();
    const nextThreeMonths = new Date(currentDate.getFullYear(), currentDate.getMonth() + 3, 0);

    const validateForm = () => {
        // Perform input validation here
        const isDateValid = selectedDate !== null;

        // Set the form validity
        setIsFormValid(fromCity && toCity && isDateValid);

        return fromCity && toCity && isDateValid;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            // Perform submission logic here
            console.log('Form submitted with:', fromCity, toCity, selectedDate);
            const dataToSubmit = {
                source: {
                    id: fromCity
                },
                destination: {
                    id: toCity
                },
                journeyDate: selectedDate
            }
            setLoading(true);
            trainService.findTrainsByTwoStopsInSequence(dataToSubmit)
            .then((response) => {
                console.log("In response");
                console.log(response.data);
                setUserSearchedTrains(response.data.result);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(()=> {
                setLoading(false);
            });


            if (location.pathname != "/searched-trains") {
                console.log("Going to searched-trains")
                return navigate("/searched-trains", { state: { fromCity, toCity, selectedDate} });
            }
            console.log("Staying in /searched-trains");
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
            {loading && <Loading/>}
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
                                            allCities={allStations}
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
                                            allCities={allStations}
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
                                    {/* <input type="date" className="form-control" id="dob" 
                                    name="dob" value={formData.dob} onChange={handleChange} 
                                    max={getFifteenYearsAgoDate()} required /> */}
                                        <input
                                            type="date"
                                            value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
                                            onChange={(e) => handleDateChange(new Date(e.target.value))}
                                            min={currentDate.toISOString().split('T')[0]}
                                            max={nextThreeMonths.toISOString().split('T')[0]}
                                            required
                                        />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3 mb-2">
                        <div className="col-sm-12 text-center">
                            {/* <Link className="react-link" to='/searched-trains'> */}
                            <button onClick={handleSubmit} className="btn btn-pad m-4">
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