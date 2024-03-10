// RoomList.js
import React, { useState, useEffect } from 'react';
import { database } from '../utils/firebase';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [newRoomName, setNewRoomName] = useState('');

  useEffect(() => {
    const roomsRef = database.ref('rooms');
    
    // Listen for changes in the 'rooms' node
    roomsRef.on('value', (snapshot) => {
      const roomsData = snapshot.val();
      if (roomsData) {
        const roomsArray = Object.keys(roomsData).map((roomId) => ({
          id: roomId,
          name: roomsData[roomId].name,
        }));
        setRooms(roomsArray);
      } else {
        setRooms([]);
      }
    });

    // Clean up the listener when the component unmounts
    return () => roomsRef.off('value');
  }, []);

  const createRoom = () => {
    // Add a new room to the 'rooms' node in the Realtime Database
    database.ref('rooms').push({
      name: newRoomName,
    });
    setNewRoomName('');
  };

  return (
    <div>
      <h2>Liste des Salons</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>{room.name}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Nom du nouveau salon"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
        />
        <button onClick={createRoom}>Créer un salon</button>
      </div>
    </div>
  );
};

export default RoomList;
