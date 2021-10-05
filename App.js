import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './screens/home';
import ProfileScreen from './screens/profile';
import CurrentMedicationScreen from './screens/current-medication';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Current Medication" component={CurrentMedicationScreen} />
        <Drawer.Screen name="Personal Information" component={ProfileScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
