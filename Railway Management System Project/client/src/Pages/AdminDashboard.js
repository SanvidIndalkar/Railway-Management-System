import React, { useContext, useEffect, useState } from "react";

import styled from "styled-components";
import TrainInformation from "../Components/AdminDashboard/TrainInformation";
import trainService from "../Services/train.service"
import UserContext from "../Contexts/UserContext";

function AdminDashboard() {

    const [trains, setTrains] = useState([]);
    const { user, setUser} = useContext(UserContext);

    const findTrainByAdmin = () => {
        trainService.getAllTrainsByAdmin(user.id)
        .then((response) => {
            console.log(response);
            setTrains(response.data.result);
        })
        .catch((error) => {
            console.log(error);
            toast.error("Something went wrong...");
        })

    }

    const getAllTrains = () => {
        trainService.getAllTrains()
        .then((response) => {
            console.log(response);
            setTrains(response.data.result);
        })
        .catch((error) => {
            console.log(error);
            toast.error("Something went wrong...");
        })
    }

    useEffect(() => {
        getAllTrains();
    },[])

    return (<Wrapper>
        <div className="container">
            
            <div className="mt-5 text-center p-4">

                <div className="p-4 btn-container">
                    <button type="button" className="btn btn-primary m-4 p-3"
                    onClick={getAllTrains}>
                        <p>
                            All Trains
                        </p>
                    </button>
                    <button type="button" className="btn btn-secondary m-4 p-3"
                    onClick={findTrainByAdmin}>
                        <p>
                            Trains Scheduled By Me
                        </p>
                    </button>
                </div>
            </div>

            <div className="table">

                <table className="table-responsive table-bordered">
                    <thead>
                        <th>
                            <p>
                                Train Name
                            </p>
                        </th>
                        <th>
                            <p>
                                Train Number
                            </p>
                        </th>
                        <th>
                            <p>
                                Source
                            </p>
                        </th>
                        <th>
                            <p>
                                Destination
                            </p>
                        </th>
                        <th>
                            <p>
                                Source Departure Time
                            </p>
                        </th>
                        <th>
                            <p>
                                Destination Arrival Time
                            </p>
                        </th>
                        <th>
                            <p>
                                Date
                            </p>
                        </th>
                        <th>
                            
                        </th>
                    </thead>
                    <tbody className="p-4 m-4">
                        <TrainInformation trains = {trains}/>
                    </tbody>
                </table>
            </div>
        </div>
    </Wrapper>);
}

const Wrapper = styled.section`
    .btn{
        width: 300px;
    }

    .btn-container{
        display: flex;
        align-items: center;
        justify-content: center;
    }

    td{
        padding: 10px;
    }
`

export default AdminDashboard;