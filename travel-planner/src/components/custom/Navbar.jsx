import React from 'react';

const Navbar = ({ days, selectedDay, viewHotels, viewAllActivities, handleDayClick, handleViewHotels, handleViewAllActivities }) => {
  return (
    <div className="w-full md:w-1/5 bg-gray-900 text-white p-4 md:sticky md:top-0">
      <h2 className="text-xl font-semibold mb-4">Navigation</h2>
      <div className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-4">
        <button
          className={`p-2 rounded-lg ${viewHotels ? 'bg-blue-500' : 'bg-gray-800 hover:bg-blue-500'}`}
          onClick={handleViewHotels}
        >
          Hotels
        </button>
        <button
          className={`p-2 rounded-lg ${viewAllActivities ? 'bg-blue-500' : 'bg-gray-800 hover:bg-blue-500'}`}
          onClick={handleViewAllActivities}
        >
          All Activities
        </button>
        {days.map((day, index) => (
          <button
            key={index}
            className={`p-2 rounded-lg ${selectedDay === day ? 'bg-blue-500' : 'bg-gray-800 hover:bg-blue-500'}`}
            onClick={() => handleDayClick(day)}
          >
            Day {day}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navbar;