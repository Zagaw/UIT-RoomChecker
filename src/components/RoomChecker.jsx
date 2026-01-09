import React, { useState } from 'react';
import { timetables, allRooms } from '../data/timetables';

const RoomChecker = ({ userName }) => {
  const [day, setDay] = useState('Monday');
  const [time, setTime] = useState('8:30-9:30');
  const [freeRooms, setFreeRooms] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = [
    '8:30-9:30',
    '9:40-10:40',
    '10:50-11:50',
    '11:50-12:40',
    '12:40-1:40',
    '1:50-2:50',
    '3:00-4:00'
  ];

  const findFreeRooms = () => {
    // Special case: Lunchtime
    if (time === "11:50-12:40") {
      const allRoomArray = Array.from(allRooms).sort((a, b) => a - b);
      setFreeRooms(allRoomArray);
      setShowResults(true);
      return;
    }

    const bookedRooms = new Set();

    // Check all sections for booked rooms
    Object.values(timetables).forEach(section => {
      if (section[day] && section[day][time]) {
        section[day][time].forEach(room => {
          if (room && room.startsWith("Room(")) {
            const roomNumber = parseInt(room.slice(5, -1));
            if (!isNaN(roomNumber)) {
              bookedRooms.add(roomNumber);
            }
          }
        });
      }
    });

    // Find free rooms
    const freeRoomsArray = Array.from(allRooms)
      .filter(room => !bookedRooms.has(room))
      .sort((a, b) => a - b);

    setFreeRooms(freeRoomsArray);
    setShowResults(true);
  };

  return (
    <div 
      className="min-h-screen flex flex-col justify-center items-center p-4"
      style={{
        backgroundImage: 'url(/images/UITDark.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="text-center mb-8">
        <h1 className="text-white text-4xl font-bold mb-2">Welcome {userName}</h1>
        <div className="flex items-center justify-center gap-4 mb-4">
          <img 
            className="w-24 h-auto" 
            src="/images/UIT-Logo-big.png" 
            alt="UIT Logo"
          />
          <h1 className="glow-up text-uit text-3xl font-bold">University of Information Technology</h1>
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-4xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="form-group">
            <label htmlFor="day" className="text-gray-700 font-medium mb-2 block">
              Select Day
            </label>
            <select
              id="day"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              {days.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="time" className="text-gray-700 font-medium mb-2 block">
              Select Time
            </label>
            <select
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              {timeSlots.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={findFreeRooms}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Find Free Rooms
        </button>

        {showResults && (
          <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Available Rooms</h2>
            {freeRooms.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {freeRooms.map(room => (
                  <div
                    key={room}
                    className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center hover:bg-blue-100 transition cursor-pointer"
                  >
                    <span className="text-blue-700 font-bold text-lg">Room {room}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-500 text-lg">
                  No free rooms available at the selected time.
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <h2 className="glow-up-sub text-white text-xl mt-8 text-center">
        Towards a Brighter Future through Innovation in ICT
      </h2>
    </div>
  );
};

export default RoomChecker;