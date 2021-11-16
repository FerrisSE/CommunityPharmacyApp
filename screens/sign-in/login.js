import React from 'react';
import { Button, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import mainStyles from '../../main-styles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterAccountScreen from './register-account';
import ForgotPasswordScreen from './forgot-password';
import PrivacyAcceptanceScreen from '../privacy-acceptance';
import { changeStack } from '../../App';
import Dialog, { DialogButton, DialogContent, DialogFooter } from 'react-native-popup-dialog';

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

export default LoginScreen;

// hardcoded users for patient and pharmacist
const Login = (username, password, navigation) => {
	if (username == "pharma1" && password == "password123") {
		changeStack('Pharmacist')
		return true
	}
	else if (username == "patient1" && password == "password123") {
		navigation.push('Privacy Agreement')
		return true
	}

	return false
}

const LoginMainScreen = ({ navigation }) => {
	let [showDialog, setDialog] = React.useState(false)
	let [inputUsername, setInputUsername] = React.useState('')
	let [inputPassword, setInputPassword] = React.useState('')

	return (
		<View style={mainStyles.container}>
			<Text style={mainStyles.title}>Login</Text>

			<View style={{ marginBottom: 40 }} />

			<Text style={mainStyles.subheader}>Username</Text>
			<TextInput
				style={mainStyles.textInput}
				placeholder="username"
				onChangeText={text => setInputUsername(text)}
				defaultValue={inputUsername}
			/>

			<Text style={mainStyles.subheader}>Password</Text>
			<TextInput
				secureTextEntry={true}
				style={mainStyles.textInput}
				placeholder="password"
				onChangeText={text => setInputPassword(text)}
				defaultValue={inputPassword}
			/>

			<View style={{ margin: 20 }}>
				<BouncyCheckbox text="Keep me Logged in" onPress={(isChecked) => { }} fillColor="#2196F3" textStyle={{
					textDecorationLine: "none",
				}} />
			</View>

			<Button
				title="Login"
				onPress={() => {
					// if it fails, show dialog
					if (!Login(inputUsername, inputPassword, navigation)) {
						setDialog(true)
					}
				}}
			/>

			<Dialog
				visible={showDialog}
				onTouchOutside={() => setDialog(false)}
				footer={
					<DialogFooter>
						<DialogButton
							text="OK"
							onPress={() => setDialog(false)}
						/>
					</DialogFooter>
				}
			>
				<DialogContent>
					<Text style={[mainStyles.textImportant, { padding: 8, fontSize: 16 }]}>Invalid Username or Password!</Text>
				</DialogContent>
			</Dialog>

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
