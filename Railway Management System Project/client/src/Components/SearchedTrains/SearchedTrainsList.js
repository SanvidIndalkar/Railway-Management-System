import React from "react";
import styled from "styled-components";
import SingleTrain from "./SingleTrain";
import trains from '../../data/trainData';

function SearchedTrainsList() {
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
    return (<Wrapper>
        {trains.map((train) => {
            return <SingleTrain key={1} train={train} />
        })}


    </Wrapper>);
}

const Wrapper = styled.section`
    padding-bottom: 5rem;
`

export default SearchedTrainsList;