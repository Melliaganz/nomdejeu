import React from 'react'
import "./home.css"
import logo from "../images/Le_Maillon_faible_logo_2014.png"
import RoomList from './RoomList'

function Home() {
  return (
    <section className='accueilContainer'>
      <div className='accueil'>
        <img src={logo} alt="logo" height={150} />
        <div><RoomList /></div>
      </div>
    </section>
  )
}

export default Home