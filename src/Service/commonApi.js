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