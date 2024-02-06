// EventContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Event } from '../../types/Types';

interface EventContextProps {
  eventsList: Event[];
  addEvent: (newEvent: Event) => void;
  deleteEvent: (eventId: string) => void;
  editEvent: (eventId: string, updatedEvent: Event) => void;
}

const EventContext = createContext<EventContextProps | undefined>(undefined);

interface EventProviderProps {
  children: ReactNode;
}

export const EventProvider: React.FC<EventProviderProps> = ({ children }) => {
  const [eventsList, setEventsList] = useState<Event[]>([]);

  const addEvent = (newEvent: Event) => {
    setEventsList((prevEvents) => [...prevEvents, newEvent]);
  };

  const deleteEvent = (eventId: string) => {
    setEventsList((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
  };

  const editEvent = (eventId: string, updatedEvent: Event) => {
    const updatedEventsList = eventsList.map((event) =>
      event.id === eventId ? { ...updatedEvent,   } : event
    );
    setEventsList(updatedEventsList);
  };
  return (
    <EventContext.Provider value={{ eventsList, addEvent, deleteEvent, editEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = (): EventContextProps => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEventContext must be used within an EventProvider');
  }
  return context;
};
