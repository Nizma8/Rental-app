import React, { useContext, useEffect, useState } from "react";
import RatingComponent from "./RatingComponent";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { pink, purple } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getEachRevieApi, getReviewsApi } from "../Service/commonApi";
import { GetHomeContext } from "../ContextShare/ContextRole";
import { BiEdit, BiTrash } from "react-icons/bi";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
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

function ReviewTabl() {
  const { reviewFromResponse, setReviewFromResponse } =
    useContext(GetHomeContext);
    const [oneReviewFromResposne,setOneReviewFromResposne] = useState({})
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  // to get review
  const getReview = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      console.error("Token is missing or undefined.");
      return;
    }

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    console.log("Request Headers:", reqHeader); // Add this line to check headers

    try {
      const response = await getReviewsApi(reqHeader);
      setReviewFromResponse(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  // get Each review 
  const EachReview = async(id)=>{
    handleClickOpen()
    const reqHeader ={
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,

    }
    const resposne = await getEachRevieApi(id,reqHeader)
    console.log(resposne);
    setOneReviewFromResposne(resposne.data)
    console.log(id);
  }
  useEffect(() => {
    getReview();
  }, []);
  return (
    <>
      <table className="ml-5 shadow  my-20">
        <thead className="border-b-2">
          <tr className="rounded-t-xl">
            <th className="pr-10 pl-10 py-4">#</th>
            <th className="pr-10 pl-10 py-4">Rating</th>
            <th className="pr-10 pl-10 py-4">Title</th>
            <th className="pr-10  py-4">Description</th>
            <th className="pr-10 pl-10 py-4">Suggestion</th>
            <th className="pr-5 pl-5 py-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviewFromResponse?.length > 0 ? (
            reviewFromResponse?.map((reviews, index) => {
              return (
                <tr key={reviews._id}  className=" hover:bg-gray-300 rounded-b-lg" >
                  <td className="px-10 py-4 text-sm">{index + 1}</td>
                  <td className="px-10 py-4 text-sm">
                    {Array.from({ length: reviews.rating || 0 }, (_, index) => (
                      <span
                        key={index}
                        className="star text-xl me-3 text-yellow-400"
                      >
                        &#9733;
                      </span>
                    ))}
                  </td>
                  <td className="py-4 text-sm ">{reviews.title}</td>
                  <td className=" py-4 text-sm pr-5">
                    {reviews?.description
                      ? reviews.description.slice(0, 90)
                      : ""}
                    <span className="">...<button className="text-blue-700 font-extrabold " onClick={()=>{EachReview(reviews._id)}}>View more</button></span>
                  </td>
                  <td
                    className={` pl-5 py-4 text-sm ${
                      !reviews?.suggestion && "text-red-500"
                    }`}
                  >
                    {reviews?.suggestion
                      ? reviews.suggestion.slice(0, 90)
                      : "No suggestions"}
                    ...
                  </td>
                  <td className=" px-5 py-4 text-sm pr-5">
                  <button className="text-white bg-customPink text-lg me-3" onClick={handleClickOpen}><BiEdit/></button>
                  <button className="text-white bg-customPink text-lg"><BiTrash/></button>
                  
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td></td>
              <td></td>
              <td className="mt-2 text-red-500">No Review</td>
              <td></td>
              <td></td>
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
          <DialogTitle sx={{ m: 0, p: 2,backgroundColor:"#DE3163" ,color:'white'}} id="customized-dialog-title">
            REVIEW
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme.palette.primary.dark  
                     }}
          >
            <CloseIcon />
          </IconButton>

          <Box
          
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' , }}
  >{oneReviewFromResposne &&
    <Card>
       <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          
          {Array.from({ length: oneReviewFromResposne?.rating || 0 }, (_, index) => (
                      <span
                        key={index}
                        className="star text-xl me-3 text-yellow-400"
                      >
                        &#9733;
                      </span>
                    ))}
        </Typography>
        <Typography variant="h5" component="div">
         {oneReviewFromResposne?.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {oneReviewFromResposne?.description}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary" >
     <span className="font-bold"> Suggestions: </span><br /> {oneReviewFromResposne?.suggestion?oneReviewFromResposne?.suggestion:"No suggestions"}
          
        </Typography>
      </CardContent>
    </Card>}
  </Box>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Save changes
            </Button>
          </DialogActions>
        </BootstrapDialog>
     </ThemeProvider>
   
    </>
  );
}

export default ReviewTabl;
