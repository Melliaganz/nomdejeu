import React, { useState } from 'react';
import "./header.css";
import logo from "../images/logo_les_mellian_jeux.png";
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

function Header({ displayName }) {


  return (
    <header className='header'>
      <nav className="navbar">
        <Link to={"/"} className="logo">
          <img src={logo} alt='logo' height={50} width={100}></img>
        </Link>
        <div className='menuContainer'>
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic" className='username'>
          {displayName ? `Connecté en tant que ${displayName}` : 'Utilisateur anonyme'}
          <span className="material-symbols-outlined">
            menu
          </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/login" className='dropdownMenu'>Se connecter</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </div>
      </nav>
    </header>
  );
}

export default Header;
