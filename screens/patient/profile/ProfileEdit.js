import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import PhoneInput from 'react-phone-number-input/react-native-input';
import { useSelector } from "react-redux";
import { GRAY_1, PRIMARY_COLOR, PRIMARY_COLOR_TRANSPARENT } from "../../../colors";
import { OutlineButton, PrimaryButton } from "../../../components/buttons";
import { DatePicker } from "../../../components/date-picker";
import { Input } from "../../../components/input";
import { TextHeader2, TextNote } from "../../../components/text";
import { SERVER_URL } from "../../../constants";

export const ProfileEdit = ({ navigation }) => {
	const [firstName, setFirstname] = useState('');
	const [lastName, setLastname] = useState('');
	const [address, setAddress] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [email, setEmail] = useState('');

	const userToken = useSelector((state) => state.userToken.value);
	const isFocused = useIsFocused();
	useEffect(async () => {
		// get the profile data
		let profile = (await axios({
			method: 'get',
			url: `${SERVER_URL}/user/me`,
			headers: {
				Authorization: userToken,
			}
		})).data;

		setFirstname(profile.firstName);
		setLastname(profile.lastName);
		setAddress(profile.address);
		setPhoneNumber(profile.phoneNumber);
		setEmail(profile.email);
	}, [isFocused]);

	const PressCancel = () => {
		navigation.navigate("Profile");
	}

	const PressSave = async () => {
		await axios({
			method: 'patch',
			url: `${SERVER_URL}/user/me`,
			headers: {
				Authorization: userToken,
			},
			data: {
				firstName: firstName,
				lastName: lastName,
				address: address,
				phoneNumber: phoneNumber,
				email: email,
			}
		});

		navigation.navigate("Profile");
	}

	return (
		<ScrollView style={{ padding: 16 }}>
			<TextHeader2 text="Edit Profile" style={{ marginBottom: 16 }} />

			<TextNote text="First Name" />
			<Input placeholder="First Name" defaultText={firstName} setText={setFirstname} />

			<TextNote text="Last Name" />
			<Input placeholder="Last Name" defaultText={lastName} setText={setLastname} />

			<TextNote text="Address" />
			<Input placeholder="Address" defaultText={address} setText={setAddress} />

			<TextNote text="Phone Number" />
			<PhoneInput
				defaultCountry="US"
				placeholder="phone number"
				value={phoneNumber}
				onChange={setPhoneNumber}
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
			<Input placeholder="Email" defaultText={email} setText={setEmail} />

			<PrimaryButton label="Save" onPress={PressSave} style={{ margin: 16, marginBottom: 0 }} />
			<OutlineButton label="Cancel" onPress={PressCancel} style={{ margin: 16 }} />
		</ScrollView>
	)
}