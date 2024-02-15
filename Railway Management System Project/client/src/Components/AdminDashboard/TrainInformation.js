
import React from 'react';
import trainData from '../../data/trainData'
function TrainInformation() {

    return (<>

        {trainData.map((trainInfo) => {
            const {
                trainName,
                startDate,
                startStation,
                startTime,
                startDay,
                endDate,
                endStation,
                endTime,
                endDay,
                totalSeats,
                trainStops,
                trainSeats
            } = trainInfo;
            return <tr>
                <td>
                    <p>
                        {trainName}
                    </p>
                </td>
                <td>
                    <p>
                        {trainName}
                    </p>
                </td>
                <td>
                    <p>
                        {startStation}
                    </p>
                </td>
                <td>
                    <p>
                        {endStation}
                    </p>
                </td>
                <td>
                    <p>
                        {startTime}
                    </p>
                </td>
                <td>
                    <p>
                        {endTime}
                    </p>
                </td>
                <td>
                    <p>
                        {startDate}
                    </p>
                </td>
                <td>
                    <button className='btn btn-secondary'>Edit</button>
                </td>
            </tr>
        })}
    </>);
}

export default TrainInformation;