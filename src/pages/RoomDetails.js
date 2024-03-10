import React from 'react'
import { useParams } from 'react-router-dom'

function RoomDetails({database}) {
    const {roomId} = useParams();
  return (
    <div>RoomDetails</div>
  )
}

export default RoomDetails