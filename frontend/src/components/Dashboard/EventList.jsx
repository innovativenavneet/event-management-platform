// filepath: /home/navneet/Desktop/event-management-platform/frontend/src/components/Dashboard/EventList.jsx
import React from 'react';
import EventItem from './EventItem';

const EventList = ({ events }) => {
  return (
    <div>
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;