import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import './Header.css'

export const Header = ({setShowCart, cart={}, user}) =>{
    const location = useLocation();
    const[open, setOpen] = useState(false)

    const toggleMenu = () =>{
        setOpen(!open)
    }

    let content;
    if(location.pathname.includes('/dashboard')){
        content = (
            <div className="Header">
                <p>LOGO</p>
                <p>Hello {user.userName}</p>
            </div>
        )
    }else{
        content = (
            <>
            <div className="otherHeader">
                <span><p onClick={()=>setShowCart(false)}>Logo</p></span>
                <div className="cartAndMenu">
                    <span id="cart">
                        <p onClick={()=> setShowCart(true)}>Cart</p>
                        <small id='float'>{cart.length}</small>
                    </span>
                    <span id="menuSpan">
                        <p onClick={toggleMenu}>Menu</p>
                    </span>
                </div>
            </div>
            {open && (<div id="overlay">
             <ul className="overlay">
                 <li><p id="close" onClick={toggleMenu}>X</p></li>
                 <li><p>About</p></li>
                 <li><p>Contact Us</p></li>
             </ul>
         </div>)}
         </>
        )
    }
    return(
        <div className="MainContent">
            {content}
        </div>
    )
}