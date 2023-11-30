import React, { useContext, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { GetHomeContext, RoleProvide } from "../ContextShare/ContextRole";
import { base_url } from "../Service/baseUrl";
import { useNavigate } from "react-router-dom";
import { DeleteForeverOutlined, DeleteForeverSharp } from "@mui/icons-material";
import { removeHomeApi, wishListAddApi } from "../Service/commonApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function PropertyDisplay() {
  // to get all property
  const { userRole } = useContext(RoleProvide);
  const { getAllHomes, homeData } = useContext(GetHomeContext);
  // const filteredData = homeData.filter(item=>item.chooseType.includes(selectedTab))
  // console.log(filteredData)
  const navigate = useNavigate();
  const handleNavigate = (id) => {
    navigate(`/property/${id}`);
  };
  const handleWishlist = async (productId)=>{
    const reqBody = { productId };
    const reqHeader = {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    };
    const response = await wishListAddApi(reqBody, reqHeader);
    if (response.status === 200) {
      toast.success(response.data.message);
      console.log(response);
    } else {
      toast.warning(response.response.data.message);
    }
  };

  const handleDeleteHome = async(id)=>{
   
    const reqHeader ={
      Authorization: `Bearer ${sessionStorage.getItem("token")}`}
      
      const resposne = await removeHomeApi(id,reqHeader)
      console.log(resposne);
      getAllHomes();
  }

  useEffect(() => {
    getAllHomes();
  }, [homeData]);

  return (
    <div className="grid xl:grid-cols-4 xl:ml-12 gap-10 mt-28 ml-32 lg:grid-cols-3 md:grid-cols-2 mb-7">
      {homeData?.map((item, index) => {
        return (
          <>
            <Card sx={{ maxWidth: 300, position: "relative" }} key={index}>
              <CardActionArea>
                <CardMedia
                  sx={{ maxHeight: "250px" }}
                  component="img"
                  image={`${base_url}/uploads/${item.productImage}`}
                />
                <CardContent onClick={() => handleNavigate(item._id)}>
                  <div className="">
                    <p className="text-lg font-semibold">{item?.name}</p>
                    <p> {item?.location}</p>
                    <p>&#8377; {item?.price} per night</p>
                  </div>
                </CardContent>
              </CardActionArea>
              {userRole == "admin" ? (
                <DeleteForeverSharp
                  className="absolute  m-2 cursor-pointer text-red-700 top-0"
                  onClick={() => handleDeleteHome(item._id)}
                />
              ) : (
                <FavoriteBorderIcon
                  className="absolute  m-2 cursor-pointer text-red-700 top-0"
                  onClick={() => handleWishlist(item._id)}
                />
              )}
            </Card>
          </>
        );
      })}
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
        theme="light"
      />
    </div>
  );
}

export default PropertyDisplay;
