import React from 'react';
import { View, Text, StyleSheet,Button } from 'react-native';

const Home = ({navigator}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Home Page</Text>
            <Button title="Forma Git" onPress={()=>navigator.navigate("Form")}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default Home;