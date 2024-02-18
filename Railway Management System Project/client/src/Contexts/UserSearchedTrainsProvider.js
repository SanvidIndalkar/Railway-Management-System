import React, { useState } from 'react';
import UserSearchedTrains from './UserSearchedTrains';

const UserSearchedTrainsProvider = ({ children }) => {
    const [userSearchedTrains, setUserSearchedTrains] = useState([]);
    return <>
        <UserSearchedTrains.Provider value={{ userSearchedTrains, setUserSearchedTrains }}>
            {children}
        </UserSearchedTrains.Provider>
    </>;
}

export default UserSearchedTrainsProvider;