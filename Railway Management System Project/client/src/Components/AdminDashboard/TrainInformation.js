
import React from 'react';
import trainData from '../../data/trainData'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
function TrainInformation({trains, selfTrains}) {

    return (<>

        {trains.map((trainInfo) => {
            const {
                id,
                trainNumber,
                trainName,
                admin,
                source,
                destination,
                sourceDepartureDate,
                destinationArrivalDate,
                sourceDepartureTime,
                destinationArrivalTime,
                totalStops,
                trainStatus
            } = trainInfo;
            return <tr>
                <td>
                    <p className='fs-5'>
                        {trainName}
                    </p>
                </td>
                <td>
                    <p className="fs-5">
                        {trainNumber}
                    </p>
                </td>
                <td>
                    <p className="fs-5">
                        {source.stationName}
                    </p>
                </td>
                <td>
                    <p className="fs-5">
                        {destination.stationName}
                    </p>
                </td>
                <td>
                    <p className="fs-5">
                        {sourceDepartureTime}
                    </p>
                </td>
                <td>
                    <p className="fs-5">
                        {destinationArrivalTime}
                    </p>
                </td>
                <td>
                    <p className="fs-5">
                        {sourceDepartureDate}
                    </p>
                </td>
                <td>
                    <p className="fs-5">
                        {trainStatus}
                    </p>
                </td>
                <td className="text-center">
    <Link to='/admin/train-info' state={{trainInfo}} className="btn btn-dark btn-sm p-2" style={{width:'7rem'}}>Get All Details</Link>
</td>
<td className="text-center">
    {selfTrains &&
        <Link to='/admin/edit-train' state={{trainInfo}} className="btn btn-dark btn-sm p-2"  style={{width:'7rem'}}>Edit</Link>
    }
</td>
            </tr>
        })}
    </>);

}



export default TrainInformation;