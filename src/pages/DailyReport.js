import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useMyContext } from '../context/Context';

const DailyReport = () => {
    const report = useMyContext();
    return (
        <View style={styles.container}>
            {report.map((item, index) => (<Text key={index}>{item}</Text>))}
            <Button title="Add Report" onPress={() => console.log(report)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

export default DailyReport;
