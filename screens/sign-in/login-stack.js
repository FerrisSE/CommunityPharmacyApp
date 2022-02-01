import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterAccountScreen from './register-account';
import ForgotPasswordScreen from './forgot-password';
import PrivacyAcceptanceScreen from './privacy-acceptance';
import { LoginScreen } from './login';

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
				name="Register"
				component={RegisterAccountScreen}
			/>
			<Stack.Screen
				name="Forgot Password"
				component={ForgotPasswordScreen}
			/>
			<Stack.Screen
				name="Privacy Agreement"
				component={PrivacyAcceptanceScreen}
				options={({ route }) => ({
					headerShown: false
				})}
			/>
		</Stack.Navigator>
	);
};