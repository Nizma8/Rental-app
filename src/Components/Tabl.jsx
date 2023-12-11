import React, { useContext, useEffect, useState } from "react";
import { getUserBookedHomesAPi, reviewHomes } from "../Service/commonApi";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { DialogContentText, TextField } from "@mui/material";
import { pink, purple } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import RatingComponent from "./RatingComponent";
import Box from "@mui/material/Box";
import { GetHomeContext } from "../ContextShare/ContextRole";
import { Edit } from "@mui/icons-material";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const theme = createTheme({
  palette: {
    primary: pink,
    secondary: purple,
  },
});

function Tabl() {
  const [dataFromResponse, setDataFromResponse] = useState([]);
  const { reviewFromResponse } =useContext(GetHomeContext)
  const [open, setOpen] = useState(false);
  const [userInput, setUserInput] = useState({
    title: "",
    Description: "",
    date: "",
    Suggestions: "",
  });
  const [rating, setRating] = useState(0);
  const [selectedHomes, setSelectedHomes] = useState(null);

  const handleClose = () => {
    
    setOpen(false);
    setRating(0);
    setUserInput({
      title: "",
      Description: "",
      date: "",
      Suggestions: "",
    });
  };
// to check if its alredy wishlisted
 
 
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const userBookedHomes = async () => {
    try {
      const reqHeader = {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      };

      const response = await getUserBookedHomesAPi(reqHeader);

      if (response.status === 200) {
        setDataFromResponse(response.data);
       
      } else {
        // console.error("Error fetching user booked homes:", response.data);
      }
    } catch (error) {
      console.error("Error fetching user booked homes:", error.message);
      // console.log(console.error(error));
    }
  };
  // user review
  const userReview = async () => {
    const { title, Description, date, Suggestions } = userInput;
    const reqBody ={
      propertyDetails:selectedHomes?.productId?._id,
      rating,
      title,
      description:Description,
      date:new Date(),
      suggestion:Suggestions,
      
    }

    const reqHeader ={
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,

    }
    const response = await reviewHomes(reqBody,reqHeader)
    if(response.status === 200){
      handleClose()
    }
    console.log(response);

  };

  useEffect(() => {
    userBookedHomes();
  }, []);
  const calculateTotalPrice = (home) => {
    const checkinDate = new Date(home.checkIn);
    const checkoutDate = new Date(home.checkOut);
    const duration = (checkoutDate - checkinDate) / (1000 * 60 * 60 * 24); // Convert milliseconds to days

    const totalPrice =
      duration * home.productId.price * parseInt(home.guests, 10);
    return `$${totalPrice.toFixed(2)}`;
  };

  return (
    <>
      <table className="ml-5 shadow">
        <thead className="border-b-2">
          <tr className=" rounded-t-xl">
            <th className="pr-10 pl-10 py-4">No</th>
            <th className="pr-10 py-4">Homes</th>
            <th className="pr-10 py-4">Price</th>
            <th className="pr-30 py-4">Reviews</th>
          </tr>
        </thead>
        <tbody>
          {dataFromResponse?.length > 0 ? (
            dataFromResponse?.map((home, index) => (
              <tr key={home._id} className=" hover:bg-gray-300 rounded-b-lg">
                <td className="px-10 py-4 text-sm">{index + 1}</td>
                <td className="pr-10 py-4 text-sm">{home.productId.name}</td>
                <td className="pr-10 py-4 text-sm">
                  {calculateTotalPrice(home)}
                </td>
                <td className="pr-30 py-4 text-sm">
                  <button
                    className="bg-customPink shadow-lg rounded-sm text-white text-small"
                    onClick={() => {
                      setOpen(true);
                      setSelectedHomes(home);
                    }}
                  >
                    {home.review ? <Edit/> : "Add Review"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="pl-10 py-4 text-red-800 font-bold"></td>
              <td className=" py-4 text-red-800 font-bold">No Bookings !!</td>
              <td className="pr-10 py-4  text-red-800 font-bold"></td>
            </tr>
          )}
        </tbody>
      </table>
      <ThemeProvider theme={theme}>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle
            sx={{
              m: 0,
              p: 2,
              fontFamily: "Noto Serif Vithkuqi, serif",
              fontWeight: "800",
              backgroundColor: "#DE3163",
              color: "white",
            }}
            id="customized-dialog-title"
          >
            Add Reviews
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.secondary,
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent
            dividers={scroll === "paper"}
            sx={{ maxWidth: 520, width: 520 }}
          >
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <RatingComponent
                rating={rating}
                setRating={handleRatingChange}
                sx={{ mt: 2, maxWidth: 520 }}
              />
              <TextField
                sx={{ mt: 2, maxWidth: 520, minWidth: 250 }}
                autoFocus
                margin="dense"
                id="name"
                label="Title"
                type="text"
                fullWidth
                variant="standard"
                value={userInput.title}
                onChange={(e) => {
                  setUserInput({ ...userInput, title: e.target.value });
                }}
              />
             
              
              <Box
                sx={{
                  py: 2,
                  display: "grid",
                  gap: 2,
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <textarea
                  placeholder="Write your Review"
                  id=""
                  cols="10"
                  rows="10"
                  defaultValuevalue={userInput.Description}
                  onChange={(e) => {
                    setUserInput({ ...userInput, Description: e.target.value });
                  }}
                  style={{ resize: "vertical" }}
                  className=" focus:outline-customPink"
                ></textarea>
                <textarea
                  placeholder="Write your Review"
                  id=""
                  cols="20"
                  rows="10"
                  value={userInput.Suggestions}
                  onChange={(e) => {
                    setUserInput({ ...userInput, Suggestions: e.target.value });
                  }}
                  className=" focus:outline-customPink"
                ></textarea>
                
              </Box>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button
              autoFocus
              onClick={userReview}
              className="bg-customPink text-white py-2 px-2 shadow-md rounded-sm "
            >
              Save changes
            </button>
            <button
              autoFocus
              onClick={handleClose}
              className="bg-customPink text-white py-2 px-2 shadow-md rounded-sm "
            >
              cancel changes
            </button>
          </DialogActions>
        </BootstrapDialog>
      </ThemeProvider>
    </>
  );
}

export default Tabl;
