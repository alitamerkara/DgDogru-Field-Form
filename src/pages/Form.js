import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Platform, Button, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import { collection, addDoc } from "firebase/firestore";  
import { db } from '../../firebaseConfig';
// import { auth } from '../../firebase';


const Form = () => {
    const [firm, setFirm] = useState(null);
    const [kilo, setKilo] = useState(0);
    const [unitPrice, setUnitPrice] = useState(0);
    const [edit, setEdit] = useState(false);
    const [mustPay, setMustPay] = useState(0);
    const [payMethod, setPayMethod] = useState(0);
    const [form, setForm] = useState({});
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const [paid, setPaid] = useState(0);
    let total= kilo * unitPrice;
    let remaining = total - paid;
    const ödeme = [
        { label: 'Nakit', value: 'Nakit' },
        { label: 'Havale', value: 'Havale' },
      ];
      const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
      };
      const handlePress = async () => {
        const formattedDate = date.toLocaleString('tr-TR', {
          hour: '2-digit',
          minute: '2-digit',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit', 
        });
        try {
          const formData = {
            tarih: formattedDate,
            firma: firm,
            kilo: kilo,
            birimFiyat: unitPrice,
            toplam: total,
            ödenen: paid,
            kalan: remaining,
            ödeme: payMethod,
          };
      
          // Firestore koleksiyonuna form verisini ekleyin
          const docRef = await addDoc(collection(db, 'reports'), formData);
          console.log('Rapor başarıyla kaydedildi, ID: ', docRef.id);
      
          // İşlem tamamlandığında formu sıfırlayın
          setFirm('');
          setKilo(0);
          setUnitPrice(0);
          setPaid(0);
          setMustPay(0);
          setPayMethod('');
          setDate(new Date());  // Tarih sıfırlanabilir
      
          alert('Rapor başarıyla kaydedildi!');
        } catch (error) {
          console.error('Veri kaydedilirken hata oluştu: ', error);
          alert('Bir hata oluştu, lütfen tekrar deneyin.');
        }
      };
    return (
      <ScrollView style={styles.whole}>
      <View style={styles.date}>
        <Text style={styles.text}>Tarih :</Text>
      <DateTimePicker
          value={date}
          mode="date"
          locale='tr'
          display="default"
          onChange={onChange}
          maximumDate={new Date()}
        />
      </View>
      <View style={styles.container}>
    <TextInput
      style={styles.textInput}
      value={firm}
      placeholder="Firma Girin"
      placeholderTextColor="gray"
      onChangeText={(text) => setFirm(text)}
      />
      </View>
      <View style={styles.container}>
    <TextInput
      style={styles.textInput}
      value={unitPrice}
      placeholder="Kg Fiyatı"
      placeholderTextColor="gray"
      onChangeText={(text) => setUnitPrice(text)}
      keyboardType='numeric'
      />
      </View>
      <View style={styles.container}>
    <TextInput
      style={styles.textInput}
      value={kilo}
      placeholder="Alınan Kilo"
      placeholderTextColor="gray"
      onChangeText={(text) => setKilo(text)}
      keyboardType='numeric'
      />
      </View>
      <View style={styles.subContainer}>
        {edit ? (
          <View style={styles.editText}>
          <TextInput
      style={{border:"none" , width:"80%"}}
      value={mustPay}
      placeholder="Değer Girin"
      placeholderTextColor="gray"
      onChangeText={(text) => setMustPay(text)}
      keyboardType='numeric'
      /> 
      <Button title="Kaydet" onPress={() =>{setEdit(edit=>!edit)}
      } />
      </View>) :<Text style={styles.text}>Ödemesi Gereken Tutar  :  {mustPay !=0 ? mustPay : total} ₺</Text>}
      {edit? null :  <Button title="Düzenle" onPress={() => setEdit(edit=>!edit)} />}
     
      </View>
      <View style={styles.container}>
    <TextInput
      style={styles.textInput}
      value={paid}
      placeholder="Ödenen Tutar"
      placeholderTextColor="gray"
      onChangeText={(text) => setPaid(text)}
      keyboardType='numeric'
      />
      </View>
      <View style={styles.container}>
      <Text style={styles.totalText}>Kalan Tutar : {remaining} ₺</Text>
      </View>
      <View style={styles.container}>
          <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          data={ödeme}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Ödeme Yöntemi"
          searchPlaceholder="Ödeme Yöntemi"
          value={payMethod}
          onChange={item => {
            setPayMethod(item.value);
            setIsFocus(false);
          }}
        />
        </View>
        
        {/* <View style={styles.container}>
          <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="items"
          searchPlaceholder="Search Items"
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
        />
        </View> */}
   <Button title="Submit" onPress={handlePress} />
      </ScrollView>
    );
};

const styles = StyleSheet.create({
    whole: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        margin:10
      },
      textInput: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
      },
      text: {
        paddingTop:8, 
        fontSize:16
      },
      totalText:{
        paddingHorizontal:10
      },
      editText: {
        borderWidth:1,
        borderColor:"gray",
        width:"100%",
        borderRadius:12,
        flexDirection:"row",
        justifyContent:"space-between",
        padding:8
      },
    container: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius:16,
      },
      date: {
        backgroundColor: 'white',
        padding: 16,
        flexDirection: 'row',
        justifyContent:"flex-end",
        
      },
      subContainer: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius:16,
        flexDirection: 'row',
        justifyContent: 'space-around',
      },
      dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
});

export default Form;