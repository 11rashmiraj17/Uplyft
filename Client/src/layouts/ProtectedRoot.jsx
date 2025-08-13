import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'


const ProtectedRoot = () => {
 const [isuserAuth,setUserAuth]=useState(true)
 
 const navigate= useNavigate()
 if(!isuserAuth){
  navigate('/')
 }

 return(
  <div>
    <Outlet/>
  </div>
 )


}

export default ProtectedRoot