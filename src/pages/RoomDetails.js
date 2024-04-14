import React from 'react'
import "./roomDetails.css"
import { useParams } from 'react-router-dom'

function RoomDetails({database}) {
    const {roomId} = useParams();
  return (
    <div className='roomDetailsContainer'>mon cul</div>
  )
}

export default RoomDetails