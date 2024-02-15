import React from "react";

import styled from "styled-components";
import TrainSeatClasses from "./TrainSeatClasses";
import { Link } from "react-router-dom";

function SingleTrain({ train }) {

    const { trainName, startTime, endTime, startStation, endStation, startDay, endDay, seats, price } = train;
    return (
        <Wrapper>
            <div className="big-container card container mt-4 p-1">
                <div className="card-body">
                    <h5 className="card-title p-3">{trainName}</h5>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <p>{startTime},{startDay}</p>
                                <p className="text-muted city-text">{startStation}</p>
                            </div>
                            <div className="col-md-6">
                                <hr className="line" />
                            </div>
                            <div className="col-md-3">
                                <p>{endTime},{endDay}</p>
                                <p className="text-muted city-text">{endStation}</p>
                            </div>
                        </div>
                    </div>
                    <div className="container padding-info">
                        <div className="bottom-paragraphs">
                            {/* <p className="card-text seats">No. of seats available : {seats}</p>
                            <p className="card-text price">Price : Rs. {price}</p> */}
                            <TrainSeatClasses />
                            <TrainSeatClasses />
                            <TrainSeatClasses />
                            <TrainSeatClasses />
                        </div>
                    </div>

                    <div className="col-md-12 text-center mt-3">
                        <Link className="react-link" to="/confirm-booking" state={train}>
                        {/* <Link className="react-link" to={{pathname:"/confirm-booking",state:{data : trainName}}}> */}
                            <button className="btn">
                                <p>
                                    Book Now
                                </p>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}

//SC - Sleeper Class
//CC - Chair Car
//3A - Third AC(Normal)
//2A - Two Bunks AC
//1A - Special Room with two bunks ACA

const Wrapper = styled.section`


.card-title{
    font-size: 37px;
}

.bottom-paragraphs {
    display: flex;
    justify-content: space-between;
    
}
.price{
    padding-right: 5rem;
    }
    
    .line{
        margin-right: 150px;
    }
    
    .padding-info{
        background-color: #DADADA;
        padding: 10px 5px 0px 10px;
    }

    .city-text{
        margin-top: -1rem;
        font-size: 1.5rem;
    }
    .btn{
        height: 3.5rem;
        width: 11rem;
        border-radius: 50px;
        background-color: #189AD3;
        box-shadow: -5px 5px 10px rgba(0, 0, 0, 0.3);
        color: '#6b6b6b'
    }
    .btn-pad{
        padding: 8px 2px 12px 2px;
    }
    .big-container{
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
        margin-bottom: 2rem;
    }
    
    `

export default SingleTrain;