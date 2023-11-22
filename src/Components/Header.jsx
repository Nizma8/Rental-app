import React, { useContext, useState } from 'react'
import { SiGooglehome } from "react-icons/si";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosLogOut } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { MdWorkHistory } from "react-icons/md";
import { RoleProvide } from '../ContextShare/ContextRole';
import Auth from './Auth';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { pink, purple } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';

 const color = pink[500]
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
  const theme = createTheme({
    palette: {
      primary: pink,
      secondary: purple,
    },
  });
function Header({home}) {
  const [menu,setMenu] =useState("")
  const {logine} = useContext(RoleProvide)
  const [register,setRegister]= useState(true)
  const [open, setOpen] = React.useState(false);

  const handleMenu = ()=>{
     setMenu(!menu)
  }
  const handleClose = () => {
    setOpen(false);
  };
  const handleReg =(item)=>{
    
    if(item==="Login"){
      setOpen(true);

     setRegister(false)
    } else if(item==="sign-up"){
      setRegister(true)
      setOpen(true);
    }
  }
  const handleRedie = () => {
   if(register) {
    setRegister(false); // Set register state to true
    setOpen(true);// Open the modal
  } else{
    setRegister(true)
    setOpen(true)
  }
 }
  return (
    <>
<div className='w-screen border-t-2 border-b-2 py-6  bg-slate-200 fixed  z-20'>
  <div className='grid grid-cols-3 mx-12 h-full lg:gap-8   '>
       
            <div className='inline-flex'><SiGooglehome className='text-4xl me-4 text-customPink'/><h4 className='text-4xl font-extralight  text-customPink'>STAYSCAPE</h4></div>
          <div></div>
      
        <div className=' flex flex-col items-center relative'>
            <div className='border rounded-3xl px-3 py-2 inline-flex  border-customPink shadow-md' >
             <GiHamburgerMenu className='text-black text-2xl me-2 mt-1 cursor-pointer ' onClick={handleMenu}/>
             <span className='border bg-black rounded-full text-white w-8 h-8 flex flex-col items-center justify-center'>N</span>
             
            </div>
        </div>
    </div>
    {menu && <div className='  w-44 flex flex-col items-center justify-center border border-slate-600 py-5 bg-white mt-3 absolute xl:right-52 rounded-lg shadow-lg lg:right-40 md:right-20 sm:right-10 right-5'>
                
                <ul className='w-full'> 
                 {!logine ?
                 ( ['Login','sign-up'].map((item,index)=>{
                    return(
                      <li key={index} className='hover:bg-slate-300 me-1 ms-2 border-b-2 cursor-pointer'onClick={()=>handleReg(item)}>{item}</li>
                    ) 
                  })): ['Wishlist','Booking','Account'
                  ,'Logout',].map((item,index)=>{
                    return(
                      <li key={index} className='hover:bg-slate-300 text-center  py-2 cursor-pointer'>{item}</li>
                    ) })
                 } 
                </ul>
              </div>
             }
</div>
<>
    
  <ThemeProvider theme={theme}>
      <BootstrapDialog 
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        
      >
        <DialogTitle sx={{ m: 0, p: 2 ,fontFamily: 'Noto Serif Vithkuqi, serif',fontWeight:'800'}} id="customized-dialog-title">
         {
          !register?"Login":"Sign-up"
         }
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color:theme.palette.primary.dark,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
        {
        register&&(
                <TextField sx={{ mt: 2, maxWidth: 520 ,minWidth:120}}  
                autoFocus
                margin="dense"
                id="name"
                label="username"
                type="text"
                fullWidth
                variant="standard"
              />
              )
            }
        <TextField sx={{ mt: 2, maxWidth: 520 ,minWidth:120}}
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
            <TextField sx={{ mt: 2, maxWidth: 520 ,minWidth:120}}
              autoFocus
              margin="dense"
              id="name"       
              label="Password"
              type="password"
              fullWidth
              variant="standard"
            />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} variant="contained" sx={{backgroundColor:color, '&:hover': {
      backgroundColor: pink[700]
    }
          }}>
           { register? "Sign-up":"Login"}
          </Button>
          <Button autoFocus onClick={handleRedie} >
    {register ? "Login":"New User?Sign-up"}
  </Button>
        </DialogActions>
      </BootstrapDialog>
  </ThemeProvider>
  </>
    </>
  )
}

export default Header