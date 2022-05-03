import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RegisterConsentFormScreen } from './register-consent';
import ForgotPasswordScreen from './forgot-password';
import { LoginScreen } from './login';
import { Platform } from 'react-native';
import { RegisterPersonalInfoScreen } from './register-personal-info';
import { RegisterAccountInfoScreen } from './register-account-info';
import { RegisterPharmacyScreen } from './register-pharmacy';
import { RegisterSucceededScreen } from './register-succeeded';
import { RegisterAddressScreen } from './register-address';
import { useIsFocused } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';

const Stack = createNativeStackNavigator();

export const LoginStack = ({ navigation }) => {

	// use any orientation for login
	const isFocused = useIsFocused();
	useEffect(async () => {
		if (Platform.OS != 'web')
			await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL);
	}, [isFocused]);

	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Main"
				component={LoginScreen}
				options={({ route }) => ({
					headerShown: false
				})}
			/>
			<Stack.Screen
				name="Forgot Password"
				component={ForgotPasswordScreen}
			/>
			<Stack.Screen
				name="Register Personal Info"
				component={RegisterPersonalInfoScreen}
				options={({ route }) => ({
					headerShown: false
				})}
			/>
			<Stack.Screen
				name="Register Account Info"
				component={RegisterAccountInfoScreen}
				options={({ route }) => ({
					headerShown: false
				})}
			/>
			<Stack.Screen
				name="Register Address"
				component={RegisterAddressScreen}
				options={({ route }) => ({
					headerShown: false
				})}
			/>
			<Stack.Screen
				name="Register Preferred Pharmacy"
				component={RegisterPharmacyScreen}
				options={({ route }) => ({
					headerShown: false
				})}
			/>
			<Stack.Screen
				name="Register Privacy Consent"
				component={RegisterConsentFormScreen}
				options={({ route }) => ({
					headerShown: false
				})}
			/>
			<Stack.Screen
				name="Register Succeeded"
				component={RegisterSucceededScreen}
				options={({ route }) => ({
					headerShown: false
				})}
			/>
		</Stack.Navigator>
	);
};