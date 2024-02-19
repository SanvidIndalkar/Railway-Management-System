import React from "react";
import { Spinner } from "react-bootstrap";
import styled from "styled-components";

const Loading = () => {
    return (
        <LoadingWrapper>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </LoadingWrapper>
    );
};

const LoadingWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export default Loading;