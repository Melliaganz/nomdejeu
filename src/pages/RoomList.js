import React, { useState, useEffect } from 'react';
import { ref, push, onValue, set, get } from 'firebase/database';
import { Link } from 'react-router-dom';

const RoomList = ({ database, userId }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewRoomInput, setShowNewRoomInput] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');

  const handleRoomNameChange = (e) => {
    setNewRoomName(e.target.value);
  };
  
  useEffect(() => {
    const fetchData = () => {
      const roomsRef = ref(database, 'rooms');
      onValue(roomsRef, (snapshot) => {
        const roomsData = snapshot.val();
        const roomsArray = roomsData
          ? Object.entries(roomsData).map(([roomId, roomData]) => ({
              id: roomId,
              ...roomData,
            }))
          : [];
        setRooms(roomsArray);
        setLoading(false);
      }, (error) => {
        console.error('Error fetching rooms:', error.message);
        setLoading(false);
      });
    };

    fetchData();

    return () => {
      // Cleanup or unsubscribe if needed
    };
  }, [database]);

  const createRoom = async () => {
    try {
      if (!newRoomName.trim()) {
        alert('Veuillez saisir un nom pour le salon.');
        return;
      }

      const roomsRef = ref(database, 'rooms');
      const newRoomRef = push(roomsRef);

      await set(newRoomRef, { name: newRoomName, users: [] }, (error) => {
        if (error) {
          console.error('Erreur en créant le salon :', error.message);
          alert('Erreur en créant le salon. Veuillez réessayer.');
        } else {
          setRooms((prevRooms) => [...prevRooms, { id: newRoomRef.key, name: newRoomName, users: [] }]);
          setNewRoomName('');
          setShowNewRoomInput(false);
        }
      });
    } catch (error) {
      console.error('Erreur en créant le salon :', error.message);
      alert('Erreur en créant le salon. Veuillez réessayer.');
    }
  };
  const getParticipantsCount = async (roomId) => {
    const roomRef = ref(database, `rooms/${roomId}`);
    const snapshot = await get(roomRef);
  
    if (snapshot.exists()) {
      const roomData = snapshot.val();
      const participants = roomData.users || [];
      return participants.length;
    }
  
    return 0;
  };
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', backgroundColor: 'blue', borderRadius: 25, padding: 25 }}>
      {loading && <p>Loading...</p>}

      {!loading && rooms.length === 0 && <p>Aucun salon disponible</p>}

      {rooms.map((room) => (
  <div key={room.id} style={{ backgroundColor: 'red', padding: 10, borderRadius: 10, margin: 5 }}>
    <Link style={{ textDecoration: 'none', color: 'initial' }} to={`/room/${room.id}`}>
      {room.name} ({room.users ? room.users.length : 0} participants)
    </Link>{' '}
  </div>
))}


      {!showNewRoomInput && (
        <button
          style={{ backgroundColor: 'black', borderRadius: 25, padding: 10 }}
          onClick={() => setShowNewRoomInput(true)}
        >
          Créer salon
        </button>
      )}

      {showNewRoomInput && (
        <div>
          <input
            type="text"
            placeholder="Nom du nouveau salon"
            value={newRoomName}
            onChange={handleRoomNameChange}
            style={{ borderRadius: 25, padding: 10, borderWidth: 0, marginRight: 10, marginTop: 10 }}
          />

          <button
            style={{ backgroundColor: 'black', borderRadius: 25, padding: 10 }}
            onClick={createRoom}
          >
            Créer salon
          </button>
        </div>
      )}
    </div>
  );
};

export default RoomList;
