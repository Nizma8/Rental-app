import { PayPalButtons } from '@paypal/react-paypal-js';
import React, { useEffect, useState } from 'react'
import { base_url } from '../Service/baseUrl';


function PayPalPayemnt({name,price}) {
    const [success,setSuccess] = useState(false)
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
          alert('Transaction Successful!!!');
        }
      }, [success]);
    
      return (
        <div>
          <PayPalButtons
            createOrder={(data, actions) => createOrder(data, actions)}
            onApprove={(data, actions) => onApprove(data, actions)}
          />
        </div>
      );
}

export default PayPalPayemnt