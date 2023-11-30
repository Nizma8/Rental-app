import React, { useContext, useEffect } from "react";
import { GetHomeContext } from "../ContextShare/ContextRole";
import Card from "@mui/material/Card";
import { CardActionArea, CardContent } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import { base_url } from "../Service/baseUrl";
import { DeleteOutlineRounded } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { removeWishlistApi ,getWishlistApi} from "../Service/commonApi";
function WishList() {
  const {  wishListData,setWishListData } = useContext(GetHomeContext);
  const navigate = useNavigate();
  // console.log(wishListData);
  const handleView = (id) => {
    navigate(`/property/${id}`);
    console.log(id);
  };
  const wishlistUsers = async ()=>{
    const reqHeader={
      "Authorization": `Bearer ${sessionStorage.getItem("token")}`
  
    }
    const response =await getWishlistApi(reqHeader)
    setWishListData(response.data.populatedWishList)
      console.log(response);
  }
  // to delete wishlist
  const handleDelete = async (id) => {
    const reqHeader = {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    };

    try {
      // Remove the item locally
      
      // Send the request to the server to remove the item
      await removeWishlistApi(id, reqHeader);

      // Fetch the updated wishlist
      await wishlistUsers();
    } catch (error) {
      console.error("Error deleting wishlist item:", error);
    }
  };

  useEffect(() => {
    wishlistUsers()

  }, [wishListData]);

  // console.log(wishListData);
  return (
    <div className="pt-28 grid xl:grid-cols-4 gap-2  md:grid-cols-3 md:gap-2   sm:grid-cols-2 mx-10 sm:mx-20">
      {wishListData.length > 0
        ? wishListData?.map((item) => {
            return (
              <Card sx={{ maxWidth: 300 }} key={item._id}>
                <CardActionArea>
                  <CardMedia
                    sx={{ objectFit: "cover", height: "150px" }}
                    component="img"
                    height="100"
                    image={`${base_url}/uploads/${item?.productId.productImage}`}
                    alt="green iguana"
                    onClick={() => {
                      handleView(item.productId._id);
                    }}
                  />
                  <CardContent>
                    <h4 className=" font-bold inline-block  ms-5">
                      {item.productId.name}
                    </h4>
                    <button className="text-red-500 ">
                      <DeleteOutlineRounded
                        onClick={() => handleDelete(item._id)}
                      />
                    </button>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })
        :   <div className="text-center w-screen h-screen flex  items-center flex-col">
        <div className=" w-1/3  h-1/2  ">
          <img
            src="https://i.pinimg.com/originals/f6/e4/64/f6e464230662e7fa4c6a4afb92631aed.png"
            alt="Empty Wishlist"
            className="w-full h-full "
          />
          <div className="  flex flex-col justify-center items-center text-white ">
            {/* <p className="text-gray-700 mb-4">Your wishlist is empty.</p> */}
            <Link
              to="/"
              className="bg-customPink text-white px-4 py-2 rounded"
            >
              Explore Home
            </Link>
          </div>
        </div>
      </div>}
    </div>
  );
}

export default WishList;
