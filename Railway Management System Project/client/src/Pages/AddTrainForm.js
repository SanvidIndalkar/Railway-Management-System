import React, { useContext, useState } from "react";
import styled from "styled-components";
import UserContext from "../Contexts/UserContext";
import StationContext from "../Contexts/StationContext";
import { toast } from "react-toast";
import StopForm from "../Components/AddTrainFrom/StopForm";
import { all } from "axios";
import { useNavigate } from "react-router-dom";
import trainService from '../Services/train.service'
import Loading from "../Components/Loading/Loading";

function AddTrainForm() {

  const [loading, setLoading] = useState(false);

  const { user, setUser} = useContext(UserContext);
  const navigate = useNavigate();
  if(!user.loggedIn){
    navigate('/login')
  }
  console.log(user);
  const { allStations, SetAllStations } = useContext(StationContext);

  const [formData, setFormData] = useState({
    trainNumber: 0,
    trainName: "",
    admin : {id : user.id},
    source: {
      id: 0,
      stationName: ""
    },
    destination: {
      id: 0,
      stationName: ""
    },
    sourceDepartureDate: "",
    destinationArrivalDate: "",
    sourceDepartureTime: "",
    destinationArrivalTime: "",
    totalStops: 0,
    stops: [],
    trainStatus: "PENDING",
    trainClasses: [{
      name: "_SL",
      totalSeats: 0
    }, {
      name: "_1A",
      "totalSeats": 0
    }, {
      name: "_2A",
      totalSeats: 0
    }, {
      name: "_3A",
      totalSeats: 0
    }]
  });

  const handleSourceChange = (e) => {
    console.log(e.target.value);
    const id = e.target.value;
    if (id === formData.destination.id) {
      toast.error("Source and Destination cannot be same");
      return;
    }
    setFormData({
      ...formData,
      source: {
        ...formData.source,
        id
      }
    });
  };

  const handleDestinationChange = (e) => {
    const id = e.target.value;
    if (id === formData.source.id) {
      toast.error("Source and Destination cannot be same");
      return;
    }
    setFormData({
      ...formData,
      destination: {
        ...formData.destination,
        id
      }
    });
  };

  const getAvailableDestinations = () => {
    // Filter out the selected source station from the available destinations
    return allStations.filter(station => station.id !== formData.source.id);
  };

  const getAvailableSources = () => {
    // Filter out the selected destination station from the available sources
    return allStations.filter(station => station.id !== formData.destination.stationName);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "sourceDepartureDate") {
      const selectedDate = new Date(value);

      if (selectedDate < threeDaysLater) {
        alert("Source Departure Date should be after 3 days from today.");
        return;
      }
      if (formData.destinationArrivalDate && selectedDate >= new Date(formData.destinationArrivalDate)) {
        alert("Source Departure Date should be before Destination Arrival Date.");
        return;
      }
    }
    if (name === "destinationArrivalDate" && value < formData.sourceDepartureDate) {
      alert("Destination Arrival Date should be after Source Departure Date.");
      return;
    }
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const temp = formData.stops;
    console.log(temp);
    const uniqueIds = new Set([
      formData.source.id,
      formData.destination.id,
      ...formData.stops.map(stop => stop.station.id) // Map the IDs if formData.stops is an array of objects
    ]);
  
    // Check if the size of the Set is greater than the total number of stops plus 2
    if (uniqueIds.size !== formData.stops.length + 2) {
      toast.error("Source, Destination, and Stop IDs must be unique.");
      return;
    }
  
    // Check if source and destination IDs are the same
    if (formData.source.id === formData.destination.id) {
      toast.error("Source and Destination cannot be the same.");
      return;
    }
  
    // Check if stop IDs match with source or destination ID
    if (formData.stops.some(stop => stop.id === formData.source.id || stop.id === formData.destination.id)) {
      toast.error("Stop IDs cannot match with Source or Destination ID.");
      return;
    }
  
    setLoading(true);
    trainService.addTrain(formData)
    .then((response) => {
      console.log(response);
      toast.success(response.data.message);
      navigate('/admin/dashboard')
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setLoading(false);
    })

    // Add your logic to handle form submission here
    console.log(formData);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed, so we add 1 to it
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleClassSeatsChange = (e, index) => {
    const { value } = e.target;
    console.log(formData);
    console.log(value);
    setFormData(prevState => ({
      ...prevState,
      trainClasses: prevState.trainClasses.map((trainClass, i) => {
        if (i === index) {
          return {
            ...trainClass,
            totalSeats: value
          };
        }
        return trainClass;
      })
    }));
  };

  const today = new Date();
  const threeDaysLater = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000); // Next three days
  const calculateFourDaysLater = (startDate) => {
    const fourDaysLater = new Date(startDate);
    fourDaysLater.setDate(fourDaysLater.getDate() + 4);
    return fourDaysLater;
  }
  const threeMonthsLater = new Date(today.getTime() + 3 * 30 * 24 * 60 * 60 * 1000); // Next three months
  console.log(threeDaysLater);
  console.log(threeMonthsLater);
  return (
    <Wrapper>
      {loading && <Loading/>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="trainNumber">Train Number</label>
          <input
            type="number"
            className="form-control"
            id="trainNumber"
            name="trainNumber"
            value={formData.trainNumber}
            onChange={handleChange}
            required // Add required attribute
          />
        </div>
        <div className="form-group">
          <label htmlFor="trainName">Train Name</label>
          <input
            type="text"
            className="form-control"
            id="trainName"
            name="trainName"
            value={formData.trainName}
            onChange={handleChange}
            required // Add required attribute
          />
        </div>
        <div className="form-group">
          <label htmlFor="sourceStation">Source Station</label>
          <select
            className="form-select"
            id="sourceStation"
            value={formData.source.id}
            onChange={handleSourceChange}
            required // Add required attribute
          >
            <option value="">Select source station</option>
            {getAvailableSources().map((station) => (
              <option key={station.id} value={station.id}>
                {station.stationName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="destinationStation">Destination Station</label>
          <select
            className="form-select"
            id="destinationStation"
            value={formData.destination.id}
            onChange={handleDestinationChange}
            required // Add required attribute
          >
            <option value="">Select destination station</option>
            {getAvailableDestinations().map((station) => (
              <option key={station.id} value={station.id}>
                {station.stationName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="sourceDepartureDate">Source Departure Date</label>
          <input
            type="date"
            className="form-control"
            id="sourceDepartureDate"
            name="sourceDepartureDate"
            min={formatDate(threeDaysLater)}
            max={formatDate(threeMonthsLater)}
            value={formData.sourceDepartureDate}
            onChange={handleChange}
            required // Add required attribute
          />
        </div>
        <div className="form-group">
          <label htmlFor="destinationArrivalDate">Destination Arrival Date</label>
          <input
            type="date"
            className="form-control"
            id="destinationArrivalDate"
            name="destinationArrivalDate"
            min={formData.sourceDepartureDate}
            max={formatDate(calculateFourDaysLater(formData.sourceDepartureDate))}
            value={formData.destinationArrivalDate}
            onChange={handleChange}
            required // Add required attribute
          />
        </div>
        <div className="form-group">
          <label htmlFor="sourceDepartureTime">Source Departure Time</label>
          <input
            type="time"
            className="form-control"
            id="sourceDepartureTime"
            name="sourceDepartureTime"
            value={formData.sourceDepartureTime}
            onChange={handleChange}
            required // Add required attribute
          />
        </div>
        <div className="form-group">
          <label htmlFor="destinationArrivalTime">Destination Arrival Time</label>
          <input
            type="time"
            className="form-control"
            id="destinationArrivalTime"
            name="destinationArrivalTime"
            value={formData.destinationArrivalTime}
            onChange={handleChange}
            required // Add required attribute
          />
        </div>
        <div className="form-group">
          <label htmlFor="totalStops">Total Stops</label>
          <input
            type="number"
            className="form-control"
            id="totalStops"
            name="totalStops"
            value={formData.totalStops}
            onChange={handleChange}
            required // Add required attribute
          />
          {parseInt(formData.totalStops) > 0 && (
            <div>
              {[...Array(parseInt(formData.totalStops))].map((_, index) => {
                if (index == 0) {
                  return <StopForm key={index} index={index} minDate={sourceDepartureDate}
                    maxDate={destinationArrivalDate} minTime={sourceDepartureTime}
                    maxTime={destinationArrivalTime} formData={formData}
                    setFormData={setFormData} allStations={allStations}
                  />
                }

                return <StopForm key={index} index={index} formData={formData}
                  setFormData={setFormData}
                  maxDate={destinationArrivalDate}
                  maxTime={destinationArrivalTime}
                  allStations={allStations} />
              }
              )}
            </div>
          )}
        </div>
        <div className="form-group">
          <label>Train Classes</label>
          {formData.trainClasses.map((trainClass, index) => (
            <div key={index}>
              <label htmlFor={`class-${trainClass.name}`}>{trainClass.name}</label>
              <input
                type="number"
                className="form-control"
                id={`class-${trainClass.name}`}
                name={`class-${trainClass.name}`}
                value={trainClass.totalSeats}
                onChange={(e) => handleClassSeatsChange(e, index)}
                required // Add required attribute if needed
              />
            </div>
          ))}
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 500px;
  margin: auto;
  padding: 20px;
`;

export default AddTrainForm;
