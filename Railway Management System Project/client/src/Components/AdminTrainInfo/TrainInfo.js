import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import styled from "styled-components";
import trainService from "../../Services/train.service";
import Loading from "../Loading/Loading";

function TrainInfo({ trainDetails }) {

    console.log(trainDetails);

    const getDay = (currentDate) => {
        const date = new Date(currentDate);
        const dayNumber = date.getDay(); // Get the day of the week as a number
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayName = daysOfWeek[dayNumber];
        return dayName;
    }

    const getHoursAndMinutes = (currentTime) => {
        const [hours, minutes] = currentTime.split(":").slice(0, 2);
        return hours + ":" + minutes;
    }

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
        trainStatus,
    } = trainDetails;
    const [loading, setLoading] = useState(false);
    const [stops, setStops] = useState([]);
    useEffect(() => {
        setLoading(true);
        trainService.findTrainAllDetails(id)
            .then((response) => {
                console.log(response.data.result);
                setStops(response.data.result.stops);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [])

    const getMonthDate = (dateString) => {
        const date = new Date(dateString);
        const options = { month: 'long', year: 'numeric', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    return (
        <Wrapper>
            {loading && <Loading />}
            <div className="big-container card container mt-4 p-1">
                <div className="card-body">
                    <h5 className="card-title p-3">{trainName} --- <span className="text-muted fs-4">
                        {trainNumber}
                    </span>
                    </h5>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">

                                <p className="fs-5">{getHoursAndMinutes(sourceDepartureTime)},{getDay(sourceDepartureDate)}</p>
                                <p className="text-muted city-text">{source.stationName}</p>
                            </div>
                            <div className="col-md-6">
                                <hr className="line" style={{ width: "80%" }} />
                                <p className="routes" onClick={handleShow}>View Routes</p> {/* Add your link here */}
                                <hr className="line" style={{ width: "80%" }} />
                            </div>
                            <Modal show={showModal} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Routes</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <p>{source.stationName} : {getMonthDate(sourceDepartureDate)} <span>----</span>  {getHoursAndMinutes(sourceDepartureTime)}</p>
                                    {
                                        stops.map((route) => {
                                            return (<>
                                                <p> | </p>
                                                <p>{route.station.stationName} : {getMonthDate(route.arrivalDate)} <span>----</span>  {getHoursAndMinutes(route.arrivalTime)}</p>
                                            </>
                                            )
                                        })
                                    }
                                    <p> | </p>
                                    <p>{destination.stationName} : {getMonthDate(destinationArrivalDate)} <span>----</span>  {getHoursAndMinutes(destinationArrivalTime)}</p>
                                </Modal.Body>
                            </Modal>
                            <div className="col-md-3">
                                <p className="fs-5">{getHoursAndMinutes(destinationArrivalTime)},{getDay(destinationArrivalDate)}</p>
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

.routes{
    position: relative;
    left: 30%;
    color: #30839f;
    cursor: pointer;
}
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