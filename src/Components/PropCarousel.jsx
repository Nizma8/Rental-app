import { Card, Container } from '@mui/material'
import React from 'react'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
function PropCarousel() {
  return (
    <>
      <Card sx={{ maxWidth: 100,maxHeight:100 , 
        // borderBottom: '2px solid #DE3163'
        }}>
      <CardActionArea >
        <CardMedia sx={{width:'40px',marginLeft:"25px"}}
          component="img"
        
          image="https://cdn-icons-png.flaticon.com/128/2060/2060203.png"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Beach
          </Typography>
         
        </CardContent>
      </CardActionArea>
    </Card>
    
    </>
  )
}

export default PropCarousel
