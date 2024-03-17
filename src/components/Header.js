import React from 'react'
import "./header.css"
import logo from "../images/logo_les_mellian_jeux.png"
import { Link } from 'react-router-dom'

function Header({ user }) {
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

    <div className='menuContainer'>
    <button className='bouttonHeader'>
    <div className='username'style={{color: 'white'}}>{user ? `Connecté en tant que ${user.uid}` : 'Utilisateur anonyme'}</div> {/* Afficher le nom d'utilisateur */}
        <span className="material-symbols-outlined">
             menu
        </span>
    </button>
    </div>
    </header>
)
}

export default Header