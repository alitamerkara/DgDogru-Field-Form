import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { getFirestore, collection, getDocs, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import {app} from '../../firebaseConfig';

const db = getFirestore();

const DailyReport = () => {
    const [reports, setReports] = useState([]);
    const navigation = useNavigation();


    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'reports'), (snapshot) => {
            const reportsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setReports(reportsData);
        });
        return () => unsubscribe();
    }, []);
    const deleteReport = async (id) => {
        const db = getFirestore(app);
        const reportDoc = doc(db, "reports", id);
        await deleteDoc(reportDoc);
        setReports(reports.filter(report => report.id !== id));
    };
    const renderItem = ({ item }) => {
        return(
                        <View style={styles.reportItem}>
                            <Text>{item.tarih}</Text>
                            <Text>{item.firma}</Text>
                            <Text>{item.birimFiyat} ₺</Text>
                            <Text>{item.kilo} kg</Text>
                            <Text>{item.toplam} ₺</Text>
                            <Text>{item.ödenen} ₺</Text>
                            <Text>{item.kalan} ₺</Text>
                            <Text>{item.ödeme}</Text>
                            <Button title="Delete" onPress={() => deleteReport(item.id)} />
                        </View>
        )
    }

    return (
        <View style={styles.container}>
            {reports.length === 0 ? (
                <Text>Henüz rapor eklenmedi</Text>
            ) : (
                <FlatList
                    data={reports}
                    keyExtractor={(item) => item.id}
                    renderItem={(renderItem)}   
                />
            )}
            <Button title="Add Report" onPress={() => navigation.navigate('Form')} />
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
