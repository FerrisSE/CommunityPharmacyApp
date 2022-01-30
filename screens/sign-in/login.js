import React from 'react';
import { SafeAreaView, View } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterAccountScreen from './register-account';
import ForgotPasswordScreen from './forgot-password';
import PrivacyAcceptanceScreen from './privacy-acceptance';
import { changeStack } from '../../App.js';
import Dialog, { DialogButton, DialogContent, DialogFooter } from 'react-native-popup-dialog';
import { PRIMARY_COLOR } from '../../colors'
import { PrimaryButton } from '../../components/buttons';
import { Input } from '../../components/input';
import { TextHeader1, TextSubHeader1, TextSubHeader2 } from '../../components/text';

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
		<SafeAreaView style={{ margin: 16 }}>
			<TextHeader1 text="Login" style={{ marginTop: 40, marginBottom: 40 }} />

			<TextSubHeader1 text="Username" />
			<Input placeholder="username" setText={setInputUsername} defaultValue={inputUsername} />

			<TextSubHeader1 text="Password" />
			<Input placeholder="password" setText={setInputPassword} defaultValue={inputPassword} hideText={true} />

			<View style={{ margin: 20 }}>
				<BouncyCheckbox text="Keep me Logged in" onPress={(isChecked) => { }} fillColor={PRIMARY_COLOR} textStyle={{
					textDecorationLine: "none",
				}} />
			</View>

			<View style={{ marginTop: 20, marginBottom: 40 }}>
				<PrimaryButton label="Login" onPress={() => {
					// if it fails, show dialog
					if (!Login(inputUsername, inputPassword, navigation)) {
						setDialog(true)
					}
				}}
				/>
			</View>

			<Dialog
				visible={showDialog}
				onTouchOutside={() => setDialog(false)}
				footer={
					<DialogFooter
						children={
							<DialogButton
								text="OK"
								onPress={() => setDialog(false)}
							/>
						}
					/>
				}
			>
				<DialogContent>
					<TextSubHeader2 text="Invalid Username or Password!" style={{ margin: 8 }} />
				</DialogContent>
			</Dialog>
		</SafeAreaView>
	)
}
