const questionsConfig = [
  {
    section: "General Information",
    fields: [
      {
        type: "location",
        label: "Where would you like to travel?",
        placeholder: "Enter your destination",
        isGoogleMaps: true,
      },
      {
        type: "noOfDays",
        label: "How many days?",
      },
      {
        type: "number",
        label: "How many people are traveling?",
        placeholder: "Enter the number of travelers",
      },
    ],
  },
  {
    section: "Travel Preferences",
    fields: [
      {
        type: "cards",
        label: "What type of experience are you looking for?",
        options: [
          { text: "Adventure", icon: "⛰" },
          { text: "Relaxation", icon: "🌴" },
          { text: "Cultural", icon: "🌏" },
          { text: "Wildlife", icon: "🦜" },
          { text: "Wellness", icon: "💆" },
          { text: "Culinary", icon: "🍲" },
        ],
      },
      {
        type: "cards",
        label: "Do you want a guided tour experience?",
        options: [
          { text: "Guided Tours", icon: "📋" },
          { text: "Self-Guided", icon: "🔍" },
          { text: "A Mix of Both", icon: "🔄" },
        ],
      },
    ],
  },
  {
    section: "Budget & Accommodation",
    fields: [
      {
        type: "cards",
        label: "What is your overall budget for the trip?",
        options: [
          { text: "Low", description: "Budget-friendly" },
          { text: "Mid-range", description: "Balanced and comfortable" },
          { text: "High", description: "Luxury options" },
        ],
      },
    ],
  },
];

/**
 * Generate prompt for travel plan
 * @param {Object} data - Form data
 * @param {Object} selectedOptions - Selected options from the form
 * @returns {string} - Formatted prompt
 */
export const generateTravelPlanPrompt = (data, selectedOptions) => {
  return `Generate a comprehensive travel plan for the location: ${data.location.label}, for a duration of ${data.noOfDays} days tailored for ${data.number > 1 ? 'a group of ' + data.number : 'a single'} traveler(s) with a ${selectedOptions["What is your overall budget for the trip?"] ? selectedOptions["What is your overall budget for the trip?"][0] : ""} budget. The user is looking for an experience that includes: ${selectedOptions["What type of experience are you looking for?"] ? selectedOptions["What type of experience are you looking for?"].join(", ") : ""}. They prefer a ${selectedOptions["Do you want a guided tour experience?"] ? selectedOptions["Do you want a guided tour experience?"][0] : ""} tour. Additional requirements: ${data.additionalRequirements}.

Please provide detailed descriptions, ensure the data is accurate, well-organized, and include user reviews. Give 10 hotel options, and include more places to visit per day so user have more option to choose from. 

The output should be in JSON format and structured as follows:

{
  "hotels": [
    {
      "name": "Hotel Name",
      "address": "Hotel Address",
      "price_per_night": "Price per night",
      "geo_coordinates": {
        "latitude": "Latitude",
        "longitude": "Longitude"
      },
      "description": "Description",
    }
    // More hotel objects...
  ],
  "itinerary": [
    {
      "day": 1,
      "transportation_options": [
        {
          "type": "Transportation Type (e.g., Taxi, Bus, Train)",
          "details": "Transportation Details (e.g., schedule, cost)"
        }
        // More transportation objects...
      ],
      "activities": [
        {
          "time_of_day": "Morning",
          "name": "Activity Name",
          "details": "Activity Details",
          "geo_coordinates": {
            "latitude": "Latitude",
            "longitude": "Longitude"
          },
          "ticket_pricing": "Ticket Pricing",
        }
        // More activities, ordered from morning to night (e.g., Afternoon, Evening, Night)...
      ]
    }
    // More day objects...
  ]
}

Provide detailed descriptions, ensure the data is accurate, well-organized, and include user reviews.`;
};

export default questionsConfig;