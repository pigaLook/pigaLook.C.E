import React,{ useState } from "react";
import { LoginPage } from "../Components/Log-in";
import './DashboardNavigation.css';
import { DashboardPage } from "../Components/DashboardPage";

export const DashboardNavigation = () =>{
    const[isLoggedIn, setIsLoggedIn] = useState(true)
    const[user, setUser] = useState({})
    return(
        <div className="Dashboard">
            {(user && isLoggedIn) ? <DashboardPage user={user}/> : <LoginPage setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>}
        </div>
    )
}