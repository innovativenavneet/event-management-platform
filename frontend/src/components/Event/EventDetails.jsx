// filepath: /home/navneet/Desktop/event-management-platform/frontend/src/components/Event/EventDetails.jsx
import React from 'react';

const EventDetails = ({ event }) => {
  return (
    <div>
      <h2>{event.name}</h2>
      <p>{event.description}</p>
      <p>{new Date(event.date).toLocaleString()}</p>
      <p>{event.location}</p>
      <p>{event.category}</p>
      <p>Attendees: {event.attendees.length}</p>
    </div>
  );
};

export default EventDetails;