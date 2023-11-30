import { commonApi } from "./allApi"
import { base_url } from "./baseUrl"


// register
 export const registerUserAPi =async(user)=>{
    return await commonApi("POST",`${base_url}/user/register`,user,"")
 }

 /// login

 export const loginUserApi = async(user)=>{
   return await commonApi("POST",`${base_url}/user/login`,user,"")
 }

 // login as a host

 export const loginHostApi = async(header)=>{
  return await commonApi("POST",`${base_url}/host/login`,"",header)
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