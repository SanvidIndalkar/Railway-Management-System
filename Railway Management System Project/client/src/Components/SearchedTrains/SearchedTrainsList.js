import React, { useContext } from "react";
import styled from "styled-components";
import SingleTrain from "./SingleTrain";
import trains from '../../data/trainData';
import UserSearchedTrains from "../../Contexts/UserSearchedTrains";

function SearchedTrainsList(props) {
    // const trains = [{
    //     trainName: "Shatabdi Express", startTime: "04:10",
    //     startStation: "Delhi",
    //     endStation: "Kalyan",
    //     endTime: "21:08", startDay: "Thu",
    //     endDay: "Fri", seats: 10,
    //     price: 500
    // },
    // {
    //     trainName: "Rajdhani Express", startTime: "14:10",
    //     startStation: "Pune",
    //     endStation: "Delhi",
    //     endTime: "22:08", startDay: "Tue",
    //     endDay: "Fri", seats: 14,
    //     price: 5000
    // },
    // {
    //     trainName: "Chennai Express", startTime: "14:10",
    //     startStation: "Pune",
    //     endStation: "Chennai",
    //     endTime: "22:08", startDay: "Tue",
    //     endDay: "Fri", seats: 14,
    //     price: 5000
    // }];

    const {userSearchedTrains} = useContext(UserSearchedTrains);

    return (<Wrapper>
        {userSearchedTrains.map((train,index) => {
            return <SingleTrain key={index} train={train} searchData = {props.searchData}/>
        })}
    </Wrapper>);
}

const Wrapper = styled.section`
    padding-bottom: 5rem;
`

export default SearchedTrainsList;