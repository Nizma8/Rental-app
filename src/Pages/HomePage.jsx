import React, { useContext } from 'react'
import { RoleProvide } from '../ContextShare/ContextRole'
import AdminHome from '../Components/AdminHome'
import UserHome from '../Components/UserHome'

function HomePage() {
  const {userRole} =useContext(RoleProvide)

  return (
    <>
    <>
    
        <AdminHome/>
      
     
    </>
    </>
  )
}

export default HomePage