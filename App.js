import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ModalPortal } from 'react-native-modals';

import ProfileScreen from './screens/patient/profile/profile';
import SearchScreen from './screens/pharmacist/search-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PatientScreenStack from './screens/patient/patient-screen-stack';
import { LoginStack } from './screens/sign-in/login-stack';
import { Provider } from 'react-redux';
import store from './redux/store';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const navigationRef = React.createRef();

export const navigate = (routeName, params) => {
  navigationRef.current?.navigate(routeName, params);
}

export const changeStack = (stackName) => {
  resetRoot(stackName)
}

const resetRoot = (routeName) => {
  navigationRef.current?.resetRoot({
    index: 0,
    routes: [{ name: routeName }],
  });
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginStack}
            options={({ route }) => ({
              headerShown: false
            })}
          />
          <Stack.Screen
            name="Pharmacist"
            component={PharmacistApp}
            options={({ route }) => ({
              headerShown: false
            })}
          />
          <Stack.Screen
            name="Patient"
            component={PatientScreenStack}
            options={({ route }) => ({
              headerShown: false
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <ModalPortal />
    </Provider>
  );
}

const pharmacistStack = createNativeStackNavigator();

const PharmacistApp = ({ navigator }) => {
  return (
    <pharmacistStack.Navigator>
      <pharmacistStack.Screen
        name="Search"
        component={SearchScreen}
      />
      <pharmacistStack.Screen
        name="Patient Profile"
        component={ProfileScreen}
      />
    </pharmacistStack.Navigator>
  )
}
