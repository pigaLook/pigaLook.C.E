import React from "react";
import './Payment.css';

export const Payments = () =>{
    return(
        <div className="Payment">
            <div className="Balance">
                <p>Balance is : certain Amount</p>
            </div>
            <div className="Withdraw">
                <input type='text' placeholder='Input amount to withdraw'/>
                <button>Withdraw</button>
            </div>
        </div>
    )
}