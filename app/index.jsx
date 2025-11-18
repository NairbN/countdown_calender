// Index file
import React, { use, useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, FlatList } from 'react-native';
import { useRouter } from 'expo-router'
import { useEvents } from '../src/context/EventContext.jsx';
import { getCountdownString } from '../src/models/event.js';


export default function HomeScreen() {
    const router = useRouter();
    const { events } = useEvents();
    const [now, setNow] = useState(new Date());

    const handleAddEvent = () => {
        router.push('/new-event');
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const renderEvent = ({ item }) => (
      <View style={styles.eventItem}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventDate}>{item.date.toString()}</Text>
        <Text style={styles.eventCountdown}>{getCountdownString(item.date, now)}</Text>
      </View>
    );

    return (
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>

          <FlatList
            data={events}
            keyExtractor={(event) => event.id}
            renderItem={renderEvent}
            ListEmptyComponent={<Text>No events yet</Text>}
            style={styles.list}
          />

          <Button title="Add New Event" onPress={handleAddEvent} />



        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: { flex: 1 },
  eventItem: { paddingVertical: 8 },
  eventTitle: { fontSize: 18, fontWeight: '500' },
  eventDate: { fontSize: 14, opacity: 0.7 },
});
