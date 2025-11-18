import React, { createContext, useContext, useState } from 'react';

const EventsContext = createContext(null);

export function EventsProvider({ children }) {
    const [events, setEvents] = useState([]);

    const addEvent = (event) => {
        setEvents((prevEvents) => [...prevEvents, event]);
    };

    const value = { events, addEvent };
    return (
        <EventsContext.Provider value={value}>
            {children}
        </EventsContext.Provider>
    );
}

export function useEvents() {
    const context = useContext(EventsContext);
    if (!context) {
        throw new Error('useEvents must be used within an EventsProvider');
    }
    return context;
}