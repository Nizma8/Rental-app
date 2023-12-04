import React, { useContext, useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { checkDetailsApi, getHostFromProductsApi, viewProductApi } from "../Service/commonApi";
import { base_url } from "../Service/baseUrl";
import { GetHomeContext, RoleProvide } from "../ContextShare/ContextRole";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function ViewComponent() {
    const[view,setview]=useState({})
  const {setCheckUser,checkUser} = useContext(GetHomeContext)
  const {logine}= useContext(RoleProvide)
  const [hostsView,setHostsView] = useState({}) 
  const params = useParams();
const navigate = useNavigate()

const detailsChecks = async()=>{
  if(!logine){
    toast.warning("please Login...!!")
   }  else{
    const reqBody = {
      productId:params.id,
      checkIn:checkUser.checkinDate,
      checkOut:checkUser.checkoutDate,
      guests:checkUser.guests
    }
    const reqHeader ={
      "Authorization": `Bearer ${sessionStorage.getItem("token")}`
  
    }
    const response =await checkDetailsApi(reqBody,reqHeader)
    if(response.status===200){
      navigate('/checkout')
     setCheckUser({
      checkinDate:"",
     checkoutDate:"",
      guests:1
     })
     
    }
   }
  
}



const homeView =async()=>{
  const response = await viewProductApi(params.id)
    setview(response.data)
    
  }
  const hostView = async()=>{
    const resposne = await getHostFromProductsApi(view?._id)
    setHostsView(resposne.data);
  }
  useEffect(() => {
    homeView()
  }, [hostsView]);
  useEffect(() => {
    // Await hostView before logging
    const fetchData = async () => {
      await hostView();
      console.log(hostsView);
    };
    fetchData();
  }, [view]);
  return (
    <>
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl overflow-hidden pt-28 shadow-md">
        <div className="md:h-full">
          <img
            className="object-cover object-center w-full h-full border border-grey-500"
            src={`${base_url}/uploads/${view.productImage}`}
            alt=""
          />
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-2">{view.name},<span className="ml-2">{view.location}</span></h2>
          {/* <p className="text-gray-600 mb-2"></p> */}
          <p className="text-gray-700 mb-4">{view.type}</p>

          <div className="flex items-center mb-4">
            <span className="mr-2">Amenities:</span>
            {view?.amenities?.map((amenity, index) => (
            <span key={index} className="mr-2 bg-gray-200 px-2 py-1 me-2 rounded-lg">
              {amenity}
            </span>
          ))}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Check-in Date:
            </label>
            <input
              type="date"
              value={checkUser.checkinDate}
              onChange={(e)=>{setCheckUser({...checkUser,checkinDate:e.target.value})
              }}
              className="border-2 border-gray-300 px-4 py-2 rounded w-full focus:outline-customPink"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Check-out Date:
            </label>
            <input
              type="date"
              value={checkUser.checkoutDate}
              onChange={(e)=>{setCheckUser({...checkUser,checkoutDate:e.target.value})}}
              className="border-2 border-gray-300 px-4 py-2 rounded w-full  focus:outline-customPink"
            />
          </div>

          <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
              No of Guests:
            </label>
            <input
              type="number"
              value={checkUser.guests}
              onChange={(e)=>{setCheckUser({...checkUser,guests:e.target.value})}}
              className="border-2 border-gray-300 px-4 py-2 rounded w-full  focus:outline-customPink"
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-gray-800 bg-white shadow-md py-3 px-4 cursor-pointer font-semibold">{`Price per Night:${view.price}`}</p>
            <button className="bg-customPink text-white px-4 py-2 rounded" onClick={()=>detailsChecks(view._id)}>
              Checkout
            </button>
          </div>
         {hostsView?.userId &&( <div className="mt-8 w-100 border py-2 px-2 shadow-lg rounded flex ">
          
               <img src={hostsView?.userId?.image?`${base_url}/uploads/${hostsView?.userId.image}`:"https://as1.ftcdn.net/v2/jpg/06/56/50/82/1000_F_656508260_l1UtvG9rKQYp2QM0wXD1pRv8Tqu1peB6.jpg"} alt="" width={"50px"} height={"50px"} className=" rounded-full me-2"/>
            <h3 className="text-xl font-semibold mt-4 ">Hosted by {hostsView?.userId?.username} </h3>
          
       
      </div>)}

        </div>

        
      </div>
      <ToastContainer
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"/>
    </>
  );
}

export default ViewComponent;
