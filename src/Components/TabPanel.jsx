import React from 'react'
import { FaPlaneDeparture } from 'react-icons/fa'
import Category from './Category'
import PropCarousel from './PropCarousel'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { Stack } from '@mui/material';
function TabPanel() {
  
  
    const handleTab = (Category)=>{
    
    }
  return (
    <div className='ml-2 w-100 mb-2 '>
     <ul className='inline-flex'>
        <Stack direction="row" spacing={2} >
          <PropCarousel/>
           </Stack>
            
     </ul> 
      
          
    </div>
  )
}

export default TabPanel