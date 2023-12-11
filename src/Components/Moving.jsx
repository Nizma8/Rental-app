import React, { useEffect, useState } from 'react'
import ReviewCard from './ReviewCard'
import { filterReviewsAPi } from '../Service/commonApi'

function Moving({productId}) {
  const [dataFromResponse,setDataFromResposne]=useState([])
  // console.log(productId);

  // to get reviewa
  const filterReview = async(Id)=>{
    
    const reqHeader ={
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
}
    const response = await filterReviewsAPi(Id,reqHeader)
    setDataFromResposne(response.data)
  }
 
  useEffect(()=>{
    filterReview(productId)
  },[productId])
  return (
    <div className='my-20 ml-32 w-[90%]'>
    {/* Corrected tag name to <Slider> */}
   
      <ReviewCard data={dataFromResponse} />
      


  </div>  )
}

export default Moving