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
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { SERVER_URL } from '../../constants';
import { changeStack } from '../../app-nav';

WebBrowser.maybeCompleteAuthSession();

export const LoginScreen = ({ navigation }) => {
	let [showDialog, setDialog] = React.useState(false)
	let [dialogText, setDialogText] = React.useState('');
	let [inputUsername, setInputUsername] = React.useState('')
	let [inputPassword, setInputPassword] = React.useState('')

	const dispatch = useDispatch();

	let Login = (stackName) => {
		var config = {
			method: 'post',
			url: `${SERVER_URL}/auth/login`,
			data: {
				email: inputUsername,
				password: inputPassword,
			}
		};

		axios(config)
			.then(resp => {
				dispatch(setToken(`Bearer ${resp.data.accessToken}`));
				changeStack(stackName);
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
				`http://localhost:8080/oauth2/authorize/epic?redirect_uri=http%3A%2F%2Flocalhost%3A19006%2F`
			);

			let redirectData;
			if (result.url) {
				redirectData = Linking.parse(result.url);
				dispatch(setToken(`Bearer ${redirectData.queryParams.token}`));
				changeStack('Patient');
			}
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<SafeAreaView style={{ alignItems: "center" }}>
			<View style={{ padding: 12, width: "100%", maxWidth: 600 }}>
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

				<View style={{ marginTop: 20, marginBottom: 20 }}>
					<PrimaryButton style={{ marginBottom: 8 }} label="Login" onPress={() => Login('Patient')}
					/>
					<PrimaryButton label="Login as Pharmacist" onPress={() => Login('Pharmacist')} />
				</View>

				<View style={{ flex: 0, flexGrow: 0, alignItems: 'center' }}>
					<TextNote text="Don't have an account?" style={{ margin: 8 }} />
					<PrimaryButton label="Sign Up" onPress={goToRegister} style={{ paddingLeft: 16, paddingRight: 16 }} />

					<TextNote text="or" style={{ margin: 8 }} />
					<PrimaryButton
						label="Login with MyChart"
						onPress={openMyChartLogin}
						style={{ backgroundColor: "#CE3545", paddingLeft: 16, paddingRight: 16 }}
						icon="folder-heart"
						iconSide="left"
					/>
				</View>
			</View>

			<Modal
				visible={showDialog}
				onTouchOutside={() => setDialog(false)}
			>
				<ModalContent>
					<TextSubHeader2 text={dialogText} />
				</ModalContent>
				<ModalFooter>
					<ModalButton
						text="OK"
						onPress={() => setDialog(false)}
						key="button-1"
					/>
				</ModalFooter>
			</Modal>
		</SafeAreaView>
	)
}
