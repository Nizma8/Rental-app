import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { checkDetailsApi, getHostFromProductsApi, viewProductApi } from "../Service/commonApi";
import { base_url } from "../Service/baseUrl";
import { GetHomeContext, RoleProvide } from "../ContextShare/ContextRole";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Skeleton from '@mui/material/Skeleton';
import ReviewCard from "./ReviewCard";
import Moving from "./Moving";
function ViewComponent() {
    const [view, setView] = useState({});
    const { setCheckUser, checkUser } = useContext(GetHomeContext);
    const { logine } = useContext(RoleProvide);
    const [hostsView, setHostsView] = useState({});
    const [loading,setLoading] = useState(true)
    
    const params = useParams();
    const navigate = useNavigate();
  
    const detailsChecks = async () => {
      if (!logine) {
        toast.warning("Please log in...!!");
      } 
      else {
        try {
          const reqBody = {
            productId: params.id,
            checkIn: checkUser.checkinDate,
            checkOut: checkUser.checkoutDate,
            guests: checkUser.guests,
          };
  
          const reqHeader = {
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
          };
          const response = await checkDetailsApi(reqBody, reqHeader);
  
          if (response.status === 200) {
            navigate('/checkout');
            setCheckUser({
              checkinDate: "",
              checkoutDate: "",
              guests: 1,
            });
          }
        }
         catch (error) {
          console.error("Error checking details:", error);
          toast.error("An error occurred while checking details. Please try again.");
        }

      }
    };
  
    const homeView = async () => {
      try {
        const response = await viewProductApi(params.id);
        setView(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        // Handle the error, show a message to the user, or redirect to an error page
      }
    };
  
    const hostView = async () => {
      try {
        const response = await getHostFromProductsApi(view?._id);
        setHostsView(response.data);
      } catch (error) {
        console.error("Error fetching host details:", error);
        // Handle the error, show a message to the user, or redirect to an error page
      }finally{
        setLoading(false)
      }
    };
    useLayoutEffect(()=>{
      setTimeout(()=>{
        setLoading(false)
      },2000)
    },[])
  
    useEffect(() => {
      hostView();
       }, [view]);
  
    useEffect(() => {
      homeView();
    }, [hostsView]);

  return (
    <>
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl overflow-hidden pt-28 shadow-md mb-10">
        <div className="md:h-full">
         {loading? <Skeleton variant="rounded" width={"100%"} height={"100%"} />: <img
            className="object-cover object-center w-full h-full border border-grey-500"
            src={`${base_url}/uploads/${view?.productImage}`}
            alt=""
          />}
        </div>
        <div className="p-6">

         {loading? <Skeleton variant="text"  />:<h2 className="text-xl font-semibold mb-2">{view?.name}<span className="ml-2">{view?.location}</span></h2>}
         {loading ? (
  <>
    <Skeleton variant="text" />
    <div className="bg-gray-200 py-1 rounded-lg mb-4 flex justify-center w-8">
      <Skeleton variant="text" />
    </div>
  </>
) : (
  <>
    <h2 className=" inline">Bed Count:</h2>
    <div className="bg-gray-200 py-1 rounded-lg mb-4 justify-center w-8 inline-flex ms-2">
      <span>{view?.bedCount}</span>
    </div>
  </>
)}

          <div className="flex items-center mb-4">
            <span className="mr-2">Amenities:</span>
            {loading? <Skeleton variant="rounded" width={"100%"} height={"100%"} />: view?.amenities?.map((amenity, index) => (
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
            <p className="text-gray-800 bg-white shadow-md py-3 px-4 cursor-pointer font-semibold">{`Price per Night:${view?.price}`}</p>
            <button className="bg-customPink text-white px-4 py-2 rounded" onClick={()=>detailsChecks(view._id)}>
              Checkout
            </button>
          </div>
         <div className="mt-8 w-100 border py-2 px-2 shadow-lg rounded flex ">
        { loading? <Skeleton variant="rounded" width={"100%"} height={60} />:  
         hostsView?.userId && <>
          <img src={hostsView?.userId?.image?`${base_url}/uploads/${hostsView?.userId.image}`:"https://as1.ftcdn.net/v2/jpg/06/56/50/82/1000_F_656508260_l1UtvG9rKQYp2QM0wXD1pRv8Tqu1peB6.jpg"} alt="" width={"50px"} height={"50px"} className=" rounded-full me-2"/>
              <h3 className="text-xl font-semibold mt-4 ">Hosted by {hostsView?.userId?.username} </h3>
         </>}
          
       
      </div>

        </div>

        
      </div>
<Moving productId ={params.id}/>
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
