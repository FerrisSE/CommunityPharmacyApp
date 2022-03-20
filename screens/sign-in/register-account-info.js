import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { OutlineButton, PrimaryButton } from '../../components/buttons';
import { Input } from '../../components/input';
import { TextHeader2, TextNote } from '../../components/text';
import { setEmail, setPassword } from '../../redux/slices/register-slice';

export const RegisterAccountInfoScreen = ({ navigation }) => {
	let navBack = () => navigation.pop();
	let navNext = () => {
		if (password != passwordConfirm || email == "" || password == "")
			return;

		navigation.push("Register Preferred Pharmacy");
	}

	let [passwordConfirm, setPasswordConfirm] = React.useState('');

	const dispatch = useDispatch();

	const email = useSelector((state) => state.register.email);
	const password = useSelector((state) => state.register.password);

	const changeEmail = (email) => dispatch(setEmail(email));
	const changePassword = (pass) => dispatch(setPassword(pass));

	return (
		<SafeAreaView style={{ padding: 16, paddingTop: 32 }}>
			<TextHeader2 text="Account Information" style={{ marginBottom: 16 }} />

			<TextNote text="Email" />
			<Input placeholder="Email" defaultText={email} setText={changeEmail} />

			<TextNote text="Password" />
			<Input placeholder="Password" hideText={true} defaultText={password} setText={changePassword} />

			<TextNote text="Confirm Password" />
			<Input placeholder="Confirm Password" hideText={true} defaultText={passwordConfirm} setText={setPasswordConfirm} />

			<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
				<OutlineButton label="< Back" style={{ margin: 16 }} onPress={navBack} />
				<PrimaryButton label="Next >" style={{ paddingLeft: 25, paddingRight: 25, margin: 16 }} onPress={navNext} />
			</View>
		</SafeAreaView>
	);
};