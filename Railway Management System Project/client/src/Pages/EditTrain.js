import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import trainService from '../Services/train.service'
import { toast } from "react-toast";
import Loading from '../Components/Loading/Loading'

const EditTrain = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { id, trainNumber, trainName } = location.state.trainInfo;

    // State to store the updated trainName and trainNumber
    const [updatedTrainName, setUpdatedTrainName] = useState(trainName);
    const [updatedTrainNumber, setUpdatedTrainNumber] = useState(trainNumber);

    // Handler function to update the trainName state
    const handleTrainNameChange = (e) => {
        setUpdatedTrainName(e.target.value);
    };

    // Handler function to update the trainNumber state
    const handleTrainNumberChange = (e) => {
        setUpdatedTrainNumber(e.target.value);
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        trainService.editTrain(id,{trainName : updatedTrainName, trainNumber : updatedTrainNumber})
        .then((response) => {
            toast.success(response.data.message);
            navigate('/admin/dashboard')
        })
        .catch((error) => {
            toast.error("Something went wrong...");
        })
        .finally(() => {
            setLoading(false);
        })
        // Add logic to submit updated values to the backend
    };

    return (
        <div className="container mt-5">
            {loading && <Loading/>}
            <h2 className="mb-4">Edit Train</h2>
            <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
                <div className="mb-3">
                    <label htmlFor="trainName" className="form-label">Train Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="trainName"
                        value={updatedTrainName}
                        onChange={handleTrainNameChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="trainNumber" className="form-label">Train Number:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="trainNumber"
                        value={updatedTrainNumber}
                        onChange={handleTrainNumberChange}
                    />
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
    );
};

export default EditTrain;
