import React, {useState} from 'react';
import { Header } from './Header';
import './Home.css';
import { HomeContent } from '../Features/HomeContent';
import { Cart } from '../Features/Cart';

export const Home = () => {
    const [showCart, setShowCart] = useState(false)
    const [cart, setCart] = useState([])

    return(
        <div className='Home'>
            <Header setShowCart={setShowCart} cart={cart}/>
            <div id='space'>
                {showCart ? <Cart setShowCart={setShowCart} cart={cart} setCart={setCart} /> : <HomeContent setCart={setCart} cart={cart}/>}
            </div>
        </div>
    )
}