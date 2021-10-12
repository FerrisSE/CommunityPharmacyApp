import React from 'react';
import { Button, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { changeStack } from '../App';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import mainStyles from '../main-styles';

const LoginScreen = ({ navigation }) => {
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
				<TouchableOpacity style={[mainStyles.center, { margin: 40 }]} onPress={() => { }}>
					<Text style={mainStyles.textImportant}>Register</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[mainStyles.center, { margin: 40 }]} onPress={() => { }}>
					<Text style={mainStyles.textImportant}>Forgot your Password?</Text>
				</TouchableOpacity>
			</View>


		</View>
	);
};

export default LoginScreen;