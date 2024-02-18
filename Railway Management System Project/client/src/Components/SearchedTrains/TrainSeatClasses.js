import React from "react";

import styled from "styled-components";

function TrainSeatclasses({trainClass}) {
    console.log(trainClass);
    const { name, totalSeats } = trainClass;
    console.log(name);
    return (
        <div className="col-lg-3 col-md-3 col-sm-3 big-container">
            <Wrapper>

            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col lead">
                            <p className="card-text">{name.substring(1)}</p>
                        </div>
                        <div className="col lead">
                            <p className="card-text"></p>
                        </div>
                    </div>
                    <div>
                        <p className="seats-available small text-muted">Total Capacity : {totalSeats}</p>
                    </div>
                </div>
            </div>

            </Wrapper>
        </div>

    );
}

const Wrapper = styled.div`
    .card-body{
        margin: 0px 2px 0px 2px;   
    }
`

export default TrainSeatclasses;