import { Card, Container } from '@mui/material'
import React, { useContext } from 'react'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { GetHomeContext } from '../ContextShare/ContextRole';
function PropCarousel({item}) {
 const {setSelectedTab,selectedTab}=useContext(GetHomeContext)
const handleSelectType = (item)=>{
setSelectedTab((prevSelectedTab)=>(prevSelectedTab===item?null:item))

}
 const logoImage = [
 { items:"Beach",
 logo:"https://a0.muscache.com/pictures/10ce1091-c854-40f3-a2fb-defc2995bcaf.jpg"
},{
  items:"Farm",
  logo:"https://a0.muscache.com/pictures/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg"
},{
  items:"Barn",
  logo:"https://a0.muscache.com/pictures/f60700bc-8ab5-424c-912b-6ef17abc479a.jpg"
},{
  items:"Luxe",
  logo:"https://a0.muscache.com/pictures/c8e2ed05-c666-47b6-99fc-4cb6edcde6b4.jpg"
},{
  items:"Lake",
  logo:"https://a0.muscache.com/pictures/a4634ca6-1407-4864-ab97-6e141967d782.jpg"
}
 ]

 const filterdItemAndLogo = logoImage.find(data=>data.items===item)
  return (
    <>
      
       { 
       filterdItemAndLogo && 
        <Card sx={{  maxWidth: 100, maxHeight:90 , width:80,paddingBottom:"10px",
        borderBottom: `${selectedTab && selectedTab === item?'4px solid #DE3163':'none'}`
        }} onClick={()=>{handleSelectType(item)}}>
      <CardActionArea >
        <CardMedia sx={{width:'40px',marginLeft:"25px",}}
          component="img"
        
          image={filterdItemAndLogo.logo}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
           {item}
          </Typography>
         
        </CardContent>
      </CardActionArea>
    </Card>
    }
    </>
  )
}

export default PropCarousel
