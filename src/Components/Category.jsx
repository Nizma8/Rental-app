import React from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TabPanel from './TabPanel';

function Category() {
  return (
    <div className='w-full  flex justify-between fixed z-10 bg-white -mt-3 pt-3'>
       <div className=' xl:w-5/6 overflow-x-auto no-scrollbar lg:w-5/6  md:w-2/3 sm:w-2/4 ml-12 '><TabPanel/> </div>
       <button className=' bg-customPink me-12 p-1 rounded shadow h-10 mt-5 '>
        <AddCircleOutlineIcon className='text-white '/> <span className='text-white'>Add Property</span>
       </button>
    </div>
  )
}

export default Category