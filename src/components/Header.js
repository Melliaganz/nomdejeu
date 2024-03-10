import React from 'react'
import "./header.css"
import logo from "../images/Le_Maillon_faible_logo_2014.png"

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
        <img src={logo} alt='logo' height={50}></img>
        <button className='bouttonHeader'><span className="material-symbols-outlined">
menu
</span></button>
    </header>
)
}

export default Header