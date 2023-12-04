import React, { useEffect, useState } from 'react'
import { getAllusersApi } from '../Service/commonApi'

import { CheckCircleOutline, Close } from '@mui/icons-material'

function List() {
    const [dataFromResponse,setDataFromResponse] = useState([])
    const togetAllUsers = async()=>{
        const reqHeader={
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
}
        const resposne =await  getAllusersApi(reqHeader)
        setDataFromResponse(resposne.data);
    }
    useEffect(()=>{
        togetAllUsers()
    },[])
  return (
    <div>
       <table className='ml-5 shadow'>
    <thead className='border-b-2 bg-white'>
      <tr className=' rounded-t-xl'>
        <th className='pr-10 pl-10 py-4'>No</th>
        <th className='pr-10 py-4'>Homes</th>
        <th className='pr-10 py-4'>Host</th>
      </tr>
    </thead>
    <tbody>
    {dataFromResponse?.length>0?dataFromResponse?.map((item, index) => (
            <tr key={item._id} className=' hover:bg-gray-300 rounded-b-lg'>
              <td className='px-10 py-4 text-sm'>{index + 1}</td>
              <td className='pr-10 py-4 text-sm'>{item.username}</td>
              <td className='pr-10 py-4 text-sm'>{
                item.role.includes("host")?<CheckCircleOutline className=' text-green-500'/>:<Close className='text-red-500'/>
              }</td>
            </tr>
          )):<tr><td className='pl-10 py-4 text-red-800 font-bold'>No</td><td className=' py-4 text-red-800 font-bold'> Bookings</td><td className='pr-10 py-4  text-red-800 font-bold'>!!</td></tr>
        }
    </tbody>
  </table> 
    </div>
  )
}

export default List