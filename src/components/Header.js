import React from 'react'
import "./header.css"
import logo from "../images/logo_les_mellian_jeux.png"
import { Link } from 'react-router-dom'
import { remove } from 'firebase/database';
import { getAuth, deleteUser } from 'firebase/auth';

function Header({ user, displayName }) {

  const handleDeleteAccount = async () => {
    const auth = getAuth(); // Récupérer l'objet d'authentification
    try {
      await deleteUser(auth.currentUser); // Supprimer le compte de l'utilisateur actuellement connecté
      console.log("Compte utilisateur supprimé avec succès.");
    } catch (error) {
      console.error("Erreur lors de la suppression du compte utilisateur :", error);
    }
  };

  return (
    <header className='header'>
      <Link to={"/"}>
        <img src={logo} alt='logo' height={50} width={100}></img>
      </Link>

      <div className='menuContainer'>
        <button className='bouttonHeader' onClick={handleDeleteAccount}>
          <div className='username' style={{ color: 'white' }}>{user ? `Connecté en tant que ${displayName}` : 'Utilisateur anonyme'}</div> {/* Afficher le nom d'utilisateur */}
          <span className="material-symbols-outlined">
            menu
          </span>
        </button>
      </div>
    </header>
  )
}

export default Header
