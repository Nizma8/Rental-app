import React, { useContext, useState,useEffect } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TabPanel from "./TabPanel";
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
import { GetHomeContext, RoleProvide } from "../ContextShare/ContextRole";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { addAllProductsApi } from "../Service/commonApi";
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

function Category() {
  const { userRole } = useContext(RoleProvide);
  const {setHomeData,homeData}= useContext(GetHomeContext)
  const [open, setOpen] = React.useState(false);
  const [propertyDetails, setPropertyDetails] = useState({
    image: '',
    chooseType: '',
    amenities: [],
    name: '',
    location: '',
    bedCount: '',
    price: '',
  });
  const [preview,setPreview] =useState("")
  useEffect(()=>{
    if(localStorage.getItem("id") && sessionStorage.getItem("token")){
      setPropertyDetails({...propertyDetails,userId:JSON.parse(localStorage.getItem("id"))})
   
    }
  },[])
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
const handleAdd =async()=>{
  const {image,chooseType,amenities,name,location,bedCount,price} =propertyDetails
  if(!image||!chooseType||!amenities||!name||!location||!bedCount||!price ){
    toast.error("Please fill the form")
  }else{
    const reqBody = new FormData()
    reqBody.append("productImage",image)
    reqBody.append("chooseType",chooseType)
    reqBody.append("amenities",amenities)
    reqBody.append("name",name)
    reqBody.append("location",location)
    reqBody.append("bedCount",bedCount)
    reqBody.append("price",price)
   
    const reqHeader ={
      "content-type":"multipart/form-data",
      "Authorization":`Bearer ${sessionStorage.getItem("token")}`
    }

    const response = await addAllProductsApi(reqBody,reqHeader)
    if(response.status===200){
      setPropertyDetails({
        image: '',
        chooseType: '',
        amenities: [],
        name: '',
        location: '',
        bedCount: '',
        price: '',
      })
      handleClose()
      setHomeData([...homeData,response.data])
      toast.success(response.data.message)

    } else if(response.status===406){
      toast.warning("This home already existed..")
    }
  }
}
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPropertyDetails((prevDetails) => ({
      ...prevDetails,
      amenities: typeof value === 'string' ? value.split(',') : value,
    }));
  };
  const theme = createTheme({
    palette: {
      primary: pink,
      secondary: purple,
    },
  });
  return (
    <>
      <div className="w-full  flex justify-between fixed z-10 bg-white -mt-3 pt-3">
        <div className=" xl:w-5/6 overflow-x-auto no-scrollbar lg:w-5/6  md:w-2/3 sm:w-2/4 ml-12 ">
          <TabPanel />{" "}
        </div>

        {(userRole == "admin" || userRole == "host") && (
          <button
            className=" bg-customPink me-12 p-1 rounded shadow h-10 mt-5"
            onClick={handleClickOpen}
          >
            <AddCircleOutlineIcon className="text-white " />{" "}
            <span className="text-white" >Add Property</span>
          </button>
        )}
      </div>

      {/* modal for adding category */}

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
            setPropertyDetails({
              ...propertyDetails,
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
              <Select defaultValue="" id="grouped-select" label="Grouping" value={propertyDetails.chooseType} onChange={(e)=>setPropertyDetails({
                  ...propertyDetails,chooseType:e.target.value
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
                value={propertyDetails.amenities}
                onChange={handleChange}
        input={<OutlinedInput label="Tag" />}
        renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={propertyDetails.amenities.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
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
                setPropertyDetails({
                  ...propertyDetails,name:e.target.value
                })
              }}
              value={propertyDetails.name}

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
              value={propertyDetails.location}
              onChange={e=>{
                setPropertyDetails({
                  ...propertyDetails,location:e.target.value
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
              value={propertyDetails.bedCount}
              onChange={e=>{
                setPropertyDetails({
                  ...propertyDetails,bedCount:e.target.value
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
              value={propertyDetails.price}
              onChange={e=>{
                setPropertyDetails({
                  ...propertyDetails,price:e.target.value
                })
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleAdd}>
              Save changes
            </Button>
            <Button autoFocus onClick={handleClose}>
              cancel
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </ThemeProvider>
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
theme="light"/>
    </>
  );
}

export default Category;
