import React from 'react';

const HotelCard = ({ hotel }) => {
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-sm text-white p-4 rounded-xl shadow-lg">
      {hotel.photos.length > 0 && 
        <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${hotel.photos[0].photo_reference}&key=${import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}`} 
             alt={hotel.name} 
             className="w-full h-32 object-cover rounded-lg mb-4" />}
      <h4 className="text-xl font-semibold">{hotel.name}</h4>
      <p className="text-sm">{hotel.formatted_address}</p>
      <p className="text-sm">Rating: {hotel.rating} ({hotel.user_ratings_total} reviews)</p>
      <h5 className="text-lg font-semibold mt-4">User Reviews</h5>
      {hotel.reviews.slice(0, 3).map((review, index) => (
        <div key={index} className="mb-2">
          <p className="text-sm"><strong>{review.author_name}</strong>: {review.text} ({review.rating}/5)</p>
        </div>
      ))}
      <a href={hotel.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 mt-4 inline-block">
        More Reviews
      </a>
    </div>
  );
};

export default HotelCard;