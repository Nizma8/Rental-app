import React, { createContext, useState } from 'react'

export const RoleProvide = createContext()
function ContextRole({children}) {
 const [userRole,setUserRole]=useState(JSON.parse(localStorage.getItem("role")))
 const [logine,setLogine] =useState(false)
 const login=(role)=>{
     setUserRole(role)
 }
 const logout = (role)=>{
    setUserRole(role)
 }
  return (
    <>
<RoleProvide.Provider value={{userRole,login,logout,logine,setLogine,setUserRole}}>{children}</RoleProvide.Provider>
    </>
  )
}

export default ContextRole