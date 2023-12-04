import React, { useContext, useEffect, useState } from 'react'
import { getUserBookedHomesAPi } from '../Service/commonApi'
import { GetHomeContext } from '../ContextShare/ContextRole';

function Tabl() {

   const [dataFromResponse, setDataFromResponse] = useState([]);
   

    
   const userBookedHomes = async () => {
     try {
       const reqHeader = {
         Authorization: `Bearer ${sessionStorage.getItem("token")}`,
       };
 
       const response = await getUserBookedHomesAPi(reqHeader);
 
       if (response.status === 200) {
         setDataFromResponse(response.data);
         console.log(response.data);
       } else {
         console.error("Error fetching user booked homes:", response.data);
       }
     } catch (error) {
       console.error("Error fetching user booked homes:", error.message);
     }
   };
   useEffect(()=>{
    userBookedHomes()
   },[])
   const calculateTotalPrice = (home) => {
    const checkinDate = new Date(home.checkIn);
    const checkoutDate = new Date(home.checkOut);
    const duration = (checkoutDate - checkinDate) / (1000 * 60 * 60 * 24); // Convert milliseconds to days

    const totalPrice = duration * home.productId.price * parseInt(home.guests, 10);
    return `$${totalPrice.toFixed(2)}`;
  };

  return (
  <>
  <table className='ml-5 shadow'>
    <thead className='border-b-2'>
      <tr className=' rounded-t-xl'>
        <th className='pr-10 pl-10 py-4'>No</th>
        <th className='pr-10 py-4'>Homes</th>
        <th className='pr-10 py-4'>Price</th>
      </tr>
    </thead>
    <tbody>
    {dataFromResponse?.length>0?dataFromResponse?.map((home, index) => (
            <tr key={home._id} className=' hover:bg-gray-300 rounded-b-lg'>
              <td className='px-10 py-4 text-sm'>{index + 1}</td>
              <td className='pr-10 py-4 text-sm'>{home.productId.name}</td>
              <td className='pr-10 py-4 text-sm'>{calculateTotalPrice(home)}</td>
            </tr>
          )):<tr><td className='pl-10 py-4 text-red-800 font-bold'>No</td><td className=' py-4 text-red-800 font-bold'> Bookings</td><td className='pr-10 py-4  text-red-800 font-bold'>!!</td></tr>
        }
    </tbody>
  </table>
  </>
  )
}

export default Tabl