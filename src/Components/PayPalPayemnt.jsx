import { PayPalButtons } from '@paypal/react-paypal-js';
import React, { useContext, useEffect, useState } from 'react'
import { base_url } from '../Service/baseUrl';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { GetHomeContext } from '../ContextShare/ContextRole';

function PayPalPayemnt({name,price,handleBookingRequest}) {
    const [success,setSuccess] = useState(false)
    const {checkUser,setCheckUser}= useContext(GetHomeContext)
    const navigate = useNavigate()
console.log(price);
    const createOrder = async (data) => {
        try {
          const response = await fetch(`${base_url}/my-server/create-paypal-order`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              totalAmount: price,
            }),
          });
    
          if (!response.ok) {
            throw new Error(`Failed to create PayPal order: ${response.status} ${response.statusText}`);
          }
    
          const order = await response.json();
          return order.orderID;
        } catch (error) {
          console.error('Error creating PayPal order:', error.message);
          throw error;
        }
      };
    
      const onApprove = async (data) => {
        try {
          const response = await fetch(`${base_url}/my-server/capture-paypal-order`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              orderID: data.orderID,
            }),
          });
    
          if (!response.ok) {
            throw new Error(`Failed to capture PayPal order: ${response.status} ${response.statusText}`);
          }
    
          setSuccess(true);
          return await response.json();
        } catch (error) {
          console.error('Error capturing PayPal order:', error.message);
          throw error;
        }
      };
    
      useEffect(() => {
        if (success) {
          toast.success('Transaction Successful!!!');
          handleBookingRequest()
          setCheckUser({
            checkinDate: "",
            checkoutDate: "",
            guests: 1,
          });
          navigate('/')
        }
      }, [success]);
    
      return (
        <div>
          <PayPalButtons
            createOrder={(data, actions) => createOrder(data, actions)}
            onApprove={(data, actions) => onApprove(data, actions)}
          />
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
        theme="light"
      />
        </div>
      );
}

export default PayPalPayemnt