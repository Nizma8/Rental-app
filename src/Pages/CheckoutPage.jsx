import React, { useContext, useEffect, useState } from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { ArrowForwardTwoTone } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import {
  editCheckinApi,
  editCheckoutApi,
  editguestApi,
  getChecksApi,
  requestBookingApi,
} from "../Service/commonApi";
import { GetHomeContext,  } from "../ContextShare/ContextRole";
import { base_url } from "../Service/baseUrl";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { PayPalButtons } from "@paypal/react-paypal-js";
import PayPalPayemnt from "../Components/PayPalPayemnt";
import ProfileComponent from "../Components/ProfileComponent";
import Skeleton from '@mui/material/Skeleton';

function CheckoutPage() {
  const { checkUser, setCheckUser,setPrice } = useContext(GetHomeContext);
  const [loading,setLoading] = useState(false)
  const[showProfile,setShowProfile] = useState(false)
  const [checkOutDetails, setCheckOutDetails] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [nightsStayed, setNightsStayed] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // const []
  const navigate = useNavigate();
  // edit 
  const handleCheckinEdit = async () => {
    const reqBody = {
      id: checkOutDetails._id,
      checkIn: checkUser.checkinDate,
    };
    try {
      const response = await editCheckinApi(reqBody);
      setCheckUser({
        ...checkUser,
        checkinDate: new Date(response.data.checkIn)
          .toISOString()
          .split("T")[0],
      });
      getuserCheckOut();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckoutEdit = async() => {
    const reqBody = {
      id: checkOutDetails._id,
      checkOut: checkUser.checkoutDate,
    };
    try {
      const response = await editCheckoutApi(reqBody);
      setCheckUser({
        ...checkUser,
        checkoutDate: new Date(response.data.checkOut)
          .toISOString()
          .split("T")[0],
      });
      getuserCheckOut();
    } catch (error) {
      console.log(error);
    }
  };

  const handleGuestsEdit = async() => {
    const reqBody = {
      id: checkOutDetails._id,
      guests: checkUser.guests,
    };
    try {
      const response = await editguestApi(reqBody);
      setCheckUser({
        ...checkUser,
        guests: response.data.guests
          
      });
      getuserCheckOut();
    } catch (error) {
      console.log(error);
    }
  };
  const handleRedirect = () => {
    handleClose()
    setShowButton(true)


  };
  const handleBookingRequest = async () => {
    

    const reqBody = {
      id: checkOutDetails._id,
    };

   await requestBookingApi(reqBody);
    
    // If booking is successful, setBookingSuccess(true);
  };
  const handleBookingRequests= async()=>{
    handleOpen();

  }
  
  // to get no of night spend
  const getNightsStayed = () => {
    const checkIn = new Date(checkOutDetails.checkIn);
    const checkOut = new Date(checkOutDetails.checkOut);

    // Calculate the time difference in milliseconds
    const timeDifference = checkOut.getTime() - checkIn.getTime();

    // Convert the time difference to days
    const nightsStayed = timeDifference / (1000 * 3600 * 24);

    return Math.ceil(nightsStayed); // Round up to the nearest whole number
  };
  // to get checkout details
  const getuserCheckOut = async () => {
    const reqHeader = {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    };

    try {
      setLoading(true)
      const response = await getChecksApi(reqHeader);
      if (response.status === 200) {
        const dataArray = Object.values(response);
        const latestCheckOutDetails =
          dataArray[0].populatedlist[dataArray[0].populatedlist.length - 1];

        // Calculate nights stayed
        const checkIn = new Date(latestCheckOutDetails.checkIn);
        const checkOut = new Date(latestCheckOutDetails.checkOut);
        const timeDifference = checkOut.getTime() - checkIn.getTime();
        const nightsStayedValue = Math.ceil(
          timeDifference / (1000 * 3600 * 24)
        );

        setCheckOutDetails(latestCheckOutDetails);
        setCheckUser({
          checkinDate: new Date(latestCheckOutDetails.checkIn)
            .toISOString()
            .split("T")[0],
          checkoutDate: new Date(latestCheckOutDetails.checkOut)
            .toISOString()
            .split("T")[0],
          guests: latestCheckOutDetails.guests,
        });

        setNightsStayed(nightsStayedValue);

        const totalPrice =
          nightsStayedValue *
          Number(checkUser.guests) *
          latestCheckOutDetails.productId.price;

        setTotalPrice(totalPrice);
        setPrice(totalPrice);
      }
    } catch (error) {
      console.error("Error fetching user checks:", error);
    }finally {
      setLoading(false);
    }
  };
  const handleBacktoHome=()=>{
  navigate('/')
  }

  useEffect(() => {
    getuserCheckOut();
  }, []); 
  return (
    <div className="container mx-5 px-5 pt-28">
      <div className="container mx-auto my-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Column 1: Checkout Details */}
          <div>
            <h1 className="text-2xl font-bold mb-4 cursor-pointer">
              Back to Home <ArrowForwardTwoTone onClick={handleBacktoHome}/>
            </h1>

            {/* Check-in Date */}
            <div className="mb-5 flex w-100 justify-around items-end">
              <div className=" w-3/4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Check-in Date:
                </label>
                <input
                  type="date"
                  value={checkUser.checkinDate}
                  onChange={(e) =>
                    setCheckUser({ ...checkUser, checkinDate: e.target.value })
                  }
                  className="border-2 border-gray-300 px-4 py-2 rounded w-full focus:outline-customPink "
                />
              </div>
              <button
                onClick={handleCheckinEdit}
                className="mt-2 bg-customPink text-white px-5 py-3 rounded h-5/6"
              >
                Edit
              </button>
            </div>

            {/* Check-out Date */}
            <div className="mb-5 flex w-100 justify-around items-end">
              <div className="w-3/4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Check-out Date:
                </label>
                <input
                  type="date"
                  value={checkUser.checkoutDate}
                  onChange={(e) =>
                    setCheckUser({ ...checkUser, checkoutDate: e.target.value })
                  }
                  className="border-2 border-gray-300 px-4 py-2 rounded w-full focus:outline-customPink"
                />
              </div>
              <button
                onClick={handleCheckoutEdit}
                className="mt-2 bg-customPink text-white px-5 py-3 rounded h-5/6"
              >
                Edit
              </button>
            </div>

            {/* Number of Guests */}
            <div className="mb-5 flex w-100 justify-around items-end">
              <div className="w-3/4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Number of Guests:
                </label>
                <input
                  type="text"
                  value={checkUser.guests}
                  onChange={(e) =>
                    setCheckUser({ ...checkUser, guests: e.target.value })
                  }
                  className="border-2 border-gray-300 px-4 py-2 rounded w-full focus:outline-customPink"
                />
              </div>
              <button
                onClick={handleGuestsEdit}
                className="mt-2 bg-customPink text-white px-5 py-3 rounded h-5/6"
              >
                Edit
              </button>
            </div>

           <button
              className="bg-customPink text-white py-2 px-2 rounded-md shadow-lg ml-4 mt-5 mb-6 "
              onClick={handleBookingRequests}
            >
              Request To Book
            </button>

          {
            showButton && <PayPalPayemnt name={checkOutDetails?.productId?.name} price ={totalPrice} handleBookingRequest={handleBookingRequest}/>
          }
          </div>

          {/* Column 2: Summary Card */}
          <Grid item xs={12} sm={6} md={5} xl={4} lg={3} marginX="50px">
      <Card className="border border-gray-300">
        <CardContent>
        <div className="mb-4 ">
        <h1 className="text-center font-bold text-xl mb-2">Property Details</h1>
      </div>
          {/* Section 1: Property Details */}
          <div className="mb-4">
           {loading? <Skeleton variant="rectangular" width={"100%"} height={192} />: 
            <img
              src={`${base_url}/uploads/${checkOutDetails?.productId?.productImage}`}
              alt="Property"
              className="w-full h-48 object-cover rounded"
            />}
          </div>

          <div className="mb-4 shadow-lg border-grey-500 border py-4 px-2">
            {
              loading?   <Skeleton variant="rectangular" width={"100%"} height={60} />: <div className="flex justify-between items-center">
              <h3 className="font-bold text-gray-500 text-lg">
                {checkOutDetails?.productId?.name}, {checkOutDetails?.productId?.location}
              </h3>
              <h3 className="font-bold text-gray-500 text-lg">
                Guests: {checkUser?.guests}
              </h3>
            </div>
            }
            {/* <h1 className="text-center font-bold text-xl mb-2">Your Home Details</h1> */}
           
          </div>

     

          {/* Section 3: Total Amount */}
          <div className="mb-4 shadow-lg border-grey-500 border py-4 px-2">
            {/* <h2 className="text-center font-bold text-xl mb-2">Total Price</h2> */}
           { loading? <Skeleton variant="rectangular"width={"100%"} height={60} />:  <div className="flex justify-between items-center">
              <h3 className="font-bold text-gray-500 text-lg">
                Price per Night: {checkOutDetails?.productId?.price}
              </h3>
              <h3 className="font-bold text-gray-500 text-lg">
                Nights Stayed: {nightsStayed}
              </h3>
            </div>}
          </div>

          <div className="mb-4 shadow-lg border-grey-500 border py-4 px-2">
            {/* <h2 className="text-center font-bold text-xl mb-2">Price Details</h2> */}
           { loading? <Skeleton variant="rectangular" width={"100%"} height={60} />: <div className="flex justify-between items-center">
              <h3 className="font-bold text-gray-500 text-lg">
                {checkOutDetails?.productId?.price} * {nightsStayed} * {checkUser?.guests}
              </h3>
              <h3 className="font-bold text-gray-500 text-lg">
                Total Price: {totalPrice}
              </h3>
            </div>}
          </div>
        </CardContent>
      </Card>
    </Grid>
          
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="booking-confirmation-modal"
        aria-describedby="booking-confirmation-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <ProfileComponent/>
         
          <Button
            onClick={handleRedirect}
            sx={{ mt: 2, backgroundColor: "#DE3163" }}
          >
            Confirm 
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default CheckoutPage;
