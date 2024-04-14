import React from 'react';

function ModalDeco({ isOpen, onClose, onRefresh }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Vous avez été déconnecté</h2>
        <p>Veuillez cliquer sur le bouton ci-dessous pour rafraîchir la page et vous reconnecter.</p>
        <button onClick={onRefresh}>Rafraîchir la page</button>
      </div>
    </div>
  );
}

export default ModalDeco;
