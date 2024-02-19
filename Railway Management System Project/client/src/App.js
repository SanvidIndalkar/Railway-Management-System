import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useContext, useEffect, useState } from "react";
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
import AddTrainForm from "./Pages/AddTrainForm";
import SearchedTrainsList from './Components/SearchedTrains/SearchedTrainsList';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logout from './Pages/Logout';
import UserContext from './Contexts/UserContext';
import PNRStatus from './Pages/PNRStatus';
import ForgotPassowrd from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';

function App() {
  debugger;
  const {user, setUser} = useContext(UserContext);
  const routeRoles = {
    '/confirm-booking': ['ROLE_USER'],
    '/passenger-forms': ['ROLE_USER'],
    '/booking-details': ['ROLE_USER'],
    '/admin/dashboard': ['ROLE_ADMIN'],
    '/admin/train-info': ['ROLE_ADMIN'],
    '/admin/schedule-train': ['ROLE_ADMIN'],
    '/admin/edit-train': ['ROLE_ADMIN'],
    '/admin/add-train': ['ROLE_ADMIN'],
  };

  const id = sessionStorage.getItem("id");
  const firstName = sessionStorage.getItem("firstName");
  const lastName = sessionStorage.getItem('lastName');
  const role = sessionStorage.getItem('role');

  const loggedIn = sessionStorage.getItem("loggedIn");

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("loggedIn");
    setUser({ id, firstName, lastName, role, loggedIn });
  }, []);

  return (
    <>
      <Router>
        {(user.loggedIn && user.role === "ROLE_ADMIN") ? <AdminNavbar /> : <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/searched-trains" element={<SearchedTrains />} />
          <Route path='/check-pnr' element={<PNRStatus/>}/>
          <Route path='/forgot-password' element={<ForgotPassowrd/>}/>
          <Route path='/reset-password' element={<ResetPassword/>}/>
          {/* Protected routes */}
          <Route path="/confirm-booking" element={<ConfirmBooking />} roles={routeRoles['/confirm-booking']} />
          <Route path="/passenger-forms" element={<PassengerForms />} roles={routeRoles['/passenger-forms']} />
          <Route path="/booking-details" element={<BookingDetails />} roles={routeRoles['/booking-details']} />

          {/* Admin routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} roles={routeRoles['/admin/dashboard']} />
          <Route path="/admin/train-info" element={<AdminTrainInfo />} roles={routeRoles['/admin/train-info']} />
          <Route path="/admin/schedule-train" element={<ScheduleTrain />} roles={routeRoles['/admin/schedule-train']} />
          <Route path="/admin/edit-train" element={<EditTrain />} roles={routeRoles['/admin/edit-train']} />
          <Route path="/admin/add-train" element={<AddTrainForm />} roles={routeRoles['/admin/add-train']} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
