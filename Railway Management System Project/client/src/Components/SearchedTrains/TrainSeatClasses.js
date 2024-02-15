import React from "react";

import styled from "styled-components";

function TrainSeatclasses() {
    return (
        <div className="col-lg-3 col-md-3 col-sm-3 big-container">
            <Wrapper>

            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col lead">
                            <p className="card-text">SL</p>
                        </div>
                        <div className="col lead">
                            <p className="card-text">Rs:1500</p>
                        </div>
                    </div>
                    <div>
                        <p className="seats-available small text-muted">Available 20</p>
                    </div>
                </div>
            </div>

            </Wrapper>
        </div>

    );
}

const Wrapper = styled.div`
    .card{
        margin: 0px 4px 0px 4px;   
    }
`

export default TrainSeatclasses;