// filepath: /home/navneet/Desktop/event-management-platform/frontend/src/components/Dashboard/EventItem.jsx
import React from 'react';

const EventItem = ({ event }) => {
  return (
    <div>
      <h3>{event.name}</h3>
      <p>{event.description}</p>
      <p>{new Date(event.date).toLocaleString()}</p>
      <p>{event.location}</p>
      <p>{event.category}</p>
      <p>Attendees: {event.attendees.length}</p>
    </div>
  );
};

export default EventItem;