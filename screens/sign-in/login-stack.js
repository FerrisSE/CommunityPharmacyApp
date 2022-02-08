import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RegisterConsentFormScreen } from './register-consent';
import ForgotPasswordScreen from './forgot-password';
import { LoginScreen } from './login';
import { RegisterPersonalInfoScreen } from './register-personal-info';
import { RegisterAccountInfoScreen } from './register-account-info';

const Stack = createNativeStackNavigator();

export const LoginStack = ({ navigation }) => {
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
				name="Register Privacy Consent"
				component={RegisterConsentFormScreen}
				options={({ route }) => ({
					headerShown: false
				})}
			/>
		</Stack.Navigator>
	);
};