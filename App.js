import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/Home/Home';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import Punch from './pages/Punch';
import Profile_Collection from './components/Profile_Collection';
import AddScreen from './pages/AddScreen';
import Footer from './components/Footer';
import Ranking from './pages/Ranking_Punch';
import { Provider } from 'react-redux';
import store from './store';
import DeleteCollection from './pages/DeleteCollection';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'Login'}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Punch" component={Punch} />
          <Stack.Screen name="Profile_Collection" component={Profile_Collection} />
          <Stack.Screen name="Add" component={AddScreen} />
          <Stack.Screen name="Ranking" component={Ranking} />
          <Stack.Screen name="Delete" component={DeleteCollection} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
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
