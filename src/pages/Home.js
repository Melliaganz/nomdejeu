import React from 'react';
import "./home.css";
import logo from "../images/0001-0059.gif";
import RoomList from './RoomList';

// Destructure the 'database' prop
function Home({ database }) {
  return (
    <section className='accueilContainer'>
      <div className='accueil'>
        <div className='salonsAccueil'><RoomList database={database} /></div>
      </div>

    </section>
  );
}

export default Home;
