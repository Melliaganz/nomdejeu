import React from 'react'
import "./header.css"
import logo from "../images/logo_les_mellian_jeux.png"
import { Link } from 'react-router-dom'

function Header() {
//     const isloggedIn = localStorage.getItem(logedIn)
//     if (isloggedIn){
//   return (
//     <div>connecté</div>
//   )
// } else {
//     <div> non connecté</div>
// }}
return(
    <header className='header'>
        <Link to={"/"}>
        <img src={logo} alt='logo' height={50} width={100}></img>
        </Link>
        <button className='bouttonHeader'><span className="material-symbols-outlined">
menu
</span></button>
    </header>
)
}

export default Header