import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Form = () => {
    const [selectedValue, setSelectedValue] = useState("");

    return (
        <View style={styles.container}>
         
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    picker: {
        height: 50,
        width: 200,
    },
});

export default Form;