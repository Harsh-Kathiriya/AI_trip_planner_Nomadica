import React from 'react';
import { motion } from 'framer-motion';
import ActivityCard from './ActivityCard';

const DayView = ({ day, activities, onCardClick }) => {
  const dayActivities = activities.filter(activity => activity.day === day.day);

  return (
    <motion.div
      key={day.day}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <h2 className="text-3xl font-semibold mb-6">Day {day.day}</h2>

      {/* Transportation Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Transportation Options</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {day.transportation_options.map((transport, index) => (
            <div key={index} className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold">{transport.type}</h4>
              <p className="text-sm">{transport.details}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Activities Section */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Activities</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dayActivities.map((activity, index) => (
            <ActivityCard key={index} activity={activity} onClick={onCardClick} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default DayView;