import React from 'react';

const ActivityCard = ({ activity, onClick }) => {
  return (
    <div
      className="bg-white bg-opacity-10 backdrop-blur-sm text-white p-4 rounded-xl shadow-lg cursor-pointer"
      onClick={() => onClick(activity)}
    >
      {activity.photos.length > 0 && 
        <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${activity.photos[0].photo_reference}&key=${import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}`} 
             alt={activity.name} 
             className="w-full h-32 object-cover rounded-lg mb-4" />}
      <h4 className="text-xl font-semibold">{activity.name}</h4>
      <p className="text-sm">{activity.formatted_address}</p>
      <p className="text-sm">Rating: {activity.rating} ({activity.user_ratings_total} reviews)</p>
    </div>
  );
};

export default ActivityCard;