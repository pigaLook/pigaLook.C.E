import React from "react";
import './DashboardPage.css';
import { Header } from "./Header";
import { DashboardContent } from "./DashboardContent";

export const DashboardPage = ({user}) => {
    return(
    <div className="DashboardPage">
        <Header user={user}/>
        <div className="mainContent">
            <DashboardContent user={user}/>
        </div>
    </div>
    )
}