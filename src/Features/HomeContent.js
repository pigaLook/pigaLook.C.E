import axios from "axios";
import React, {useState, useEffect} from "react";
import { Products } from '../Services/Services';
import './HomeContent.css';

export const HomeContent = ({setCart, cart}) =>{
    const [selectedOption, setSelectedOption] = useState('shoe');
    const[selectedSize, setSelectedSize] = useState('');
    const[selectProduct, setSelectProduct] = useState(false);
    const [item ,setItem ] = useState({})

    const [options, setOptions] = useState([])

    const [ shoeSize, setShoeSize ] = useState([])
    const [ jacketSize, setJacketSize ] = useState([])
    const [capSize, setCapSize]= useState([])

    useEffect(()=>{
        axios.get('/categories')
        .then((response)=> setOptions(response.data))
        .catch((err)=>console.log({err: err.message}))
    }, [])

    useEffect(()=>{
        axios.get('/sizes')
        .then((response)=> {
            let data = response.data;
            data.forEach(element => {
                if(element.category === 'shoe'){
                    setShoeSize([...shoeSize, element])
                }else if(element.category === 'jacket'){
                    setJacketSize([...jacketSize, element])
                }else if(element.category === 'cap'){
                    setCapSize([...capSize, element])
                }})})
        .catch((err)=>console.log({err: err.message}))
    }, [capSize, jacketSize, shoeSize])

    const handleChange = (event) =>{
        setSelectedOption(event.target.value);
    }

    const handlesizeChange = (event) =>{
        setSelectedSize(event.target.value);
    }

    const viewItem = (idx,item)=>{
        setItem({
            id: idx,
            name: item.name,
            brand: item.brand,
            images: item.images,
            price: item.price
        })
        setSelectProduct(true)
    }

    const addToCart = (item) => {
        setCart([...cart,item])
        console.log(cart)
    }

    let sizeSelected;
    if(selectedOption === 'shoe'){
        sizeSelected = (
            <div>
                <select value={selectedSize} onChange={handlesizeChange}>
                    <option value="" disabled>
                        Choose a shoe size [UK sizes]
                    </option>
                    {
                        shoeSize.map((size)=>{
                            return(<option key={size._id} value={size.name}>{size.name}</option>)
                        })
                    }
                </select>
            </div>
        )
    }

    if(selectedOption === 'cap'){
        sizeSelected = (
            <div>
                <select value={selectedSize} onChange={handlesizeChange}>
                    <option value="" disabled>
                        Choose cap size
                    </option>
                    {
                        capSize.map((size)=>{
                            return(<option key={size._id} value={size.name}>{size.name}</option>)
                        })
                    }
                </select>
            </div>
        )
    }

    if(selectedOption === 'jacket'){
        sizeSelected = (
            <div>
                <select value={selectedSize} onChange={handlesizeChange}>
                    <option value="" disabled>
                        Choose a jacket size
                    </option>
                    {jacketSize.map((size)=>{
                        return(<option key={size._id} value={size.name}>{size._id}</option>)
                    })}
                </select>
            </div>
        )
    }
    let viewProduct;
    if(selectProduct === false){
        viewProduct = (
            <div className='productsContainer'>
                {Products.map((item) => (
                <div key={item.id} className='productItem' onClick={() => {viewItem(item.id, item)}}>
                    <img src={item.images[0]} alt="prooduct" id="img"/>
                    <div className="productNamePrice">
                        <p>{item.name}</p>
                        <p>{item.price}</p>
                    </div>

                </div>
            ))}
            </div>
        )
    }else{
        viewProduct = (
            <div className='previewSelectedProduct'>
                <div className='previewedProductImage'>
                    {item['images'].map((item, i)=>(
                        <img key={i} id='previewedProductImage' src={item} alt='previewedProductImage'/>
                    ))}
                </div>
                <div className='moreInfo'>
                    <p>
                        Name: {item['name']}
                    </p>
                    <p>
                        Brand: {item['brand']}
                    </p>
                    <p>
                        Price: {item['price']}
                    </p>
                </div>
                <div className='addTocart'>
                    <button onClick={()=>{setSelectProduct(false)}}>back</button>
                    <button onClick={()=>{addToCart(item)}}>Add to cart</button>
                </div>
            </div>
        )
    }
    return(
    <div className="HomeContentCont">
        <div className='selectionSection'>
            <div>
                <select value={selectedOption} onChange={handleChange}>
                    <option value="" disabled>
                        Choose an category
                    </option>
                    {options.map((option)=>{
                        return(<option key={option.name} value={option.name}>{option.name}</option>)
                    }
                    )}
                </select>
            </div>
            <div>
                {sizeSelected}
            </div>
        </div>
        <div id="pd"></div>
        <div>
            {viewProduct}
        </div>
    </div>)
}