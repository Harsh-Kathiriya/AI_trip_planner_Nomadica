import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { getPlaceDetails } from './utils/getPlaceDetails';
import ParticlesBg from './components/custom/ParticlesBg';
import Navbar from './components/custom/Navbar.jsx';
import DayView from './components/custom/DayView';
import HotelCard from './components/custom/HotelCard';
import ActivityCard from './components/custom/ActivityCard';


const MyTrip = () => {
  const location = useLocation();
  const { result } = location.state;
  const data = result ? JSON.parse(result) : { hotels: [], itinerary: [] };
  const [selectedDay, setSelectedDay] = useState(1);
  const [viewHotels, setViewHotels] = useState(false);
  const [viewAllActivities, setViewAllActivities] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const hotelDetails = await Promise.all(data.hotels.map(hotel => getPlaceDetails(hotel.address)));
      const activityDetails = await Promise.all(data.itinerary.flatMap(day => day.activities).map(activity => getPlaceDetails(activity.address)));
      
      setHotels(hotelDetails.filter(hotel => hotel !== null));
      setActivities(activityDetails.filter(activity => activity !== null));
      setLoading(false);
    };

    fetchData();
  }, [data]);

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setViewHotels(false);
    setViewAllActivities(false);
  };

  const handleViewHotels = () => {
    setSelectedDay(null);
    setViewHotels(true);
    setViewAllActivities(false);
  };

  const handleViewAllActivities = () => {
    setSelectedDay(null);
    setViewHotels(false);
    setViewAllActivities(true);
  };

  const handleCardClick = (activity) => {
    setModalData(activity);
  };

  const closeModal = () => {
    setModalData(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      <ParticlesBg />
      
      <Navbar
        days={data.itinerary.map(day => day.day)}
        selectedDay={selectedDay}
        viewHotels={viewHotels}
        viewAllActivities={viewAllActivities}
        handleDayClick={handleDayClick}
        handleViewHotels={handleViewHotels}
        handleViewAllActivities={handleViewAllActivities}
      />

      <div className="w-full md:w-4/5 p-8">
        <AnimatePresence>
          {viewHotels && (
            <motion.div
              key="hotels"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <h2 className="text-3xl font-semibold mb-6">Hotels</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {hotels.map((hotel, index) => (
                  <HotelCard key={index} hotel={hotel} />
                ))}
              </div>
            </motion.div>
          )}

          {viewAllActivities && (
            <motion.div
              key="all-activities"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <h2 className="text-3xl font-semibold mb-6">All Activities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {activities.map((activity, index) => (
                  <ActivityCard key={index} activity={activity} onClick={handleCardClick} />
                ))}
              </div>
            </motion.div>
          )}

          {selectedDay !== null && 
            data.itinerary
              .filter(day => day.day === selectedDay)
              .map(day => (
                <DayView key={day.day} day={day} activities={activities} onCardClick={handleCardClick} />
              ))
          }

        </AnimatePresence>
      </div>

      {modalData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white p-8 rounded-lg relative w-11/12 md:w-3/4 max-w-3xl">
            <button className="absolute top-4 right-4 text-white" onClick={closeModal}>
              <FaTimes size={24} />
            </button>
            <h2 className="text-2xl font-semibold mb-4">{modalData.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {modalData.photos.map((photo, index) => (
                <img key={index} src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}`} alt={modalData.name} className="w-full h-48 object-cover rounded-lg mb-4" />
              ))}
            </div>
            <p className="mb-2">{modalData.formatted_address}</p>
            <p className="mb-2">Rating: {modalData.rating}</p>
            <h4 className="text-xl font-semibold mb-2">User Reviews</h4>
            <div className="flex overflow-x-auto space-x-4">
              {modalData.reviews.slice(0, 3).map((review, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg min-w-[300px]">
                  <p className="font-semibold">{review.author_name}</p>
                  <p className="text-sm">{review.text}</p>
                  <p className="text-sm">Rating: {review.rating}</p>
                </div>
              ))}
            </div>
            <a href={modalData.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 mt-4 inline-block">
              More Reviews
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTrip;