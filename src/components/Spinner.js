import React from 'react'
import loadingg from './loadingg.gif'

export default function Spinner() {
  return (
    <div className="text-center">
   < img src={loadingg} style={{height: "100px", width: "120px", marginTop:"20px"}} alt="loading"/>
   </div>
  )
}
