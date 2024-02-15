//Page 2


import React from "react";
import styled from "styled-components";
import HomeSearch from "../Components/HomeComponents/HomeSearch";
import SearchedTrainsList from "../Components/SearchedTrains/SearchedTrainsList";
import { useLocation } from "react-router-dom";

function SearchedTrains() {

  const location = useLocation();
  const receivedData = location.state;
  console.log(receivedData);

  return (<Wrapper>
    <section>
      <br />
      <br />
      <HomeSearch searchData={receivedData}/>
    </section>


    <div className="searchedtrains-container">
      <div>
        <SearchedTrainsList />
      </div>
    </div>

  </Wrapper>);
}

const Wrapper = styled.main`
      /* background-color: #C0C0C0; //*/
      /* background-color: #f2ece9;   //nattu madhura sanvid */
      /* background-color: #C2D0F2;   //nattu madhura sanvid */
      /* background-color: #a2d2f2;   //nattu madhura sanvid */
      background-color: #c3e0f7;   //nattu madhura sanvid
  


    .searchedtrains-container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

@media (min-width: 576px) {
  .searchedtrains-container {
    max-width: 840px;
  }
}

@media (min-width: 768px) {
  .searchedtrains-container {
    max-width: 1020px;
  }
}

@media (min-width: 992px) {
  .searchedtrains-container {
    max-width: 1260px;
  }
}

@media (min-width: 1200px) {
  .searchedtrains-container {
    max-width: 1600px;
  }
}
`

export default SearchedTrains;