import React, { useContext, useState } from 'react'
import { FaPlaneDeparture } from 'react-icons/fa'
import Category from './Category'
import PropCarousel from './PropCarousel'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Stack } from '@mui/material';
import { GetHomeContext } from '../ContextShare/ContextRole';

function TabPanel() {
  const {homeData}= useContext(GetHomeContext)
  const filteredData = homeData.map(item=>item.chooseType).filter((data,index,array)=>array.indexOf(data)==index)

 
          
  return (
    <div className='ml-2 w-100 mb-2 '>
     <ul className='inline-flex  '>
        <Stack direction="row" spacing={2} >
         { 
         filteredData?filteredData.map((item,index)=>{
          return (
          <PropCarousel key={index} item={item}  />
          )
         }):"" }
           </Stack>
            
     </ul> 
                 
          
    </div>
  )
}

export default TabPanel