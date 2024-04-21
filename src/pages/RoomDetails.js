import React from 'react'
import "./roomDetails.css"
import { useParams } from 'react-router-dom'

function RoomDetails({database}) {
    const {roomId} = useParams();
  return (
    <section className=''></section>
  )
}

export default RoomDetails