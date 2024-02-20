import React from 'react';

const AboutUs = () => {
  return (
    <div className="container mt-5">
      <h1 className="mb-4 fs-2">Welcome to Our React Railway Management System</h1>
      <p className="lead">
        Welcome to our React Railway Management System, where modern technology meets the efficiency of railway management. Our platform is designed to provide a seamless experience for users looking to book trains, access detailed information, and for administrators to efficiently manage train schedules and operations.
      </p>

      <h2 className="mt-5 mb-4 fs-3">Our Mission</h2>
      <p>
        At Our React Railway Management System, our mission is to revolutionize the way people interact with railway services. We aim to provide a user-friendly and intuitive platform that simplifies the process of booking and managing train journeys, ultimately enhancing the travel experience for passengers and streamlining operations for administrators.
      </p>

      <h2 className="mt-5 mb-4 fs-3">Built with Modern Technology</h2>
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title fs-3">React for Frontend</h3>
              <p className="card-text">We utilize React, a powerful JavaScript library for building user interfaces, to create a responsive and interactive experience for our users.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title fs-3">Spring Boot for Backend</h3>
              <p className="card-text">Our backend is powered by Spring Boot, a framework that simplifies the development of robust and scalable Java applications. With Spring Boot, we ensure fast and efficient data processing and management.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title fs-3">MySQL for Database</h3>
              <p className="card-text">We leverage MySQL, a popular open-source relational database management system, to store and manage the vast amount of data associated with train schedules, bookings, and user information.</p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="mt-5 mb-4 fs-2">User-Friendly Experience</h2>
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title fs-3">Smooth Booking Process</h3>
              <p className="card-text">Our platform offers a seamless booking process, allowing users to easily search for trains, view schedules, and book tickets with just a few clicks.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title fs-3">Detailed Information</h3>
              <p className="card-text">Passengers have access to comprehensive details about train services, including schedules, fares, seat availability, and more. This enables informed decision-making and ensures a hassle-free travel experience.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title fs-3">Email Notifications</h3>
              <p className="card-text">To keep users informed about their bookings and any updates regarding their journey, our system sends automatic email notifications with booking confirmations and other relevant information.</p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="mt-5 mb-4 fs-2">Administrator Tools</h2>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title fs-3">Efficient Train Management</h3>
              <p className="card-text">Administrators have access to powerful tools for managing train schedules, monitoring passenger loads, and optimizing service delivery. With real-time updates and intuitive interfaces, administrators can efficiently oversee train operations.</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title fs-3">Streamlined Communication</h3>
              <p className="card-text">Our platform facilitates seamless communication between administrators and passengers, ensuring timely updates and effective coordination. Administrators can easily communicate important information such as schedule changes or service disruptions to passengers.</p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="mt-5 mb-4 fs-2">Join Us Today</h2>
      <p>Whether you're a passenger planning your next journey or an administrator looking to streamline train operations, Our React Railway Management System has everything you need. Join us today and experience the future of railway management.</p>
    </div>
  );
}

export default AboutUs;
