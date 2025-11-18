import { StatusBar } from 'expo-status-bar';
import { Stack } from "expo-router";
import React from 'react';
import { EventsProvider } from '../src/context/EventContext.jsx';

export default function RootLayout() {
    return (
        <React.Fragment>
            <StatusBar style="auto" />
            <EventsProvider>
                <Stack>
                    {/* Home Screen */}
                    <Stack.Screen name="index" options={{ title: "Home" }} />

                    {/* New Event Screen */}
                    <Stack.Screen name='new-event' options={{title: "New Event"}} />
                </Stack>
            </EventsProvider>
        </React.Fragment>
    );
}