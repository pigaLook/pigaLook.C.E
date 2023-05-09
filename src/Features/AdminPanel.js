import React,{useEffect, useState} from "react";
import './AdminPanel.css';
import axios from "axios";

export const AdminPanel = () => {
    const [selected, setSelected] = useState('categories');
    const [category, setCategory] = useState([])
    const [selectedSize, setSelectedSize] = useState('')
    const [newSize, setNewSize]=useState('')

    const[scolor, setscolor]=useState('')

    const [catName, setCatName] = useState('')
    const [catIcon, setCatIcon] = useState('')
    const [catColor, setCatColor] = useState('')

    const [ename, setename] = useState('')
    const [eicon, seteicon] = useState('')
    const [ecolor, setecolor] = useState('')

    useEffect(()=>{
      axios.get("/categories")
      .then((response)=>{setCategory(response.data); console.log(response.data)})
      .catch((err)=> console.log({err: err.message}))
    },[])

    const handleClick = (item) => {
      setSelected(item);
    };

    const handleSizeChange = (event) =>{
      setSelectedSize(event.target.value)
    }

    const addSize = async()=>{
      if(newSize.length === 0 && newSize.length < 5){
        setscolor('blue')
      }else{
        setscolor('green')
      }

      if(newSize.length > 0){
        await axios.post("/sizes/register", {name: newSize, category: selectedSize})
        .then((response)=>{
          console.log(response)
        }).catch((err)=> console.log({err: err.message}))
      }
    }

    const addCategory = async() =>{
      if(catName.length === 0 || catName.length > 8){
          setename('red')
      }else{
        setename('green')
      }
      if(catIcon.length === 0 || catIcon.length > 8){
        seteicon('red')
      }else{
        seteicon('green')
      }
      if(catColor.length === 0 || catColor.length > 8){
        setecolor('red')
      }else{
        setecolor('green')
      }
      
      if(catColor.length > 0 && catIcon.length > 0 && catName.length > 0){
        await axios.post("https://localhost:445/api/v1/categories/register", {name: catName, icon: catIcon, color: catColor })
        .then((response)=>{
          console.log(response)
        }).catch((err)=> console.log({err: err.message}))
      }
    }
  

    const Categories = ()=>{
      return(
        <div className="addCategory">
          <p>Add a new category</p>
          <input value={catName} onChange={(e)=>setCatName(e.target.value)} placeholder="Input a category name" type='text' style={{borderColor: ename}}  />
          <input onChange={e=> setCatIcon(e.target.value)} value={catIcon} placeholder="Input a category icon" type='text' style={{borderColor: eicon}}/>
          <input onChange={e=> setCatColor(e.target.value)}  value={catColor} placeholder="Input a category color" type='text'  style={{borderColor: ecolor}} />
          <button onClick={()=>addCategory}>Add Category</button>
        </div>
      )
    }

  const Sizes = () =>{
    return(
      <div className="addSize">
        <p>Add a new size</p>
        <div>
          <select value={selectedSize} onChange={(event)=>handleSizeChange(event)}>
              <option>Select a category</option>
              {category.map((size)=>{
                return(<option key={size.name} onChange={event=> event.target.value}>{size.name}</option>)
              })}
          </select>
        </div>
        <input value={newSize} onChange={(event)=>setNewSize(event.target.value)} style={{borderColor: scolor}} placeholder="Input a size" type='text' />
        <button onClick={(e)=>addSize(e)}>Add Size</button>
      </div>
    )
  }

  return (
      <div className='AdminPanelContainer'>
      <div className='sideBar'>
        <ul>
          <li onClick={() => handleClick('categories')}>Categories</li>
          <li onClick={() => handleClick('sizes')}>Sizes</li>
        </ul>
      </div>
      <div className='AdminPanelMenu'>
        {selected === 'categories' && <Categories />}
        {selected === 'sizes' && <Sizes />}
      </div>
    </div>
  )
}