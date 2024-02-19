import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import TrainInformation from "../Components/AdminDashboard/TrainInformation";
import trainService from "../Services/train.service";
import UserContext from "../Contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Components/Loading/Loading";

function AdminDashboard() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [trains, setTrains] = useState([]);
    const [selfTrains, setSelfTrains] = useState(false);
    const [filterStatus, setFilterStatus] = useState("ALL"); // Default to showing all trains
    const { user, setUser } = useContext(UserContext);

    const findTrainByAdmin = () => {
        setLoading(true);
        trainService.getAllTrainsByAdmin(user.id)
            .then((response) => {
                console.log(response);
                setSelfTrains(true);
                setTrains(response.data.result);
            })
            .catch((error) => {
                console.log(error);
                toast.error("Something went wrong...");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const getAllTrains = () => {
        setLoading(true);
        trainService.getAllTrains()
            .then((response) => {
                console.log(response);
                setSelfTrains(false);
                setTrains(response.data.result);
            })
            .catch((error) => {
                console.log(error);
                toast.error("Something went wrong...");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getAllTrains();
    }, []);

    const handleFilterChange = (e) => {
        setFilterStatus(e.target.value);
    };

    const filteredTrains = trains.filter((train) => {
        if (filterStatus === "ALL") {
            return true; // Show all trains
        } else {
            return train.trainStatus === filterStatus; // Filter based on selected status
        }
    });

    return (
        <Wrapper>
            {loading && <Loading />}
            <div className="container">
                <div className="mt-5 text-center p-4">
                    <div className="p-4 btn-container">
                        <button type="button" className="btn btn-secondary m-4" onClick={getAllTrains}>
                            <p className="fs-5">All Trains</p>
                        </button>
                        <button type="button" className="btn btn-secondary m-4" onClick={findTrainByAdmin}>
                            <p className="fs-5">Trains Scheduled By Me</p>
                        </button>
                        <Link to="/admin/add-train" type="button" className="btn btn-secondary m-4">
                            <p className="fs-5">Schedule Train</p>
                        </Link>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="filterStatus" className="form-label">Filter by Status:</label>
                    <select className="form-select" id="filterStatus" value={filterStatus} onChange={handleFilterChange}>
                        <option value="ALL">All</option>
                        <option value="PENDING">Pending</option>
                        <option value="RUNNING">Running</option>
                        <option value="COMPLETED">Completed</option>
                    </select>
                </div>
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th><p className="fs-5">Train Name</p></th>
                                <th><p className="fs-5">Train Number</p></th>
                                <th><p className="fs-5">Source</p></th>
                                <th><p className="fs-5">Destination</p></th>
                                <th><p className="fs-5">Departure Time</p></th>
                                <th><p className="fs-5">Arrival Time</p></th>
                                <th><p className="fs-5">Date</p></th>
                                <th><p className="fs-5">Status</p></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <TrainInformation trains={filteredTrains} selfTrains={selfTrains} />
                        </tbody>
                    </table>
                </div>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.section`
    .btn {
        width: 400px;
        padding-top: 15px;
    }

    .btn-container {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    td {
        padding: 10px;
    }

    .form-select {
        width: 200px;
    }
`;

export default AdminDashboard;
