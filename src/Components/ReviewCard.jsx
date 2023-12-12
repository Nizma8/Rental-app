import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { BiSolidDislike, BiSolidLike } from "react-icons/bi";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import {Navigation,Pagination,Scrollbar, A11y} from 'swiper/modules'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'scroll'
};



function ReviewCard({data}) {
  const [likeStates, setLikeStates] = useState({});
  const [openStates, setOpenStates] = useState(Array(data.length).fill(false));  
  
  const [dislikeState, setDislikeState] = useState({});
  const handleLikeClick = (id) => {
    setLikeStates((prevStates) => {
      const newStates = { ...prevStates };
      newStates[id] = !newStates[id];
      return newStates;
    });
    console.log(id);
    // Perform other actions based on the cardId
  };
 
  const handleOpen = (index) => {
    // Update the specific modal state for the clicked card
    setOpenStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = true;
      return newStates;
    });
  };

  const handleClose = (index) => {
    // Update the specific modal state for the clicked card
    setOpenStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = false;
      return newStates;
    });
  };
  
 
  const handleDislikeClick = (id) => {
 setDislikeState((prev)=>{
  const newState = {...prev}
  newState[id] =!newState[id]
  console.log(newState); 
  return newState

 })
  };
  return (
  <>
      <Swiper
        spaceBetween={10}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        modules={[Navigation, Pagination, Scrollbar]}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        className='  w-[95%] '
        >
          
        {data?.length>0?data?.map((item,index)=>{
          return(
            <SwiperSlide key={index} className='ml-5'>
              
                <Card sx={{ maxWidth: 345, width:345,height:300 }} key={index} onClick={() => handleOpen(index)}
>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] ,fontWeight:900,textTransform:'capitalize' }} aria-label="recipe">
                      {item?.userId.username.slice(0,1)}
                    </Avatar>
                  }
                  // action={
                  //   <IconButton aria-label="settings">
                  //     <MoreVertIcon />
                  //   </IconButton>
                  // }
                  
                  title={`${item?.userId.username}, ${item?.date.split('T')[0]}`}
                  subheader=
                    {Array.from({ length: item.rating || 0 }, (_, index) => (
                      <span
                        key={index}
                        className="star text-xl me-2 text-yellow-400"
                      >
                        &#9733;
                      </span>
                    ))}
                  
                />
               
                <CardContent>
                  <p className='mb-1'>{item?.title}</p>
                  <Typography variant="body2" color="text.secondary">
                   {
                    item?.description.slice(0,200)
                   }...
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={() => handleLikeClick(item._id)}>
                <BiSolidLike
                  className={`${likeStates[item._id] ? 'text-customPink' : ''}`}
                />        </IconButton>
              <IconButton aria-label="share" onClick={()=>handleDislikeClick(item._id)}>
                <BiSolidDislike className={`${dislikeState[item._id] ? 'text-customPink' : ''}`} />
              </IconButton>
                  
                </CardActions>
               
              </Card>
              
            </SwiperSlide>
            
          )
        }):""}</Swiper>

{data?.length > 0
        ? data?.map((item, index) => (
            <Modal
              key={index}
              open={openStates[index]}
              onClose={() => handleClose(index)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography variant="h6" component="h2">
                  {item?.title}
                </Typography>
                <h2 className='inline-flex'><span className=' font-extrabold'> Description:</span>{ item?.description}</h2>
                <h2 className=" inline-flex"> <span className=' font-extrabold'>Suggestions:</span>{
                      item?.suggestion?item?.suggestion:<p className='text-red-500  '>No suggestions</p>
                     }</h2>

              </Box>
            </Modal>
          ))
        : ""}
    
        
  </>
  )
}

export default ReviewCard