import React, { useState, useEffect } from 'react';
import { ref, push, onValue, set } from 'firebase/database';

const RoomList = ({ database, userId }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joinedRooms, setJoinedRooms] = useState([]);

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

  const createRoom = async (roomName) => {
    try {
      const roomsRef = ref(database, 'rooms');
      const newRoomRef = push(roomsRef);
      await set(newRoomRef, { name: roomName, users: [] });
  
      // Mettre à jour l'état local pour inclure le nouveau salon
      setRooms((prevRooms) => [...prevRooms, { id: newRoomRef.key, name: roomName, users: [] }]);
    } catch (error) {
      console.error('Erreur en créant le salon :', error.message);
      alert('Erreur en créant le salon. Veuillez réessayer.');
    }
  };

  const joinRoom = (roomId) => {
    try {
      const roomsRef = ref(database, 'rooms');
      const roomRef = ref(roomsRef, roomId);

      onValue(roomRef, (snapshot) => {
        const roomData = snapshot.val();
        const existingUsers = roomData.users || [];

        if (!existingUsers.includes(userId)) {
          const updatedUsers = [...existingUsers, userId];
          set(roomRef, { ...roomData, users: updatedUsers });
          setJoinedRooms((prevJoinedRooms) => [...prevJoinedRooms, roomId]);
        } else {
          alert('Vous êtes déjà dans ce salon.');
        }
      });
    } catch (error) {
      console.error('Erreur en rejoignant le salon :', error.message);
      alert('Erreur en rejoignant le salon. Veuillez réessayer.');
    }
  };

  return (
    <div style={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center' }}>
      {loading && <p>Loading...</p>}

      {!loading && rooms.length === 0 && <p>No rooms available.</p>}

      {rooms.map((room) => (
        <div key={room.id} style={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center' }}>
          {room.name}{' '}
          <button onClick={() => joinRoom(room.id)}>Join Room</button>
          <div>Users: {room.users ? room.users.join(', ') : 'No users'}</div>
        </div>
      ))}

      <button style={{ backgroundColor: 'blue', borderRadius: 25, padding: 10 , display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center' }}  onClick={() => createRoom('New Room')}>
        Créer salon
      </button>

      <div style={{ marginTop: '20px', backgroundColor: 'blue', padding: 15, borderRadius: 25, display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center' }}>
        <h2>Joined Rooms</h2>
        {joinedRooms.length === 0 && <p>No joined rooms.</p>}
        {joinedRooms.map((roomId) => (
          <div key={roomId} style={{ marginBottom: '5px' , display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center'  }}>
            Joined Room: {roomId}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomList;
