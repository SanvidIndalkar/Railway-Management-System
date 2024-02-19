import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import userService from "../Services/user.service";
import { toast } from "react-toastify";
import Loading from "../Components/Loading/Loading";

const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location);
    console.log(location.state.email);
    const [formData, setFormData] = useState({email : "", newPassword:"", token:""});
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        setLoading(true);
        userService.resetPassword(formData)
        .then((response) => {
            console.log(response);
            toast.success(response.data.result);
            navigate('/login');
        })
        .catch((error) => {
            console.log(error);
            toast.error("Something went wrong...");
        })
        .finally(() => {
            setLoading(false);
        })
    }

    return (<>
        <Wrapper>
            {loading && <Loading/>}
                <div className="form p-4">
                    <div className="container p-4 ">
                        <div className="form-container p-4 bg-light">
                            <h5 className="mb-3 btn-container p-4">Reset Password</h5>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-1 p-4">
                                    <label htmlFor="email" className="form-label lead">Email</label>
                                    <input type="email" className="form-control"
                                        name="email" value={formData.email}
                                        onChange={handleInputChange} placeholder="Enter your email" required />
                                </div>

                                <div className="mb-1 p-4">
                                    <label htmlFor="password" className="form-label lead">New Password</label>
                                    <input type="password" className="form-control"
                                        name="newPassword" value={formData.newPassword} id="password"
                                        onChange={handleInputChange} placeholder="Enter your password" required />
                                </div>
                                <div className="mb-1 p-4">
                                    <label htmlFor="password" className="form-label lead">Token</label>
                                    <input type="text" className="form-control"
                                        name="token" value={formData.token} id="token"
                                        onChange={handleInputChange} placeholder="Enter your token" required />
                                </div>

                                <div className="btn-container mb-2">
                                    <button type="submit" className="btn btn-primary">Reset Password</button>
                                </div>
                            </form>
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
export default ResetPassword;