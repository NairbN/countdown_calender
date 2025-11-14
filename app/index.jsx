// Index file
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router'


export default function IndexScreen() {
    return (
        <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
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
});