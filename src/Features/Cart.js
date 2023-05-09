import React, {useEffect, useState} from "react";
import './Cart.css';

export const Cart = ({cart, setCart, setShowCart})=>{
    const [pay, setPay] = useState(true)
    const [price, setPrice] =useState(0)
    const removeFromCart = (id)=>{
        const arr = cart.filter((item)=> item.id !== id);
        setCart(arr)
    }
    const payAndRemoveFromCart = () => {setShowCart(false); setCart([])}

    const handlePrice = () => {
        let ans = 0;
        cart.map((item) => {return(ans += item.price)})
        setPrice(ans)
    }
    useEffect(()=>{
        handlePrice();
    })
    const CartContainer = () => {
       return(
        <div className="CartContainer">
        <div className="cartDetails">
            {cart.map((item)=>{
                return(
                    <div key={item.id} className="cartInfo">
                        <div className="imageContainer">
                            <img src={item.images[0]} alt="product"/>
                        </div>
                        <div className="moreCartFunctions">
                            <p>{item.price}</p>
                            <button onClick={()=>{removeFromCart(item.id)}}>remove</button>
                        </div>
                    </div>
                )
            })}
        </div>
        {console.log(pay)}
        <div className="cartProcessing">
            <div className="cartProcessingItems">
                <p>The total amount is: {price}</p>
                <button onClick={()=>setPay(false)}>Check out</button>
            </div>
        </div>
    </div>
       )
    }
    const PayLocation = ({price}) => {
        return(
            <div className="PayLocation">
                <input type='number' placeholder='input your phoneNumber'/>
                <p>{price} is the amount you should pay</p>
                <div className="backConfirm">
                    <button onClick={()=>setPay(true)}>back</button>
                    <button onClick={payAndRemoveFromCart}>Pay</button>
                </div>
            </div>
        )
    }
    return(
        <div className="Cart-Container">
            {pay ? <CartContainer /> : <PayLocation price={price}/>}
        </div>
    )
}