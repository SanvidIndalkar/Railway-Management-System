import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import userService from '../Services/user.service';
import adminService from "../Services/admin.service";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import UserContext from "../Contexts/UserContext"
import { Navbar } from "react-bootstrap";

const Login = () => {

    const location = useLocation();
    console.log(location);
    const previousUrl = location.state?.currentpath;

    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [isAdmin, setIsAdmin] = useState(false);
    // console.log("User : " + user);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCheckboxChange = (e) => {
        setIsAdmin(e.target.checked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isAdmin) {
            adminService.login(formData)
            .then((response) => {
                debugger;
                console.log(response);
                const token = response.data.result.jwt;
                const id = response.data.result.id;
                const firstName = response.data.result.firstName;
                const lastName = response.data.result.lastName;
                const role = response.data.result.role;
                if (token) {
                    setUser({
                        id, firstName, lastName, role, loggedIn: true
                    });
                    sessionStorage.setItem("token", token);
                }
                debugger;
                axios.defaults.headers.common[
                    "Authorization"] = `Bearer ${sessionStorage.getItem(token)}`;
                console.log("previousUrl : " + previousUrl);
                debugger;
                navigate(previousUrl);
                toast.success(response.data.message);

            })
            .catch((error) => {
                toast.error(`${error.response.data.message}`, {
                    position: "top-center",
                    autoClose: 1700
                });
            })
            return;
        }
        userService.login(formData)
            .then((response) => {
                debugger;
                console.log(response);
                const token = response.data.result.jwt;
                const id = response.data.result.id;
                const firstName = response.data.result.firstName;
                const lastName = response.data.result.lastName;
                const role = response.data.result.role;
                if (token) {
                    setUser({
                        id, firstName, lastName, role, loggedIn: true
                    });
                    sessionStorage.setItem("token", token);
                }
                debugger;
                axios.defaults.headers.common[
                    "Authorization"] = `Bearer ${sessionStorage.getItem(token)}`;
                console.log("previousUrl : " + previousUrl);
                debugger;
                navigate(previousUrl);
                toast.success(response.data.message);

            })
            .catch((error) => {
                toast.error(`${error.response.data.message}`, {
                    position: "top-center",
                    autoClose: 1700
                });
            })
    }

    return (
        <>
            {/* <Navbar/> */}
            <Wrapper>
                <div className="form p-4">
                    <div className="container p-4 ">
                        <div className="form-container p-4 bg-light">
                            <h5 className="mb-3 btn-container p-4">Login</h5>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-1 p-4">
                                    <label htmlFor="email" className="form-label lead">Email</label>
                                    <input type="email" className="form-control"
                                        name="email" value={formData.email}
                                        onChange={handleInputChange} placeholder="Enter your email" required />
                                </div>

                                <div className="mb-1 p-4">
                                    <label htmlFor="password" className="form-label lead">Password</label>
                                    <input type="password" className="form-control"
                                        name="password" value={formData.password} id="password"
                                        onChange={handleInputChange} placeholder="Enter your password" required />

                                    <div className="forgot-password-container forgot-pass p-3">
                                        <Link to="/forgot-password">Forgot Password?</Link>
                                    </div>
                                </div>

                                <div className="btn-container mb-2">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>

                                {/* Toggle button for admin login */}
                                <div className="form-check form-switch ms-2">
                                    <input className="form-check-input" type="checkbox" id="adminToggle"
                                        checked={isAdmin} onChange={handleCheckboxChange} />
                                    <label className={`form-check-label ${!isAdmin ? 'text-muted' : ''}`} htmlFor="adminToggle">Login as admin</label>
                                </div>
                            </form>

                            <p className="text-center mt-4 mb-0">
                                Don't have an account? <Link to="/register">Register</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </>
    );
}

const Wrapper = styled.section`
    .form-container {
        max-width: 600px;
        margin: auto;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        margin-top: 50px;
    }

    .btn-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .forgot-pass{
        position: relative;
        left: 70%;
    }
`;
export default Login;