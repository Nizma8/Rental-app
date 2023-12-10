import React, { useState } from 'react'
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
import RatingComponent from './RatingComponent';
import Box from "@mui/material/Box";

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
  
function Modal({open,close,home}) {
    const [userInput, setUserInput] = useState({
      title: "",
      Description: "",
      date: "",
      Suggestions: "",
    });
    console.log(userInput);
    const [rating, setRating] = useState(0);
    const [scroll, setScroll] = React.useState('paper');
    const handleClickOpen = () => {
      setOpen(true);
      setScroll(scrollType);
    };
    const handleClose = () => {
        close
      setRating(0)
      setUserInput({
      title: "",
      Description: "",
      date: "",
      Suggestions: ""
      })
    };
    const handleRatingChange = (newRating) => {
      setRating(newRating);
    };
  return (
    <div>
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
            backgroundColor:"#DE3163",
            color:"white"
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
          <DialogContent  dividers={scroll === 'paper'} sx={{maxWidth:520,width:520}}>
          <DialogContentText 
            id="scroll-dialog-description"
            tabIndex={-1}>
              <RatingComponent rating={rating} setRating={handleRatingChange}    sx={{ mt: 2, maxWidth: 520, }}/>
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
          <DialogActions >
            <button autoFocus onClick={handleClose} className="bg-customPink text-white py-2 px-2 shadow-md rounded-sm ">
              Save changes
            </button>
          </DialogActions>
        </BootstrapDialog>
      </ThemeProvider>
    </div>
  )
}

export default Modal