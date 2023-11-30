import React, { createContext, useState } from 'react'
import { getHomeApi, getWishlistApi } from '../Service/commonApi'

export const RoleProvide = createContext()
export const GetHomeContext = createContext()
function ContextRole({children}) {
 const [userRole,setUserRole]=useState(sessionStorage.getItem("token")?JSON.parse(localStorage.getItem("role")):'user')
 const [logine,setLogine] =useState(false)
 const [homeData,setHomeData]=useState([])
 const [wishListData,setWishListData]= useState([])
 const [selectedTab,setSelectedTab]= useState("")
 const [checkUser, setCheckUser] = useState({
  checkinDate:"",
  checkoutDate:"",
  guests:1

});


 const getAllHomes = async () => {
  try {
    const response = await getHomeApi();
    setHomeData(response.data.homes)
  } catch (error) {
    console.error('Error fetching homes:', error);
  }
};


  return (
    <>
<RoleProvide.Provider value={{userRole,logine,setLogine,setUserRole}}>
  <GetHomeContext.Provider value={{getAllHomes,homeData,selectedTab,setSelectedTab,setHomeData,setWishListData,wishListData,checkUser,setCheckUser}}>{children}</GetHomeContext.Provider></RoleProvide.Provider>
    </>
  )
}

export default ContextRole