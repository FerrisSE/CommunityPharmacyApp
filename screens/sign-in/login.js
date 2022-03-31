import React, { useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Modal, ModalFooter, ModalButton, ModalContent } from 'react-native-modals';
import { PRIMARY_COLOR } from '../../colors'
import { PrimaryButton } from '../../components/buttons';
import { Input } from '../../components/input';
import { TextHeader1, TextNote, TextSubHeader1, TextSubHeader2 } from '../../components/text';
import axios from 'axios';
import { setToken } from '../../redux/slices/user-token-slice';
import { useDispatch } from 'react-redux';
import { clearData } from '../../redux/slices/register-slice';
import { changeStack } from '../../App';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import base64 from 'react-native-base64';
import { SERVER_URL } from '../../constants';

WebBrowser.maybeCompleteAuthSession();

export const LoginScreen = ({ navigation }) => {
	let [showDialog, setDialog] = React.useState(false)
	let [dialogText, setDialogText] = React.useState('');
	let [inputUsername, setInputUsername] = React.useState('')
	let [inputPassword, setInputPassword] = React.useState('')

	const dispatch = useDispatch();

	let Login = () => {
		let token = 'Basic ' + base64.encode(`${inputUsername}:${inputPassword}`);

		var config = {
			method: 'post',
			url: `${SERVER_URL}/auth/login`,
			headers: {
				Authorization: token
			}
		};

		axios(config)
			.then(_ => {
				dispatch(setToken(token));
				changeStack('Patient');
			})
			.catch(error => {
				console.log(error);
				setDialogText('Invalid username or password!');
				setDialog(true);
			});
	};

	let goToRegister = () => {
		dispatch(clearData());
		navigation.push('Register Personal Info');
	}

	let openMyChartLogin = async () => {
		try {
			let result = await WebBrowser.openAuthSessionAsync(
				`https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A19006%2F&client_id=2b0103c4-4389-4f1a-843d-a0e132fcb5c3&aud=https://fhir.epic.com/interconnect-fhir-oauth/api/fhir/r4`
			);

			let redirectData;
			if (result.url) {
				redirectData = Linking.parse(result.url);
				console.log(redirectData);
				setDialogText("Got Token back");
				setDialog(true);
			}
		} catch (error) {
			console.error(error);
		}
	}

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

			<View style={{ flex: 1, flexGrow: 0, alignItems: 'center' }}>
				<TextNote text="Don't have an account?" style={{ margin: 8 }} />
				<PrimaryButton label="Sign Up" onPress={goToRegister} style={{ paddingLeft: 16, paddingRight: 16 }} />

				<TextNote text="or" style={{ margin: 8 }} />
				<PrimaryButton label="Login with MyChart" onPress={openMyChartLogin} style={{ paddingLeft: 16, paddingRight: 16 }} />
			</View>

			<Modal
				visible={showDialog}
				onTouchOutside={() => setDialog(false)}
				footer={
					<ModalFooter>
						<ModalButton
							text="OK"
							onPress={() => setDialog(false)}
						/>
					</ModalFooter>
				}
			>
				<ModalContent>
					<TextSubHeader2 text={dialogText} />
				</ModalContent>
			</Modal>
		</SafeAreaView>
	)
}
