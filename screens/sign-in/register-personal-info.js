import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { OutlineButton, PrimaryButton } from '../../components/buttons';
import { Input } from '../../components/input';
import { TextHeader2, TextNote } from '../../components/text';

export const RegisterPersonalInfoScreen = ({ navigation }) => {
	let navNext = () => navigation.push("Register Account Info");
	let navBack = () => navigation.pop();

	return (
		<SafeAreaView style={{ padding: 16, paddingTop: 32 }}>
			<TextHeader2 text="Personal Information" style={{ marginBottom: 16 }} />

			<TextNote text="First Name" />
			<Input placeholder="First Name" />

			<TextNote text="Middle Name" />
			<Input placeholder="Middle Name" />

			<TextNote text="Last Name" />
			<Input placeholder="Last Name" />

			<TextNote text="Phone Number" />
			<Input placeholder="Phone Number" />

			<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
				<OutlineButton label="< Back" style={{ margin: 16 }} onPress={navBack} />
				<PrimaryButton label="Next >" style={{ paddingLeft: 25, paddingRight: 25, margin: 16 }} onPress={navNext} />
			</View>
		</SafeAreaView>
	);
};