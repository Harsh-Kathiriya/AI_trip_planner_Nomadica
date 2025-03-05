import axios from 'axios';

export const getPlaceDetails = async (address) => {
  try {
    const response = await axios.get('http://localhost:3000/api/place-details', {
      params: { address },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching place details:', error);
    return null;
  }
};