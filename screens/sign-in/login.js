import React from 'react';
import { SafeAreaView, View } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Dialog, { DialogButton, DialogContent, DialogFooter } from 'react-native-popup-dialog';
import { PRIMARY_COLOR } from '../../colors'
import { PrimaryButton } from '../../components/buttons';
import { Input } from '../../components/input';
import { TextHeader1, TextSubHeader1, TextSubHeader2 } from '../../components/text';
import axios from 'axios';

export const LoginScreen = ({ navigation }) => {
	let [showDialog, setDialog] = React.useState(false)
	let [inputUsername, setInputUsername] = React.useState('')
	let [inputPassword, setInputPassword] = React.useState('')

	let Login = () => {
		let success = false;

		var config = {
			method: 'post',
			url: 'http://localhost:8080/api/login',
			auth: {
				username: inputUsername,
				password: inputPassword,
			}
		};

		axios(config)
			.then(function (response) {
				console.log(response);
				navigation.push('Privacy Agreement');
			})
			.catch(function (error) {
				console.log(error);
				setDialog(true);
			});

		return success;
	};

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
				<PrimaryButton label="Login" onPress={Login}
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
