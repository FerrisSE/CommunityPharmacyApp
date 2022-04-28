import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { OutlineButton, PrimaryButton } from '../../components/buttons';
import { DatePicker } from '../../components/date-picker';
import { Input } from '../../components/input';
import { TextHeader2, TextNote } from '../../components/text';
import { setBirthDate, setFirstName, setLastName, setMiddleName } from '../../redux/slices/register-slice';

export const RegisterPersonalInfoScreen = ({ navigation }) => {
	let navBack = () => navigation.pop();
	let navNext = () => {
		if (firstName == "" || middleName == "" || lastName == "" || birthDate == "")
			return;

		navigation.push("Register Account Info");
	}

	const dispatch = useDispatch();

	const firstName = useSelector((state) => state.register.firstName);
	const middleName = useSelector((state) => state.register.middleName);
	const lastName = useSelector((state) => state.register.lastName);
	const birthDate = useSelector((state) => state.register.birthDate);

	const changeFirstName = (name) => dispatch(setFirstName(name));
	const changeMiddleName = (name) => dispatch(setMiddleName(name));
	const changeLastName = (name) => dispatch(setLastName(name));
	const changeBirthDate = (date) => dispatch(setBirthDate(date));

	return (
		<SafeAreaView style={{ padding: 16, paddingTop: 32 }}>
			<TextHeader2 text="Personal Information" style={{ marginBottom: 16 }} />

			<TextNote text="First Name" />
			<Input placeholder="First Name" defaultText={firstName} setText={changeFirstName} />

			<TextNote text="Middle Name" />
			<Input placeholder="Middle Name" defaultText={middleName} setText={changeMiddleName} />

			<TextNote text="Last Name" />
			<Input placeholder="Last Name" defaultText={lastName} setText={changeLastName} />

			<TextNote text="Birth Date" />
			<DatePicker
				date={birthDate}
				setDate={changeBirthDate}
				minimumDate={new Date(1800, 1)}
				maximumDate={new Date()}
			/>

			<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
				<OutlineButton label="< Back" style={{ margin: 16 }} onPress={navBack} />
				<PrimaryButton label="Next >" style={{ paddingLeft: 25, paddingRight: 25, margin: 16 }} onPress={navNext} />
			</View>
		</SafeAreaView>
	);
};