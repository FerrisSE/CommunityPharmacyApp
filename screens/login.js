import React from 'react';
import { Button, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { changeStack } from '../App';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import mainStyles from '../main-styles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import RegisterAccountScreen from './register-account';
import ForgotPasswordScreen from './forgot-password';

const Stack = createNativeStackNavigator();

const LoginScreen = ({ navigation }) => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Main"
				component={LoginMainScreen}
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
		</Stack.Navigator>
	);
};

export default LoginScreen;


const LoginMainScreen = ({ navigation }) => {
	return (
		<View style={mainStyles.container}>
			<Text style={mainStyles.title}>Login</Text>

			<View style={{ marginBottom: 40 }} />

			<Text style={mainStyles.subheader}>Username</Text>
			<TextInput style={mainStyles.textInput} placeholder="username" />

			<Text style={mainStyles.subheader}>Password</Text>
			<TextInput secureTextEntry={true} style={mainStyles.textInput} placeholder="password" />

			<View style={{ margin: 20 }}>
				<BouncyCheckbox text="Keep me Logged in" onPress={(isChecked) => { }} fillColor="#2196F3" textStyle={{
					textDecorationLine: "none",
				}} />
			</View>

			<Button
				title="Login"
				onPress={() => changeStack('Main')}
			/>

			<View style={mainStyles.rowFull}>
				<TouchableOpacity style={[mainStyles.center, { margin: 40 }]} onPress={() => { navigation.push("Register") }}>
					<Text style={mainStyles.textImportant}>Register</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[mainStyles.center, { margin: 40 }]} onPress={() => { navigation.push("Forgot Password") }}>
					<Text style={mainStyles.textImportant}>Forgot your Password?</Text>
				</TouchableOpacity>
			</View>


		</View>
	)
}
