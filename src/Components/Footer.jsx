import { Facebook, Instagram, LinkedIn, Twitter } from '@mui/icons-material'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { FaTwitterSquare } from 'react-icons/fa'
import { SiGooglehome } from 'react-icons/si'
import { subsctribe } from '../Service/commonApi'

function Footer() {
const [email,setEmail] =useState("")
console.log(email);
const subscribeApi = async(email)=>{
    const reqBody ={
        email
    }
    const resposne = await subsctribe(reqBody)
    console.log(resposne);
}
    const icon = {
        hidden: {
          pathLength: 0,
          fill: "rgba(255, 255, 255, 0)"
        },
        visible: {
          pathLength: 1,
          fill: "rgba(255, 255, 255, 1)"
        }
      }
  return (
    <div className="bg-slate-200 text-white  w-full py-8 h-full position: fixed;
    bottom: 0">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-[90%]">
        {/* Column 1: Company Information */}
        <div className="mb-8">
         <div className=' inline-flex '>
             <SiGooglehome className='text-3xl me-2 text-customPink'/><h1 className="text-3xl font-semibold mb-4 text-customPink ">STAYSCAPE</h1>
             </div>
          <p className=" mb-2 text-black">Experience luxury and comfort with Stay Scape. Your perfect getaway!</p>
        </div>
        {/* Column 2: Subscribe to Newsletter */}

        <div>
          <h2 className=" text-gray-900 font-bold mb-4">Quick Links</h2>
          <ul className="list-none">
            <li className="mb-2  text-black">
              <a href="#">News</a>
            </li>
            <li className="mb-2  text-black">
              <a href="#">About</a>
            </li>
            {/* Add more links as needed */}
          </ul>

          {/* Social Media Icons */}
          <div className="flex mt-4">
            <a href="#" className="mr-4 text-customPink">
              <Facebook/>
            </a>
            <a href="#" className="mr-4 text-customPink">
             <Twitter/>
            </a>
            <a href="#" className="mr-4 text-customPink">
              <Instagram/>
            </a>
            <a href="#" className="mr-4 text-customPink">
              <LinkedIn/>
            </a>
            
          </div>
        </div>
        <div className="mb-8">
          <p className="text-gray-900 font-bold mb-2">Subscribe to our Newsletter</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}

              className="bg-white text-gray-800 py-2 px-4 rounded-l-md focus:outline-none"
            />
            <button className="bg-deep-orange-500 text-white px-4 py-2 rounded-r-md hover:bg-deep-orange-600 focus:outline-none bg-customPink"
            onClick={()=>{subscribeApi(email)}}
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Column 3: Quick Links and Social Media */}
       
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center">
        <p className="text-black font-extrabold">&copy; 2023 Stay Scape. All rights reserved.</p>
      </div>
    </div>
    
  )
}

export default Footer