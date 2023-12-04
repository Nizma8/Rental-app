import React, { useEffect, useState } from 'react'
import {  getUserHostedHomesApi} from '../Service/commonApi'
import { CardContent ,Card} from '@mui/material'
import { base_url } from '../Service/baseUrl'
import { useNavigate } from 'react-router-dom'


function HostDetails() {
    const [dataFromResponse,setDataFromResposne] = useState([])
    const navigate = useNavigate()
    const getUserHostedHomes =async()=>{
        const reqheader ={
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
 
        }
        const resposne = await getUserHostedHomesApi(reqheader)
        setDataFromResposne(resposne.data)
    }
    // to view each card
    const viewProduct = (id)=>{
        
            navigate(`/property/${id}`);
          console.log(id);
    }

    useEffect(()=>{
        getUserHostedHomes()
    },[])
  return (
    <div className='grid xl:grid-cols-3 gap-3 lg:mt-20 md:mt-20 sm:mt-20'>
    {dataFromResponse?.length>0?dataFromResponse?.map((item)=>{
        return(
            <Card sx={{maxWidth:"200",cursor:'pointer'}} key={item._id} onClick={()=>{viewProduct(item._id)}}>
            <CardContent>
             <img src={`${base_url}/uploads/${item.productImage}`} alt="" className=' h-3/4 object-cover' style={{maxHeight:"50px"}} />
              <h6 className=' font-bold' style={{fontSize:'12px'}}>{item.name}</h6>
            </CardContent>
           </Card>
        )
    }):<div className='text-center text-red-400'>No Rented Products</div> }
    </div>
  )
}

export default HostDetails