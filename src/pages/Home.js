import React from 'react'
import "./home.css"
import logo from "../images/logo_les_mellian_jeux.png"
import RoomList from './RoomList'

function Home() {
  return (
    <section className='accueilContainer'>
      <div className='accueil'>
        <img src={logo} alt="logo" height={150} />
        {/* <div><RoomList /></div> */}
      </div>
    </section>
  )
}

export default Home