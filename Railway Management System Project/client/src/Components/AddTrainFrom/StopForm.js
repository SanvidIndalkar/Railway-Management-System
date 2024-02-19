import React, { useState, useEffect } from "react";

const StopForm = ({ index, formData, setFormData, allStations, minDate, maxDate, minTime, maxTime }) => {
    
    const [loading, setLoading] = useState(false);
    const [stopFormData, setStopFormData] = useState({
        station: { id: 0 },
        sequence: index + 1,
        arrivalDate: "",
        departureTime: ""
    });


    useEffect(() => {
        // Update formData when stopFormData changes
        setLoading(true);
        setFormData(prevState => ({
            ...prevState,
            stops: [
                ...prevState.stops.slice(0, index),
                stopFormData,
                ...prevState.stops.slice(index + 1)
            ]
        }));
        setLoading(false);
    }, [stopFormData]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        // If the input is for station selection
        if (name === "station") {
            // Find the selected station object
            const selectedStation = allStations.find(station => station.id === parseInt(value));
            // Set the selected station in stopFormData
            setStopFormData({ ...stopFormData, station: selectedStation });
        } else {
            // For other inputs, directly set the value
            setStopFormData({ ...stopFormData, [name]: value });
        }
    };

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">Stop {index + 1}</h5>
                <div className="mb-3">
                    <label htmlFor={`station${index}`} className="form-label">Station</label>
                    <select
                        className="form-select"
                        id={`station${index}`}
                        name="station"
                        value={stopFormData.station.id}
                        onChange={handleInputChange}
                        required // Adding required attribute
                    >
                        <option value="">Select station</option>
                        {allStations.map((station) => (
                            <option key={station.id} value={station.id}>
                                {station.stationName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor={`arrivalDate${index}`} className="form-label">Arrival Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id={`arrivalDate${index}`}
                        name="arrivalDate"
                        value={stopFormData.arrivalDate}
                        onChange={handleInputChange}
                        required // Adding required attribute
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor={`departureTime${index}`} className="form-label">Departure Time</label>
                    <input
                        type="time"
                        className="form-control"
                        id={`departureTime${index}`}
                        name="departureTime"
                        value={stopFormData.departureTime}
                        onChange={handleInputChange}
                        required // Adding required attribute
                    />
                </div>
                {/* Add more fields as needed */}
            </div>
        </div>
    );
};

export default StopForm;
