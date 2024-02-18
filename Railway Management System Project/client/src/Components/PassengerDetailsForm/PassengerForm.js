import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const PassengerForm = ({ index, onPassengerChange }) => {
    
    const [passenger, setPassenger] = useState({
        firstName: '',
        lastName: '',
        age: '',
        gender: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPassenger((prevPassenger) => ({
            ...prevPassenger,
            [name]: value,
        }));

        onPassengerChange(index, { ...passenger, [name]: value });
    };

    return (
        <div className='container mt-2'>
            <Wrapper>
                <label className="col-sm-2 col-form-label passenger-heading">
                    <p>
                        Passenger {index + 1}:
                    </p>
                </label>
                <div className="col-sm-10">


                    <div className="row mb-1">
                        <label className="col-sm-2 col-form-label"><p>
                            First Name:
                        </p>
                        </label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                name={`firstName`}
                                value={passenger.firstName}
                                onChange={handleChange}
                                required
                                placeholder="First Name"
                            />

                        </div>
                    </div>

                    <div className="row mb-1">
                        <label className="col-sm-2 col-form-label"><p>
                            Last Name:
                        </p>
                        </label>
                        <div className="col-sm-10">

                            <input
                                type="text"
                                className="form-control form-control-lg"
                                name={`lastName`}
                                value={passenger.lastName}
                                onChange={handleChange}
                                required
                                placeholder="Last Name"
                            />
                        </div>
                    </div>

                    <div className="row mb-1">
                        <label className="col-sm-2 col-form-label"><p>
                            Age:
                        </p>
                        </label>
                        <div className="col-sm-10">
                            <input
                                type="number"
                                className="form-control form-control-lg"
                                name={`age`}
                                value={passenger.age}
                                onChange={handleChange}
                                required
                                placeholder="Age"
                            />
                        </div>
                    </div>

                    <div className="row mb-1">
                        <label className="col-sm-2 col-form-label"><p>
                            Gender:
                        </p>
                        </label>
                        <div className="col-sm-10">
                            <select
                                className="form-select form-select-lg"
                                name="gender"
                                value={passenger.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </div>
    );
};

const Wrapper = styled.div`
    background-color: #E0E0E0;
    border-radius: 20px;
    padding: 10px 10px;

    .row{
        padding: 0px 0px;
        margin: 0px 0px;
    }

    .passenger-heading{
        padding-left: 12px;
    }
`

export default PassengerForm;
