import React, { useContext } from "react";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import UserContext from "../../Contexts/UserContext";

function HomePage() {
  return (<Wrapper>
  </Wrapper>);
}

const Wrapper = styled.main`
    background: url('../../../assets/train2.jpg') center center/cover no-repeat;
    width: 100%;
    min-height: 40rem;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        height: 15rem;
    }

    @media (max-width: 576px) {
        height: 15rem;
    }

    @media (max-height: 900px) {
    min-height: 25rem; /* Adjust the min-height for small screens */
  }

    @media (max-height: 736px) {
    min-height: 20rem; /* Adjust the min-height for small screens */
  }

  @media (max-height: 400px) {
    min-height: 10rem; /* Adjust the min-height for even smaller screens */
  }

`

export default HomePage;