//Page 1
import React from "react";
import styled from "styled-components";
import HomeSearch from "../Components/HomeComponents/HomeSearch";
import HomePage from "../Components/HomeComponents/HomePage";
import { Navbar } from "react-bootstrap";



function Home() {

    return (
        <>
        {/* <Navbar/> */}
            <HomePage/>
            <HomeSearch />
        </>
    );
}


export default Home;