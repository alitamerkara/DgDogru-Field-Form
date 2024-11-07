import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/pages/Home';
import Form from './src/pages/Form';
import DailyReport from './src/pages/DailyReport';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { MyProvider } from './src/context/Context';




const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <MyProvider>
    <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ color}) => {
          if (route.name === 'Ana Sayfa') {
            return <Entypo name="home" size={24} color={color} />;
          } else if (route.name === 'Form') {
            return <AntDesign name="form" size={24} color={color} />
          }else if (route.name === 'Günlük Rapor') {
            return <Entypo name="text-document" size={24} color={color} />
          }
        },
        tabBarActiveTintColor: '#56c74a',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Ana Sayfa" component={Home} />
      <Tab.Screen name="Form" component={Form} />
      <Tab.Screen name="Günlük Rapor" component={DailyReport} />
    </Tab.Navigator>
    </MyProvider>
    </NavigationContainer>
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
