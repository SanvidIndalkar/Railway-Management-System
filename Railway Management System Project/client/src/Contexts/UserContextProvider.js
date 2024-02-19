import React, { useState } from 'react';
import UserContext from './UserContext';

const UserContextProvider = ({ children }) => {
    const id = sessionStorage.getItem("id");
    const firstName = sessionStorage.getItem("firstName");
    const lastName = sessionStorage.getItem('lastName');
    const role = sessionStorage.getItem('role');
    const loggedIn = sessionStorage.getItem("loggedIn");
    const [user, setUser] = useState({ id, firstName, lastName, role, loggedIn });
    return <>
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    </>;
}

export default UserContextProvider;