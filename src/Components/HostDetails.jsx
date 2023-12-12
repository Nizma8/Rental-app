import React, { useContext, useEffect, useState } from 'react'
import {  editHomesApi, getUserHostedHomesApi, viewProductApi} from '../Service/commonApi'
import { CardContent ,Card, CardActionArea} from '@mui/material'
import { base_url } from '../Service/baseUrl'
import { useNavigate } from 'react-router-dom'
import ModeIcon from '@mui/icons-material/Mode';
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { pink, purple } from "@mui/material/colors";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import { TextField } from "@mui/material";
import { BiEdit, BiTrash } from 'react-icons/bi'
import { GetHomeContext } from '../ContextShare/ContextRole'
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const names = ["Wifi", "Tv", "Heater", "Air Condition", "Pool"];

function HostDetails() {
    const [dataFromResponse,setDataFromResposne] = useState([])
    const [oneData,setOneData] = useState({})
    const [open, setOpen] = React.useState(false);
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const { homeData,setHomeData
    } = useContext(GetHomeContext)
const [preview,setPreview] = useState("")

    const navigate = useNavigate()
    const handleChange = (event) => {
      setSelectedAmenities(event.target.value);
    };
    const theme = createTheme({
      palette: {
        primary: pink,
        secondary: purple,
      },
    });
    const handleClickOpen = () => {
      setOpen(true);
    };

  
    const handleClose = () => {
      setOpen(false);
    };
    const getUserHostedHomes =async()=>{
        const reqheader ={
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
 
        }
        const resposne = await getUserHostedHomesApi(reqheader)
        setDataFromResposne(resposne.data)
    }
    // to view each card
    const viewProduct = (id)=>{
        
            navigate(`/property/${id}`);
          console.log(id);
    }
    const toGetOneProduct = async(id)=>{
      const resposne = await viewProductApi(id)
   handleClickOpen()
      setOneData(resposne.data);
    }
    const handleEdits =async()=>{
      const { chooseType, name, location, bedCount, price } = oneData;
try{
  const reqBody = new FormData();
  reqBody.append("chooseType", chooseType);
  reqBody.append("amenities", selectedAmenities);
  reqBody.append("name", name);
  reqBody.append("location", location);
  reqBody.append("bedCount", bedCount);
  reqBody.append("price", price);
  reqBody.append("productsId", oneData._id);

  if (oneData.productImage) {
    reqBody.append("uploadedImage", oneData.image);
  }
  const reqHeader ={
    "content-type":"multipart/form-data",
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  }

  const result = await editHomesApi(reqBody,reqHeader);
console.log(result);
  if (result.status === 200) {
    
    setHomeData(result.data)
    alert("Successfully edited!!")
    getUserHostedHomes()
    handleClose();
    

  } }
  
  catch(error){
    console.log(error);
  }
}
    useEffect(()=>{
        getUserHostedHomes()
    },[])
  return (
    <div className='grid xl:grid-cols-3 gap-3 lg:mt-20 md:mt-20 sm:mt-20'>
    {dataFromResponse?.length>0?dataFromResponse?.map((item)=>{
        return(
         <>
            <Card sx={{ maxWidth: "200", cursor: 'pointer' }} key={item._id}  className=' relative'>
            <CardContent>
              <div className='flex items-center justify-center'>
                <div>
                  <img src={`${base_url}/uploads/${item.productImage}`} alt="" className='h-3/4 object-cover' style={{ maxHeight: "50px" }} onClick={() => { viewProduct(item._id) }} />
                 <div className='flex justify-between items-center'> <h6 className='font-bold' style={{ fontSize: '12px' }}>{item.name}</h6>
                </div>
                </div>
               
              </div>
              <div className=' flex items-center justify-between mt-3'>
              <BiEdit className=' text-customPink  shadow-lg' 
                 onClick={()=>toGetOneProduct(item._id)}
                 />
                 <BiTrash className='text-customPink  shadow-lg'/>
              </div>
            </CardContent>
          </Card>
          <ThemeProvider theme={theme}>
           <BootstrapDialog
             onClose={handleClose}
             aria-labelledby="customized-dialog-title"
             open={open}
             sx={{ overflowX: "hidden" }}
           >
             <DialogTitle
               sx={{ m: 0, p: 4 }}
               id="customized-dialog-title"
             ></DialogTitle>
             <IconButton
               aria-label="close"
               onClick={handleClose}
               sx={{
                 position: "absolute",
                 right: 8,
                 top: 8,
                 color: theme.palette.primary.main,
               }}
             >
               <CloseIcon />
             </IconButton>
             <DialogContent dividers sx={{ overflowX: "hidden" }}>
               <label className="text-center" htmlFor="projectpic">
                 <input id="projectpic" type="file" style={{ display: "none" }} 
                   onChange={(e)=>{
               const selectedFile = e.target.files[0]
               setOneData({
                 ...oneData,
                 image: selectedFile,
               })
               setPreview(URL.createObjectURL(selectedFile))}
             }
                 />
                 <img
                   src={preview?preview:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi2_0STiAZyZmqwMSyxAGQji_kToI47_EVjg&usqp=CAU"}
                   alt=""
                   height={"100px"}
                 />
               </label>
   
               {/* Type */}
               <FormControl sx={{ m: 2, minWidth: 240, maxWidth: 500 }}>
                 <InputLabel htmlFor="grouped-select">Choose Type</InputLabel>
                 <Select defaultValue="" id="grouped-select" label="Grouping" value={oneData.chooseType} onChange={(e)=>setOneData({
                     ...oneData,chooseType:e.target.value
                   })}>
                   <MenuItem >
                     <em>None</em>
                   </MenuItem>
                   <MenuItem value="Beach">Beach</MenuItem>
                   <MenuItem value="Luxe">Luxe</MenuItem>
                   <MenuItem value="Farm">Farm</MenuItem>
                   <MenuItem value="Barn">Barn</MenuItem>
                   <MenuItem value="Lake">Lakefront</MenuItem>
                 </Select>
               </FormControl>
               {/* Amenties */}
               <FormControl sx={{ m: 2, minWidth: 240, maxWidth: 500 }}>
                 <InputLabel id="demo-multiple-checkbox-label">
                   Amenities
                 </InputLabel>
                 <Select
  labelId="demo-multiple-checkbox-label"
  id="demo-multiple-checkbox"
  multiple
  value={selectedAmenities}
  onChange={handleChange}
  input={<OutlinedInput label="Tag" />}
  renderValue={(selected) => selected.join(', ')}
  MenuProps={MenuProps}
>
  {names.map((name) => (
    <MenuItem key={name} value={name}>
      <Checkbox checked={selectedAmenities.includes(name)} />
      <ListItemText primary={name} />
    </MenuItem>
  ))}
  <MenuItem>
    <TextField
      label="New Amenity"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          const newAmenity = e.target.value.trim();
          if (newAmenity && !selectedAmenities.includes(newAmenity)) {
            setSelectedAmenities((prev) => [...prev, newAmenity]);
          }
          e.target.value = '';
        }
      }}
    />
  </MenuItem>
</Select>
               </FormControl>
               {/* type image */}
                
               {/* property name */}
   
               <TextField
                 sx={{ m: 2, minWidth: 240, maxWidth: 520 }}
                 autoFocus
                 margin="dense"
                 id="name"
                 label="Property Name"
                 type="text"
                 fullWidth
                 variant="outlined"
                 onChange={e=>{
                   setOneData({
                     ...oneData,name:e.target.value
                   })
                 }}
                 value={oneData.name}
   
               />
               {/* location */}
               <TextField
                 sx={{ m: 2, minWidth: 240, maxWidth: 520 }}
                 autoFocus
                 margin="dense"
                 id="name"
                 label="Location"
                 type="text"
                 fullWidth
                 variant="outlined"
                 value={oneData.location}
                 onChange={e=>{
                   setOneData({
                     ...oneData,location:e.target.value
                   })
                 }}
               />
               {/* beds */}
               <TextField
                 sx={{ m: 2, minWidth: 240, maxWidth: 520 }}
                 autoFocus
                 margin="dense"
                 id="name"
                 label="No of Beds"
                 type="text"
                 fullWidth
                 variant="outlined"
                 value={oneData.bedCount}
                 onChange={e=>{
                   setOneData({
                     ...oneData,bedCount:e.target.value
                   })
                 }}
               />
               {/* Price */}
               <TextField
                 sx={{ m: 2, minWidth: 240, maxWidth: 520 }}
                 autoFocus
                 margin="dense"
                 id="name"
                 label="Price Per Night"
                 type="text"
                 fullWidth
                 variant="outlined"
                 value={oneData.price}
                 onChange={e=>{
                   setOneData({
                     ...oneData,price:e.target.value
                   })
                 }}
               />
             </DialogContent>
             <DialogActions>
               <Button autoFocus onClick={()=>{handleEdits(oneData._id)}}>
                 Save changes
               </Button>
               <Button autoFocus >
                 cancel
               </Button>
             </DialogActions>
           </BootstrapDialog>
         </ThemeProvider>
         </>
        )
    }):<div className='text-center text-red-400'>No Rented Products</div> }
     
    </div>
  )
}

export default HostDetails