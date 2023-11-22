import React from 'react'
import Category from './Category'
import PropertyDetails from '../Pages/PropertyDetails'
import PropertyDisplay from './PropertyDisplay'

function AdminHome() {
  return (
    <>
    <div className='pt-28 '>
      <Category/> 
      <PropertyDisplay/>
    </div>
    </>
  )
}

export default AdminHome