import React, { useState } from 'react';
import { UploadProduct } from '../Features/UploadProduct';
import { SoldProduct } from '../Features/SoldProducts';
import { Payments } from '../Features/Payments';
import './DashboardContent.css'

export const DashboardContent = ({user}) => {
  const [selected, setSelected] = useState('upload');
  const [activeUl, setActiveUl] = useState('')

  const handleClick = (item) => {
    setSelected(item);
    setActiveUl('gray')
  };

  return (
    <div className='Content'>
      <div className='sideBar'>
        <ul id='sidebarOptions'>
          <li style={{backgroundColor: activeUl}} onClick={() => handleClick('upload')}>Upload Products</li>
          <li style={{backgroundColor: activeUl}} onClick={() => handleClick('orders')}>Sold Product</li>
          <li style={{backgroundColor: activeUl}} onClick={() => handleClick('payments')}>Payments Made</li>
        </ul>
      </div>
      <div className='sideBarContent'>
        {selected === 'upload' && <div>{<UploadProduct user={user}/>}</div>}
        {selected === 'orders' && <div>{<SoldProduct user={user}/>}</div>}
        {selected === 'payments' && <div>{<Payments user={user}/>}</div>}
      </div>
    </div>
  );
};

