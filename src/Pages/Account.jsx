import React, { useContext, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {motion,AnimatePresence} from 'framer-motion'
import { RoleProvide } from '../ContextShare/ContextRole';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import SecurityIcon from '@mui/icons-material/Security';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import ProfileComponent from '../Components/ProfileComponent';
import SecurityComponent from '../Components/SecurityComponent';
import Tabl from '../Components/Tabl';
import { HomeMaxOutlined, HomeMiniRounded, LoginRounded } from '@mui/icons-material';
import HostDetails from '../Components/HostDetails';
import List from '../Components/List';
function Account() {
  const [expandedPanel, setExpandedPanel] = useState(null);
   const {userRole} = useContext(RoleProvide)
  const handleToggle = (id) => {
    setExpandedPanel((prevPanel) => (prevPanel === id ? null : id));
  };
  
  const getCardsBasedOnRole = () => {
    if (userRole === "admin") {
      return [
        {
          id: 1,
          title: "Personal Info",
          description: "Provide Personal Information and how we can reach you",
          Content: <ProfileComponent />,
          logo: <ContactMailIcon />,
        },
        {
          id: 2,
          title: "Password",
          description: "Provide Personal Information and how we can reach you",
          Content: <SecurityComponent />,
          logo: <SecurityIcon />,
        },
       
        {
          id: 4,
          title: "Users",
          description: "No of users active ",
          Content: <List/>,
          logo: <ManageHistoryIcon />,
        },
      
      ];
    } else if ( userRole=="user" || userRole =="host") {
      return [
        {
          id: 1,
          title: "Personal Info",
          description: "Provide Personal Information and how we can reach you",
          Content: <ProfileComponent />,
          logo: <ContactMailIcon />,
        },
        {
          id: 2,
          title: "Password",
          description: "Provide Personal Information and how we can reach you",
          Content: <SecurityComponent />,
          logo: <SecurityIcon />,
        },
        {
          id: 3,
          title: "My Booking",
          description: "Your Booking Details",
          Content: <Tabl />,
          logo: <ManageHistoryIcon />,
        },
        {
          id: 4,
          title: "Your Property",
          description: "Details of property you have rented",
          Content: <HostDetails/>,
          logo: <HomeMaxOutlined/>,
        },
      ];
    } 
  };

  const cards = getCardsBasedOnRole();
  // let haha = [
  //   {
  //     id: 1,
  //     title: "Personal Info",
  //     description: "Provide Personal Information and how we can reach you",
  //     Content: <ProfileComponent/>,
  //     logo: <ContactMailIcon />,
  //   },
  //   {
  //     id: 2,
  //     title:   "Password",
  //     description: "Provide Personal Information and how we can reach you",
  //     Content: <SecurityComponent/>,
  //     logo: <SecurityIcon />,
  //   },
  //   {
  //     id: 3,
  //     title: "My Booking",
  //     description: "Your Booking Details",
  //     Content: <Tabl/>,
  //     logo: <ManageHistoryIcon />,
  //   },
  //   userRole == "admin" && {
  //     id: 4,
  //     title: "Uses",
  //     description: "No of users active ",
  //     Content: <Tabl/>,
  //     logo: <ManageHistoryIcon />,
  //   }
  //   ,
  //   userRole == "admin" && {
  //     id: 4,
  //     title: "Hosts",
  //     description: "No of Hosts active ",
  //     Content: <Tabl/>,
  //     logo: <ManageHistoryIcon />,
  //   },
  //    userRole == "host"?{
  //     id: 4,
  //     title: "Hosts",
  //     description: "No of Hosts active ",
  //     Content: <Tabl/>,
  //     logo: <ManageHistoryIcon />
  //    }:{
  //     id: 4,
  //     title: "Hosts",
  //     description: "No of Hosts active ",
  //     Content: "You are not a host",
  //     logo: <ManageHistoryIcon />
  //    }
    
  // ];

  return (
   
      <div className="pt-32 grid xl:grid-cols-3 lg:grid-cols-3 gap-4 ms-5  mr-4 ">
      {cards?.map((item, index) => (
        <div key={index}>
          <motion.div
            initial={false}
            animate={{ backgroundColor: expandedPanel === item.id ? '#DE3163' : '#FFFFFF' ,marginBottom:expandedPanel === item.id ?'30px' : '0',
            
          }}
            
            className='shadow-lg rounded-l border-2 pb-6 ' style={{maxHeight:"230px"}}
            onClick={() => {
              handleToggle(item.id);
            }}
          >
            <CardContent>
             <span className={`${expandedPanel === item.id ?'text-white':'text-customPink'} font-semibold` }> {item.logo}</span>
              <h6 className=' font-semibold mt-4' >
                {item.title}
              </h6>
              <p>
                {item.description}
              </p>
            </CardContent>
          </motion.div>
  
          <AnimatePresence>
            {expandedPanel === item.id && (
              <motion.div
                sx={{ minWidth: 275, marginTop: '10px' }}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1.2 ,margin:"0 50px 0 50px"}}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
              >
               
                      {item.Content}
                    
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  
  );
}

export default Account;
