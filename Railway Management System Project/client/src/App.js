import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import React, { useState } from "react";
import AdminNavbar from "./Components/Navbar/AdminNavbar";
import Navbar from "./Components/Navbar/Navbar";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminTrainInfo from "./Pages/AdminTrainInfo";
import BookingDetails from "./Pages/BookingDetails";
import ConfirmBooking from "./Pages/ConfirmBooking";
import EditTrain from "./Pages/EditTrain";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import PassengerForms from "./Pages/PassengerForms";

import Register from "./Pages/Register";
import ScheduleTrain from "./Pages/ScheduleTrain";
import SearchedTrains from "./Pages/SearchedTrains";
import SearchedTrainsList from './Components/SearchedTrains/SearchedTrainsList';
import styled from 'styled-components';


function App() {

  const [role, setRole] = useState('user');

  const passengersData = [{age:"23",email: "",firstName: "Raj",from: "",gender: "male",lastName: "Indalkar",to: ""},
  {age:"52",email: "",firstName: "Mahesh",from: "",gender: "male",lastName: "Indalkar",to: ""},
  {age:"47",email: "",firstName: "Priti",from: "",gender: "female",lastName: "Indalkar",to: ""}]
  return (
    <>
    <Router>
      <div>
        {role === 'user' ? <Navbar /> : <AdminNavbar/> }
      
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/searched-trains" element={<SearchedTrains/>} />
          <Route path="/confirm-booking" element={<ConfirmBooking/>}/>
          <Route path='/passenger-forms' element={<PassengerForms/>}/>
          <Route path='/booking-details' element={<BookingDetails passengersData={passengersData} />}/>


          <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
          <Route path='/admin/train-info' element={<AdminTrainInfo/>}/>
          <Route path="/admin/schedule-train" element={<ScheduleTrain/>}/>
          <Route path='admin/edit-train' element={<EditTrain/>}/>

          
        </Routes>
      </div>
    </Router>
    
    {/* //User */}
      {/* <Navbar/> */}
      {/* <Home/> */}
      {/* <Login/> */}
      {/* <Register/> */}

      {/* <SearchedTrains/> */}
      {/* <ConfirmBooking/>   */}
      {/* <PassengerForms/> */}
      {/* <BookingDetails passengersData={passengersData}/> */}

    {/* //Admin */}
      {/* <AdminNavbar/> */}
      {/* <AdminTrainInfo/> */}
      {/* <AdminDashboard/> */}
      {/* <ScheduleTrain/> */}
      {/* <EditTrain/> */}


      {/* done */}


      
      
    </>
  );
}


export default App;
