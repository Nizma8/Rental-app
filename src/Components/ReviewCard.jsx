import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { BiSolidDislike, BiSolidLike } from "react-icons/bi";
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import {Navigation,Pagination,Scrollbar, A11y} from 'swiper/modules'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  zIndex: 1000,
}));





function ReviewCard({data}) {
  const [expanded, setExpanded] = React.useState(false);
  const [likeStates, setLikeStates] = useState({});

  const [expandedStates, setExpandedStates] = useState({});
  
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
  const handleExpandClick = (id) => {
    setExpandedStates((prevStates) => {
      // Close all other cards
      const newStates = Object.fromEntries(Object.keys(prevStates).map((key) => [key, false]));
  
      // Toggle the clicked card
      newStates[id] = !prevStates[id];
      console.log(newStates); 

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
            
              <Card sx={{ maxWidth: 345, width:345,height:300 }} key={index}>
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
                <ExpandMore  
                expand={expandedStates[item._id]}
                onClick={() => {
                  console.log('Button clicked'); // Add this line
                  handleExpandClick(item._id);}}
                  aria-expanded={expandedStates[item._id]}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expandedStates[item._id] || false} timeout="auto" unmountOnExit>
                <CardContent>
                 
                  <Typography paragraph>
                   Description:{ item?.description}
                  </Typography>
                  <Typography paragraph>
                   Suggestions:{
                    item?.suggestion?item?.suggestion:<p className='text-red-500 '>No suggestions</p>
                   }
                  </Typography>
                  
                </CardContent>
              </Collapse>
            </Card>
            
          </SwiperSlide>
          
        )
      }):""}</Swiper>
      
  )
}

export default ReviewCard