import React from 'react';
import './lowerHeaderOne.css';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

const LowerHeaderOne = () => {
    return (
        <div className='lower-nav'>
            <span className='menu-icon'>
                <MenuOutlinedIcon style={{ fontSize: '24px' }} />
            </span>
            <span className='first-active'>All</span>
            <span>Promotions</span>
            <span>New Arrivals</span>
            <span>Collections</span>
            <span>Outerwear</span>
            <span>Dresses</span>
          
            <span>Hair</span>
            <span>Sale</span>


       
        </div>
    );
};

export default LowerHeaderOne;
