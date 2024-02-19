import React, { useContext } from "react";
import styled from "styled-components";
import SingleTrain from "./SingleTrain";
import trains from '../../data/trainData';
import UserSearchedTrains from "../../Contexts/UserSearchedTrains";

function SearchedTrainsList(props) {
    

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