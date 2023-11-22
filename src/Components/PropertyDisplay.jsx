import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function PropertyDisplay() {
  return (
    <div className="grid xl:grid-cols-4 xl:ml-12 gap-10 mt-28 ml-32 lg:grid-cols-3 md:grid-cols-2 ">
      <Card sx={{ maxWidth: 300, position: "relative" }}>
        <CardActionArea>
          <CardMedia
            sx={{ maxHeight: "250px" }}
            component="img"
            image="https://a0.muscache.com/im/pictures/0870e450-43b2-4a55-9be7-be3654075eef.jpg?im_w=720"
            alt="green iguana"
          />
          <CardContent>
            <div className="">
              <p className="text-lg font-semibold">Reis Magos, India</p> 
              <p>On the Beach</p>
              <p>&#8377; 51220 night</p>
            </div>
          </CardContent>
        </CardActionArea>
       
      </Card>
     
      <FavoriteBorderIcon className="absolute text-white m-2 cursor-pointer" />
    </div>
  );
}

export default PropertyDisplay;
