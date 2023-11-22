import React, { useContext } from 'react'
import { RoleProvide } from '../ContextShare/ContextRole'
import AdminHome from '../Components/AdminHome'
import UserHome from '../Components/UserHome'

function HomePage() {
  const {userRole} =useContext(RoleProvide)

  return (
    <>
    <>
      {
        userRole==="admin" || userRole==="host" ?<AdminHome/>:<UserHome/>
      }
     
    </>
    </>
  )
}

export default HomePage