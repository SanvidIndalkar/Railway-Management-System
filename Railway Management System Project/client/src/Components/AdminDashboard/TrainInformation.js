
import React from 'react';
import trainData from '../../data/trainData'
function TrainInformation({trains}) {

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
                    <p>
                        {trainName}
                    </p>
                </td>
                <td>
                    <p>
                        {trainNumber}
                    </p>
                </td>
                <td>
                    <p>
                        {source.stationName}
                    </p>
                </td>
                <td>
                    <p>
                        {destination.stationName}
                    </p>
                </td>
                <td>
                    <p>
                        {sourceDepartureTime}
                    </p>
                </td>
                <td>
                    <p>
                        {destinationArrivalTime}
                    </p>
                </td>
                <td>
                    <p>
                        {sourceDepartureDate}
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