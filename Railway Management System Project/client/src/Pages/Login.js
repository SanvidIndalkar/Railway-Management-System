import React from "react";
import { Link } from "react-router-dom";
// import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
// import {Logo, FormRow} from '../components'

import styled from "styled-components";


const Login = () => {
    return <Wrapper>
        <form className="form p-4">

            <div className="container p-4 ">
                <div className="form-container p-4 bg-light">
                    <h5 className="mb-3 btn-container p-4">Login</h5>

                    <form>
                        <div className="mb-2 p-4">
                            <label for="email" className="form-label lead">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter your email"/>
                        </div>

                        <div className="mb-2 p-4">
                            <label for="password" className="form-label lead">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Enter your password"/>
                        </div>
                        <div className="btn-container p-2">

                        <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                    </form>
            <p className="p-4">
                Not a member yet?
                <div className="member-btn">
                    <p className="small">
                <Link className="react-link member-btn" to='/register'>
                    Register
                </Link>
                        </p>
                </div>
            </p>
                </div>
            </div>
        </form>
    </Wrapper>
}

const Wrapper = styled.section`

    .form-container {
      max-width: 600px;
      margin: auto;
      padding: 20px;
      /* background-color: '#e5e5e5'; */
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

export default Login