import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import createEvent from '../src/models/event.js';
import { useEvents } from '../src/context/EventContext.jsx';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function NewEventScreen() {
    const [title, setTitle] = useState('New Event');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const router = useRouter();
    const { addEvent } = useEvents();

    const handleAddEvent = () => {
        const event = createEvent(title, date);
        addEvent(event);
        router.back();
    };

    const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker);
    };

    const onDateChange = ({ type }, selectedDate) => {
        if (type === 'set' && selectedDate) {
            setShowDatePicker(false);
            setDate(selectedDate);
        } else {
            setShowDatePicker(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Create a New Event</Text>
            <TextInput
                style={styles.input}
                placeholder="Event Title"
                value={title}
                onChangeText={setTitle}
            />

            {showDatePicker && (
                <DateTimePicker
                    mode="date"
                    display="spinner"
                    value={date}
                    onChange={onDateChange}
                />
            )}

            {!showDatePicker && (
                <Pressable onPress={toggleDatePicker}>
                    <TextInput
                        style={styles.input}
                        placeholder="Sat Aug 21 2004"
                        value={date.toDateString()}
                        editable={false}
                        pointerEvents="none"
                    />
                </Pressable> 
            )}
            <Button title="Add Event" onPress={handleAddEvent} />
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
    input: {
        width: '80%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
        marginVertical: 10,
    },
});
