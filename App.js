import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ModalPortal } from 'react-native-modals';
import PatientScreenStack from './screens/patient/patient-screen-stack';
import { LoginStack } from './screens/sign-in/login-stack';
import { Provider } from 'react-redux';
import store from './redux/store';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PharmacistStack } from './screens/pharmacist/pharmacist-stack';
import { navigationRef, Stack } from './app-nav';

export default function App() {
  // all fonts used in app need to be loaded here first in order to work on mobile
  const [loaded] = useFonts({
    'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'OpenSans-BoldItalic': require('./assets/fonts/OpenSans-BoldItalic.ttf'),
    'OpenSans-ExtraBold': require('./assets/fonts/OpenSans-ExtraBold.ttf'),
    'OpenSans-ExtraBoldItalic': require('./assets/fonts/OpenSans-ExtraBoldItalic.ttf'),
    'OpenSans-Italic': require('./assets/fonts/OpenSans-Italic.ttf'),
    'OpenSans-Light': require('./assets/fonts/OpenSans-Light.ttf'),
    'OpenSans-LightItalic': require('./assets/fonts/OpenSans-LightItalic.ttf'),
    'OpenSans-Medium': require('./assets/fonts/OpenSans-Medium.ttf'),
    'OpenSans-MediumItalic': require('./assets/fonts/OpenSans-MediumItalic.ttf'),
    'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-SemiBold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
    'OpenSans-SemiBoldItalic': require('./assets/fonts/OpenSans-SemiBoldItalic.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
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
              component={PharmacistStack}
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
    </SafeAreaProvider>
  );
}