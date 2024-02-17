import React, { useState } from "react";
import { Link, Navigate, resolvePath } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import userService from "../Services/user.service";
import { Nav, Navbar } from "react-bootstrap";

function Register() {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
        adhaarNo: "",
        mobileNo: "",
        state: "",
        city: "",
        pincode: "",
        password: "",
        dob: "",
        role: "ROLE_USER",
        password: "",
        confirmPassword: "",
        otp: ""
    });

    const removeLeadingZeros = (str) => {
        // Use a regular expression to match and replace leading zeros
        return str.replace(/^0+/, '');
    }

    const handleGenerateOTP = (e) => {
        const email = formData.email;
        if (email == "") toast.error("Please provide valid email to generate OTP!");
        else {
            userService.generateOTP(email)
                .then((response) => {
                    console.log(response);
                    if (response.data.error == false) {
                        toast.success(response.data.message);
                    }
                })
                .catch((error) => {
                    console.log(error.response.error);
                })
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    // Get the date 15 years ago
    const getFifteenYearsAgoDate = () => {
        const today = new Date();
        today.setFullYear(today.getFullYear() - 15);
        return today.toISOString().split('T')[0];
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password != formData.confirmPassword) {
            toast.error("Passwords dont match!");
            return;
        }
        if (formData.otp == "") {
            toast.error("Please enter OTP!");
            return;
        }

        setFormData({ ...formData, mobileNo: removeLeadingZeros(formData.mobileNo) });
        userService.register(formData.otp, formData)
            .then((response) => {
                console.log(response);
                if (response.data.message != undefined) {
                    toast.error(`${response.data.message}`);
                }
            })
            .catch((error) => {
                console.log(error.response);
                if (error.response != undefined
                    && error.response.data != undefined && error.response.data.message != undefined) {
                    toast.error(error.response.data.message);
                    return;
                }
                toast.error("Something went wrong...");
            })
    };

    return (
        <>
            {/* <Navbar /> */}
            <Wrapper>
                <div className="container p-1">
                    <div className="form-container p-3 bg-light">
                        <h5 className="mb-2 p-3 btn-container">Register</h5>

                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="col">
                                    <div className="row mb-3">
                                        <div className="col">
                                            <label htmlFor="first_name" className="form-label lead">First Name</label>
                                            <input type="text" className="form-control" id="first_name" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter your first name" required />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="last_name" className="form-label lead">Last Name</label>
                                            <input type="text" className="form-control" id="last_name" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter your last name" required />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col">
                                            <label htmlFor="adhaar_no" className="form-label lead">Aadhar Number</label>
                                            <input type="text" className="form-control" id="adhaar_no" name="adhaarNo" value={formData.adhaarNo} onChange={handleChange} placeholder="Enter your Aadhar Number" required />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="state" className="form-label lead">State</label>
                                            <input type="text" className="form-control" id="state" name="state" value={formData.state} onChange={handleChange} placeholder="Enter your state" required />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col">
                                            <label htmlFor="city" className="form-label lead">City</label>
                                            <input type="text" className="form-control" id="city" name="city" value={formData.city} onChange={handleChange} placeholder="Enter your city" required />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="pincode" className="form-label lead">Pincode</label>
                                            <input type="text" className="form-control" id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Enter your pincode" required />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col">
                                            <label htmlFor="dob" className="form-label lead">Date of Birth</label>
                                            <input type="date" className="form-control" id="dob" name="dob" value={formData.dob} onChange={handleChange} max={getFifteenYearsAgoDate()} required />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="gender" className="form-label lead">Gender</label>
                                            <select className="form-select" id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
                                                <option>Select Gender</option>
                                                <option>Male</option>
                                                <option>Female</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <label htmlFor="email" className="form-label lead">Email</label>
                                            <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="mobile_no" className="form-label lead">Mobile Number</label>
                                            <input type="text" className="form-control" id="mobile_no" name="mobileNo" value={formData.mobileNo} onChange={handleChange} placeholder="Enter your mobile number" required />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col">
                                            <label htmlFor="password" className="form-label lead">Password</label>
                                            <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="confirmPassword" className="form-label lead">Confirm Password</label>
                                            <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" required />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col">
                                            <label htmlFor="otp" className="form-label lead">OTP</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" id="otp" name="otp" value={formData.otp} onChange={handleChange} placeholder="Enter OTP" required />
                                                <div>

                                                    <div className="small p-2">Don't have a OTP?</div>
                                                    <button type="button" className="btn btn-outline-secondary" onClick={handleGenerateOTP}>Generate OTP</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="btn-container p-2">
                                <button type="submit" className="btn btn-primary">Register</button>
                            </div>
                        </form>

                        <p className="text-center mt-4 mb-0">
                            Already have an account? <Link to="/login">Login</Link>
                        </p>
                    </div>
                </div>
            </Wrapper>
        </>
    );
}

const Wrapper = styled.section`
    .form-container {
        max-width: 800px; /* Adjust the width based on your preference */
        margin: auto;
        padding: 20px;
        background-color: red; /* Removed quotes around red */
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        margin-top: 50px;
    }
    
    .btn-container{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .form-control {
        width: 100%; /* Make the input fields fill the available space */
    }
`;

export default Register;
