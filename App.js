import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ProfileScreen from './screens/patient/profile/profile';
import LoginScreen from './screens/sign-in/login';
import SearchScreen from './screens/pharmacist/search-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PatientScreenStack from './screens/patient/patient-screen-stack';

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
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
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
          /* just hardcoding patient user to be the following */
          initialParams={{
            patient: {
              "givenName": "Joe",
              "familyName": "Bob",
              "phoneNumber": "123456789",
              "gender": "male",
              "birthdate": "2020-09-14",
              "addressStreet": "nothing",
              "addressZipcode": "456465",
              "addressCity": "nothing",
              "addressState": "nothing",
              "status": true,
              "consentTimeStamp": "2020-09-14",
              "conditions": null,
              "medications": null,
              "allergies": null
            }
          }}
        />
      </Stack.Navigator>

    </NavigationContainer>
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
