export default function createEvent(title, date) {
    const  eventId = generateId();
    console.log(`Event created and stored with ID: ${eventId}`);
    return { 
        id: eventId, 
        title: title,
        date: date,
     };
}

function generateId() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    } else {
        // Fallback for very old environments if necessary (but not recommended)
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
    });
  }
}