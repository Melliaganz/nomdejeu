import React from 'react'
import "./header.css"
import logo from "../images/logo_les_mellian_jeux.png"

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
        <img src={logo} alt='logo' height={50} width={100}></img>
        <button className='bouttonHeader'><span className="material-symbols-outlined">
menu
</span></button>
    </header>
)
}

export default Header