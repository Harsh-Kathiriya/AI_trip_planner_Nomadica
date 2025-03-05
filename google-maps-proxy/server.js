const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const GOOGLE_API_KEY = process.env.VITE_APP_GOOGLE_MAPS_API_KEY;

app.use(cors());
app.use(express.json());

app.get('/api/place-details', async (req, res) => {
  try {
    const { address } = req.query;

    // Get Place ID from address
    const placeIdUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json`;
    const placeIdResponse = await axios.get(placeIdUrl, {
      params: {
        input: address,
        inputtype: 'textquery',
        fields: 'place_id',
        key: GOOGLE_API_KEY,
      },
    });

    const placeId = placeIdResponse.data.candidates[0]?.place_id;
    if (!placeId) return res.status(404).json({ error: 'Place ID not found' });

    // Get place details including reviews and rating from Place ID
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json`;
    const detailsResponse = await axios.get(detailsUrl, {
      params: {
        place_id: placeId,
        fields: 'name,formatted_address,photos,reviews,rating,url,user_ratings_total',
        key: GOOGLE_API_KEY,
      },
    });

    const placeDetails = detailsResponse.data.result;
    res.json(placeDetails);
  } catch (error) {
    console.error('Error fetching place details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});