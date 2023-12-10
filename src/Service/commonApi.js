import { commonApi } from "./allApi"
import { base_url } from "./baseUrl"


// register
 export const registerUserAPi =async(user)=>{
    return await commonApi("POST",`${base_url}/user/register`,user,"")
 }
 // get all users
 export const getAllusersApi = async(header)=>{
  return await commonApi("GET",`${base_url}/user/register`,"",header)
 }

 /// login

 export const loginUserApi = async(user)=>{
   return await commonApi("POST",`${base_url}/user/login`,user,"")
 }
 //edit user

 export const editUserApi = async(body,header)=>{
  return await commonApi("PUT",`${base_url}/user/edit`,body,header)
 }

 // login as a host

 export const loginHostApi = async(header)=>{
  return await commonApi("POST",`${base_url}/host/login`,"",header)
 }
//post all products
export const addAllProductsApi =async(body,header)=>{
  return await commonApi("POST",`${base_url}/host/addProperty`,body,header)
}
 // get all products

 export const getHomeApi = async()=>{
  return await commonApi("GET",`${base_url}/home/allhomes`,"","")
 }

 // view products
 export const viewProductApi = async(id)=>{
  return await commonApi("GET",`${base_url}/home/products/${id}`,"","")
 }

 // wishlist

 export const wishListAddApi = async(body,header)=>{
  return await commonApi("POST",`${base_url}/user/wishlist`,body,header)
 }

 //getWishList

 export const getWishlistApi = async(header)=>{
  return await commonApi("GET",`${base_url}/home/wishlist`,"",header)
 }
 //delete wishlist
 export const removeWishlistApi = async(id,reqHeader)=>{
  return await commonApi("DELETE",`${base_url}/product/wishlist/${id}`,{},reqHeader)
 }
//checks
export const checkDetailsApi = async(body,header)=>{
  return await commonApi("POST",`${base_url}/products/check`,body,header)
}

// get checks
export const getChecksApi = async(header)=>{
  return await commonApi("GET",`${base_url}/product/finalcheck`,"",header)
}

// request booking
export const requestBookingApi = async(body)=>{
  return await commonApi("PUT",`${base_url}/product/confirmBooking`,body,"")
}
// edit checkin

export const editCheckinApi = async(body)=>{
  return await commonApi("PUT",`${base_url}/product/check/edit`,body,"")
}

export const editCheckoutApi = async(body)=>{
  return await commonApi("PUT",`${base_url}/product/check/checkout`,body,"")
}
export const editguestApi = async(body)=>{
  return await commonApi("PUT",`${base_url}/product/check/guest`,body,"")
}

export const removeHomeApi = async(id,header)=>{
  return await commonApi("DELETE",`${base_url}/product/${id}`,{},header)
}

// to get user booked homes
export const getUserBookedHomesAPi = async(header)=>{
  return await commonApi ("GET",`${base_url}/products/check`,"",header)
}

// to get user hosted Homes
export const getUserHostedHomesApi = async(header)=>{
  return await commonApi('GET',`${base_url}/homes/host`,"",header)
}

// to get details of hosts 

export const getHostFromProductsApi = async(id)=>{
  return await commonApi('GET',`${base_url}/product/host/${id}`,"")
}

// to edit details of homes
export const editHomesApi = async(body,header)=>{
  return await commonApi("PUT",`${base_url}/product/edit`,body,header)
}
// to give reviews
export const reviewHomes = async(body,header)=>{
  return await commonApi("POST",`${base_url}/user/review`,body,header)
}

// to get reviews
export const getReviewsApi = async (header)=>{
  return await commonApi("GET",`${base_url}/user/review`,"",header)
}

