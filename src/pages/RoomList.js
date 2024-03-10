// // RoomList.js
// import React, { useState, useEffect } from 'react';
// import { app } from '../firebase';

// const RoomList = () => {
//   const [rooms, setRooms] = useState([]);
//   const [newRoomName, setNewRoomName] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const roomsRef = database.ref('rooms');

//     // Listen for changes in the 'rooms' node
//     roomsRef.on('value', (snapshot) => {
//       const roomsData = snapshot.val();
//       if (roomsData) {
//         const roomsArray = Object.keys(roomsData).map((roomId) => ({
//           id: roomId,
//           name: roomsData[roomId].name,
//         }));
//         setRooms(roomsArray);
//         setLoading(false);
//       } else {
//         setRooms([]);
//         setLoading(false);
//       }
//     });

//     // Clean up the listener when the component unmounts
//     return () => roomsRef.off('value');
//   }, []);

//   const createRoom = () => {
//     // Add a new room to the 'rooms' node in the Realtime Database
//     database.ref('rooms').push({
//       name: newRoomName,
//     });
//     setNewRoomName('');
//   };

//   return (
//     <div>
//       <h2>Liste des Salons</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <ul>
//           {rooms.map((room) => (
//             <li key={room.id}>{room.name}</li>
//           ))}
//         </ul>
//       )}
//       <div>
//         <input
//           type="text"
//           placeholder="Nom du nouveau salon"
//           value={newRoomName}
//           onChange={(e) => setNewRoomName(e.target.value)}
//         />
//         <button onClick={createRoom}>Créer un salon</button>
//       </div>
//     </div>
//   );
// };

// export default RoomList;
