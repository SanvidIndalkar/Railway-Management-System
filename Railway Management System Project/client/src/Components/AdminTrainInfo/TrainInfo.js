import React from "react";
import styled from "styled-components";

function TrainInfo({trainDetails}) {

    console.log(trainDetails);

    const {
        id,
        trainNumber,
        trainName,
        admin,
        source,
        destination,
        sourceDepartureDate,
        destinationArrivalDate,
        sourceDepartureTime,
        destinationArrivalTime,
        totalStops,
        trainStatus
      } = trainDetails;

    return ( 
        <Wrapper>
        <div className="big-container card container mt-4 p-1">
                <div className="card-body">
                    <h5 className="card-title p-3">{trainName}</h5>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <p>{sourceDepartureTime},{sourceDepartureDate}</p>
                                <p className="text-muted city-text">{source.stationName}</p>
                            </div>
                            <div className="col-md-6">
                                <hr className="line" />
                            </div>
                            <div className="col-md-3">
                                <p>{destinationArrivalTime},{destinationArrivalDate}</p>
                                <p className="text-muted city-text">{destination.stationName}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
     );
}



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
        box-shadow: -5px 5px 10px rgba(0, 0, 0, 0.3)
    }
    .btn-pad{
        padding: 8px 2px 12px 2px;
    }
    .big-container{
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
        margin-bottom: 2rem;
    }
`



export default TrainInfo;