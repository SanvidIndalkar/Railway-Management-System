import React, { useEffect, useState } from 'react';
import UserContext from './UserContext';
import stationService from '../Services/station.service';
import StationContext from './StationContext';

const StationContextProvider = ({ children }) => {
    const [allStations, setAllStations] = useState([]);

    useEffect(() => {
        stationService.getAllStations()
        .then((response) => {
          console.log(response);
          setAllStations(response.data.result);
        })
        .catch((error)=>{
          console.log(error);
          toast.error("Something went wrong while loading stations...")
        })
      },[])

    return <>
        <StationContext.Provider value={{ allStations, setAllStations }}>
            {children}
        </StationContext.Provider>
    </>;
}

export default StationContextProvider;