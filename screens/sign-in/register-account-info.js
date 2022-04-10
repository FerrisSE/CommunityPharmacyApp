import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { OutlineButton, PrimaryButton } from '../../components/buttons';
import { Input } from '../../components/input';
import { TextHeader2, TextNote } from '../../components/text';
import { setEmail, setPassword, setPhone } from '../../redux/slices/register-slice';
import PhoneInput from 'react-phone-number-input/react-native-input';
import { GRAY_1, PRIMARY_COLOR, PRIMARY_COLOR_TRANSPARENT } from '../../colors';
import { isPossiblePhoneNumber } from 'react-phone-number-input';

export const RegisterAccountInfoScreen = ({ navigation }) => {
	let [passwordConfirm, setPasswordConfirm] = React.useState('');

	const dispatch = useDispatch();

	const phoneNumber = useSelector((state) => state.register.phoneNumber);
	const email = useSelector((state) => state.register.email);
	const password = useSelector((state) => state.register.password);

	const changePhoneNumber = (numb) => dispatch(setPhone(numb));
	const changeEmail = (email) => dispatch(setEmail(email));
	const changePassword = (pass) => dispatch(setPassword(pass));

	let navBack = () => navigation.pop();
	let navNext = () => {
		if (password != passwordConfirm || email == "" || password == "" || !isPossiblePhoneNumber(phoneNumber))
			return;

		navigation.push("Register Address");
	}

	return (
		<SafeAreaView style={{ padding: 16, paddingTop: 32 }}>
			<TextHeader2 text="Account Information" style={{ marginBottom: 16 }} />

			<TextNote text="Phone Number" />
			<PhoneInput
				defaultCountry="US"
				placeholder="phone number"
				value={phoneNumber}
				onChange={changePhoneNumber}
				style={{
					fontFamily: 'OpenSans-Regular',
					fontSize: 18,
					padding: 10,
					margin: 16,
					backgroundColor: PRIMARY_COLOR_TRANSPARENT,
					color: GRAY_1,
					borderColor: PRIMARY_COLOR,
					paddingLeft: 32,
					borderRadius: 25,
				}}
			/>

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