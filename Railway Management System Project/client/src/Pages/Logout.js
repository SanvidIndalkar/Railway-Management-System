import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../Contexts/UserContext";
import { toast } from "react-toastify";

const Logout = () => {
    const navigate = useNavigate();
    const { user, setUser} = useContext(UserContext);

    useEffect(() => {
        try {
            sessionStorage.clear();
            console.log("LoggedOut");
            setUser({
                loggedIn: false
            });
            toast.success("Logged Out Successfully!");
            navigate("/");
        } catch (error) {
            console.error("Error occurred during logout:", error);
            toast.error("An error occurred during logout. Please try again later.");
        }
    }, []);
    return ( 
        <>
        </>
     );
}

export default Logout;