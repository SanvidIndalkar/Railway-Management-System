import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import userService from '../Services/user.service';
import { toast } from 'react-toastify';
import Loading from '../Components/Loading/Loading';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to send email and get token goes here
        console.log(`Email: ${email}`);
        setLoading(true);
        userService.forgotPassword(email)
        .then((response) => {
            console.log(response);
            toast.success(response.data.result);
            navigate('/reset-password', { state: {email} });
        })
        .catch((error) => {
            console.log(error);
            toast.error("Something went wrong...");
        })
        .finally(() => {
            setLoading(false);
        })
    };

    return (
        <Wrapper>
            {loading && <Loading/>}
            <div className="form p-4">
                <div className="container p-4 ">
                    <div className="form-container p-4 bg-light">
                        <h5 className="mb-3 btn-container p-4">Reset Password</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-1 p-4">
                                <label htmlFor="email" className="form-label lead">Enter Email</label>
                                <input type="email" className="form-control"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email" required />
                            </div>
                            <div className="btn-container mb-2">
                                <button type="submit" className="btn btn-primary">Get Token</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Wrapper>
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

export default ForgotPassword;
