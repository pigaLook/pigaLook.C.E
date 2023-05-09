import axios from "axios";
import React, {useEffect, useState} from "react";
import './UploadProduct.css';

export const UploadProduct = ({user}) =>{
    const[selectedShoeOption, setSelectedShoeOption] = useState('jacket');
    const[images, setImages] = useState([]);
    const[jaImages, setjaImages] = useState([])

    const [shoeBrand, setShoeBrand] = useState('')
    const [shoeName, setShoeName] = useState('')
    const [shoePrice, setShoePrice] = useState('')
    const [shoeSize, setShoeSize] = useState('')

    const [ jacketSize, setJacketSize  ] = useState('')
    const [ capSize, setCapSize]= useState('')

    const [eshoeBrand, seteShoeBrand] = useState('')
    const [eshoeName, seteShoeName] = useState('')
    const [eshoePrice, seteShoePrice] = useState('')
    const [eimage, seteImage] = useState('')

    const [categories, setCategory]=useState([])

    const [sizeShoes, setsizeShoes]=useState([])
    const [sizeJackets, setsizeJackets] = useState([])
    const [ sizeCaps, setSizeCaps]= useState([])

    const [jacapBrand, setJacapBrand]=useState('')
    const [jacapPrice, setJacapPrice]= useState('')

    const [ejacapbrand, setejacapbrand]= useState('')
    const [ejacapprice, setejacapprice] = useState('')



    const handleShoeUpload = async() =>{
        if(shoeBrand.length === 0 || shoeBrand.length > 10){
            seteShoeBrand('Name should be less than 10 letters')
        }else{
            seteShoeBrand('')
        }
        if(shoeName.length === 0 || shoeName.length > 10){
            seteShoeName('Name should be less than 10 letters')
        }else{
            seteShoeName('')
        }
        if(shoePrice.length === 0 || shoePrice.length > 4){
            seteShoePrice('Give a valid price')
        }else{
            seteShoePrice('')
        }
        if(images.length < 5 || images.length > 5){
            seteImage('There should be upto 5 images')
        }else{
            seteImage('')
        }
        if(shoeSize.length === ''){
            alert("Select a shoe size")
        }
        if(shoeBrand.length > 0 && shoeBrand.length < 10 & shoeName.length > 0 && shoeName.length < 10 && shoePrice.length > 0 && shoePrice.length < 10 && eimage === ''){
            let formData = new FormData();
            formData.append('image1', images[0]);
            formData.append('image2', images[1]);
            formData.append('image3', images[2]);
            formData.append('image4', images[3]);
            formData.append('image5', images[4]);
            // await axios.post("https://localhost:445/api/v1/products/register", {user: user._id, size: shoeSize, brand: shoeBrand, price: shoePrice, name: shoeName, formData})
            // .then((response)=>{
            //   console.log(response)
            // }).catch((err)=> console.log({err: err.message}))
            console.log(formData)
        }
    }

    const handleJacap = () =>{
        if(jacapBrand.length < 1){
            setejacapbrand("Input brand name")
            alert("Input brand name")
        }else{
            setejacapbrand('')
        }
        if(jacapBrand.length > 8){
            setejacapbrand(" Value should be less than 8")
        }else{
            setejacapbrand('')
        }
        if(jacapPrice.length < 1){
            setejacapprice('Input value')
        }else{
            setejacapprice('')
        }
        console.log(shoeSize, jacketSize, capSize)
    }

    const handleChange = (event)=>{
        setSelectedShoeOption(event.target.value)
    };

    const handlejasizeChange = (event)=>{
        setJacketSize(event.target.value)
    }

    const handlecapsizeChange = (event)=>{
        setCapSize(event.target.value)
    }

    const handlesizeChange = (event) =>{
        setShoeSize(event.target.value)
    }

    const handleFileSelect = (event)=>{
        setImages(Array.from(event.target.files));
    }

    const handleJaFileSelect = (event)=>{
        setjaImages(Array.from(event.target.files))
    }

    useEffect(()=>{
        axios.get('/categories')
        .then((response)=>{
            setCategory(response.data)
        })
        .catch((err)=>console.log({err: err.message}))
    },[])

    useEffect(()=>{
        axios.get('/sizes')
        .then((response)=>{
            let data = response.data;
            data.forEach(size => {
                if(size.category === 'shoe'){
                    setsizeShoes([...sizeShoes, size])
                }
                if(size.category === 'jacket'){
                    setsizeJackets([...sizeJackets, size])
                }
                if(size.category === 'cap'){
                    setSizeCaps([...sizeCaps, size])
                }
            });
        })
        .catch((err)=> console.log(err))
    },[sizeCaps,sizeJackets,sizeShoes])

    let sizeSection;
    if(selectedShoeOption === 'cap'){
        sizeSection = (
            <div>
                <select value={capSize} onChange={handlecapsizeChange}>
                    <option value='' disabled>
                        Choose cap size
                    </option>
                    {sizeShoes.map((size)=>{
                        return(<option key={size.name} value={size._id}>{size.name}</option>)
                    })}
                </select>
            </div>
        )
    }

    if(selectedShoeOption === 'jacket'){
        sizeSection = (
            <div>
                <select value={jacketSize} onChange={handlejasizeChange}>
                    <option value='' disabled>
                        Choose a jacket size
                    </option>
                    {sizeJackets.map((size)=>{
                        return(<option key={size.name} value={size._id}>{size.name}</option>)
                    })}
                </select>
            </div>
        )
    }

    if(selectedShoeOption === 'shoe'){
        sizeSection = (
            <div>
                <select value={shoeSize} onChange={handlesizeChange}>
                    <option value='' disabled>
                        Choose a shoe size [UK sizes]
                    </option>
                    {sizeShoes.map((size)=>{
                        return(<option key={size.name} value={size._id}>{size.name}</option>)
                    })}
                </select>
            </div>
        )
    }

    let uploadImageSection;
    if(selectedShoeOption === 'shoe'){
        uploadImageSection = (
            <><div className="UploadImages">
                <div className="browseFile">
                    <label>Input images:</label>
                    <input type="file" multiple onChange={(event) => handleFileSelect(event)} />
                </div>
                <div className="previewImage">
                    {images.map((image, index) => (
                        <img key={index} id='image' src={URL.createObjectURL(image)} alt="Selected" />
                ))}
                </div>
                <p>{eimage}</p>
                <div className="productDetails">
                    <input onChange={(e) => setShoeBrand(e.target.value)} value={shoeBrand} type='text' placeholder='product brand' />
                    <p>{eshoeBrand}</p>
                    <input onChange={(e) => setShoeName(e.target.value)} value={shoeName} type='text' placeholder="product name" />
                    <p>{eshoeName}</p>
                    <input onChange={(e) => setShoePrice(e.target.value)} value={shoePrice} type='text' placeholder="product price" />
                    <p>{eshoePrice}</p>
                </div>
                <div className="uploadButton">
                    <button onClick={handleShoeUpload}>Upload Product</button>
                </div>
            </div></>
        )
    }else{
        uploadImageSection = (
            <div className="firstDisplay">
                <p>Select the Category you wish to upload</p>
            </div>
        )
    }

    if(selectedShoeOption === 'jacket' || selectedShoeOption === 'cap'){
        uploadImageSection = (
            <div className="jacketOrCap">
                <div className="browseFile">
                    <label>Input images:</label>
                    <input type="file" multiple onChange={(event) => handleJaFileSelect(event)} />
                </div>
                <div className="previewImage">
                    {jaImages.map((image, index) => (
                        <img key={index} id='image' src={URL.createObjectURL(image)} alt="Selected" />
                    ))}
                </div>
                <div className="productDetails">
                    <input value={jacapBrand} onChange={(e) => setJacapBrand(e.target.value)} type='text' placeholder='product brand' />
                    <p>{ejacapbrand}</p>
                    <input value={jacapPrice} onChange={(e) => setJacapPrice(e.target.value)} type='text' placeholder="product price"/> 
                    <p>{ejacapprice}</p>
                </div>
                <div className="uploadButton">
                    <button onClick={handleJacap}>Upload Product</button>
                </div>
            </div>
        )
    }

    return(
        <div className="UploadSection">
            <div className="category">
                <div>
                    <select value={selectedShoeOption} onChange={handleChange}>
                        <option value="" disabled>
                            Select a category
                        </option>
                        {
                            categories.map((category)=>{
                                return(<option key={category.name}>{category.name}</option>)
                            })
                        }
                    </select>
                </div>
                <div>
                    {sizeSection}
                </div>
            </div>
            <div className="notCategory">
                {uploadImageSection}
            </div>
        </div>
    )
}