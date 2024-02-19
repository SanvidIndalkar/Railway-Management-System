import React, { useContext } from 'react';
import styled from 'styled-components'
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UserContext from '../../Contexts/UserContext';

const MyNavbar = () => {

    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);
    const location = useLocation(); 
    console.log(location.pathname);

    

    return (
        <Wrapper>
            <nav className="navbar navbar-expand-lg navbar-light bg-light container-fluid pad">
                <div className="container">
                    <a className="navbar-brand" href="#"><h2>
                        EazyRail
                    </h2>
                    </a>


                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link to="/" className="nav-link react-link"><p>
                                    Home
                                </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/about" className="nav-link react-link"><p>
                                    About
                                </p></Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/check-pnr" className="nav-link react-link"><p>
                                    PNR Status
                                </p></Link>
                            </li>
                            {user.loggedIn ?
                                (<li className="nav-item">
                                    <Link to="/logout" className="nav-link react-link"><p>
                                        Logout
                                    </p></Link>
                                </li>)
                                :
                                (<>
                                    <li className="nav-item">
                                        <Link to="/register" className="nav-link react-link"><p>
                                            Register
                                        </p></Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={{
                                            pathname: '/login',
                                            state : {currentpath : location.pathname}
                                        }} className="nav-link react-link"><p>
                                            Login
                                        </p></Link>
                                    </li>
                                </>
                                )
                            }

                        </ul>
                    </div>
                </div>
            </nav>
        </Wrapper>
    );
}

const Wrapper = styled.div`

    .navbar-brand{

        font-family: sans-serif;
        letter-spacing: 7px;
        font-style: italic;
    }

    .nav-item{
        margin: 0px 25px 0px 25px;
    }
    
    .pad{
       padding: 2rem 3rem 2rem 3rem;
       
       @media (max-width: 600px) {
           padding: 2rem 4rem 1rem 4rem; /* Adjust the padding for smaller heights */
        }
        
        @media (max-width: 400px) {
            padding: 2rem 3rem 1rem 3rem; /* Adjust the padding for even smaller heights */
        }
       
       @media (max-height: 600px) {
           padding: 2rem 4rem 1rem 4rem; /* Adjust the padding for smaller heights */
        }
        
        @media (max-height: 400px) {
            padding: 0.5rem 3rem 1rem 3rem; /* Adjust the padding for even smaller heights */
        }
    }
`


export default MyNavbar;
