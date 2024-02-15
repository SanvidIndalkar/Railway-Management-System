import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

function Register() {
    return (<Wrapper>
        <div className="container p-1">
            <div className="form-container p-3 bg-light">
                <h5 className="mb-2 p-3 btn-container">Register</h5>

                <form>
                    <div className="mb-1 p-3">
                        <label for="username" className="form-label lead">Username</label>
                        <input type="text" className="form-control" id="username" placeholder="Enter your username" />
                    </div>

                    <div className="mb-1 p-3">
                        <label for="email" className="form-label lead">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter your email" />
                    </div>

                    <div className="mb-1 p-3">
                        <label for="password" className="form-label lead">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Enter your password" />
                    </div>

                    <div className="mb-1 p-3">
                        <label for="confirmPassword" className="form-label lead">Confirm Password</label>
                        <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm your password" />
                    </div>

                    <div className="btn-container p-2">

                        <button type="submit" className="btn btn-primary">Register</button>
                    </div>
                </form>
                <p className="p-4 text-muted">
                    Already a member?
                    <div className="member-btn">
                        <Link className="react-link" to='/login'>
                        <p className="small">
                            Login
                        </p>
                        </Link>
                    </div>
                </p>
            </div>
        </div>
    </Wrapper>);
}

const Wrapper = styled.section`

    .form-container {
      max-width: 600px;
      margin: auto;
      padding: 20px;
      background-color: 'red';
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      margin-top: 50px;
    }

    .btn-container{
        display: flex;
        justify-content: center;
        align-items: center;
    }

`;

export default Register;