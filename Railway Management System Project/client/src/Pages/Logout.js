import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../Contexts/UserContext";
import { toast } from "react-toastify";

const Logout = () => {
    const navigate = useNavigate();
    const { user, setUser} = useContext(UserContext);

    useEffect(()=>{
        sessionStorage.clear();
        console.log("LoggedOut");
        setUser({
            loggedIn : false
        });
        toast.success("Logged Out Succesfully!");
        navigate("/");
    })
    return ( 
        <>
        </>
     );
}

export default Logout;