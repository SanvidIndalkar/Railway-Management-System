import React from "react";
import styled from "styled-components";

function PassengersInfo({ passengersDetails }) {

    return (
        <Wrapper>
            <h5 className="table-heading">Passengers Details</h5>

            <div className="container">

                <div className="table m-4">

                    <table className="table-responsive table-bordered">
                        <thead>
                            <tr>

                            <th className="p-4">
                                    <p>
                                        PNR
                                    </p>
                                </th>
                                <th className="p-4">
                                    <p>
                                        Name
                                    </p>
                                </th>
                                <th className="p-4">
                                    <p>
                                        Age
                                    </p>
                                </th>
                                <th className="p-4">
                                    <p>
                                        Gender
                                    </p>
                                </th>
                                <th className="p-4">
                                    <p>
                                        Email
                                    </p>
                                </th>
                                <th className="p-4">
                                    <p>
                                        From
                                    </p>
                                </th>
                                <th className="p-4">
                                    <p>
                                        To
                                    </p>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="p-4 m-4">
                        {passengersDetails.map((passenger) => {
                                const {
                                    PNR,
                                    firstName,
                                    lastName,
                                    age,
                                    gender,
                                    from,
                                    to,
                                    email
                                } = passenger;
                                return (<tr>
                                    <td><p>
                                        {PNR}
                                    </p>
                                    </td>
                                    <td><p>
                                        {firstName + " " + lastName}
                                    </p>
                                    </td>
                                    <td><p>
                                        {age}
                                    </p>
                                    </td>
                                    <td><p>
                                        {gender}
                                    </p>
                                    </td>
                                    <td><p>
                                        {email}
                                    </p>
                                    </td>
                                    <td><p>
                                        {from}
                                    </p>
                                    </td>
                                    <td><p>
                                        {to}
                                    </p>
                                    </td>
                                </tr>)
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </Wrapper>
    );
}



const Wrapper = styled.section`

    .container{
        margin-left: 20rem;
    }
    .table-heading{
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 50px;
    }
    th{
        letter-spacing: 3px;
    }
    td{
        padding: 5px 20px 0px 20px;
    }

`

export default PassengersInfo;