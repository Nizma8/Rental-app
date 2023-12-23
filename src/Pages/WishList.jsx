import React, { useContext, useEffect, useState } from "react";
import { GetHomeContext } from "../ContextShare/ContextRole";
import Card from "@mui/material/Card";
import { CardActionArea, CardContent } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import { base_url } from "../Service/baseUrl";
import { DeleteOutlineRounded } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { removeWishlistApi, getWishlistApi } from "../Service/commonApi";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

function WishList() {
  const [loading, setLoading] = useState(true); // Define loading state
  const { wishListData, setWishListData } = useContext(GetHomeContext);
  const navigate = useNavigate();

  const fetchData = async () => {
    const reqHeader = {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    };

    try {
      const response = await getWishlistApi(reqHeader);
      setWishListData(response.data.populatedWishList);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (id) => {
    navigate(`/property/${id}`);
  };

  const handleDelete = async (id) => {
    const reqHeader = {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    };

    try {
      await removeWishlistApi(id, reqHeader);
      fetchData();
    } catch (error) {
      console.error("Error deleting wishlist item:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="pt-28 grid xl:grid-cols-4 gap-2 md:grid-cols-3 md:gap-2 sm:grid-cols-2 mx-10 sm:mx-20 mb-36">
      {loading ? (
        Array.from(new Array(3)).map((_, index) => (
          <Box key={index} sx={{ width: 210, marginRight: 0.5, my: 5 }}>
            <Skeleton variant="rectangular" width={210} height={118} />

          </Box>
        ))
      ) : wishListData?.length > 0 ? (
        wishListData.map((item) => (
          <Card sx={{ maxWidth: 300 }} key={item._id}>
            <CardActionArea>
              <CardMedia
                sx={{ objectFit: "cover", height: "150px" }}
                component="img"
                height="100"
                image={`${base_url}/uploads/${item?.productId?.productImage}`}
                alt="Image"
                onClick={() => {
                  handleView(item.productId?._id);
                }}
              />
              <CardContent>
                <h4 className="font-bold inline-block ms-5">
                  {item.productId?.name}
                </h4>
                <button className="text-red-500">
                  <DeleteOutlineRounded onClick={() => handleDelete(item._id)} />
                </button>
              </CardContent>
            </CardActionArea>
          </Card>
        ))
      ) : (
        <div className="text-center w-screen h-screen flex items-center flex-col">
          <div className="w-1/3 h-1/2">
            <img
              src="https://i.pinimg.com/originals/f6/e4/64/f6e464230662e7fa4c6a4afb92631aed.png"
              alt="Empty Wishlist"
              className="w-full h-full "
            />
            <div className="flex flex-col justify-center items-center text-white">
              <Link to="/" className="bg-customPink text-white px-4 py-2 rounded">
                Explore Home
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

WishList.propTypes = {
  loading: PropTypes.bool,
};

export default WishList;
