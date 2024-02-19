import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PassengersInfo from "../Components/AdminTrainInfo/PassengerInfo";
import TrainInfo from "../Components/AdminTrainInfo/TrainInfo";
import AdminNavbar from "../Components/Navbar/AdminNavbar";
import bookingService from "../Services/booking.service"
import Loading from "../Components/Loading/Loading";

function AdminTrainInfo() {
    
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    console.log(location);
    
    const trainDetails = location.state.trainInfo;
    

    const [passengers, setPassengers] = useState([]);
    useEffect(() => {

        setLoading(true);
        bookingService.bookingDetailsOfTrain(trainDetails.id)
        .then((response) => {
            console.log(response);
            console.log(response.data.result);
            setPassengers(response.data.result);
        })
        .catch((error) => {
            console.log(error.response.data.message)
        })
        .finally(() => {
            setLoading(false);
        })
    },[])    

    return ( <> {loading && <Loading/>}
    <div>
        <TrainInfo trainDetails={trainDetails}/>
    </div>
    <section>
        <PassengersInfo passengersDetails = {passengers}/>
    </section>
    </> );
}

export default AdminTrainInfo;