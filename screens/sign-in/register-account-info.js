import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { OutlineButton, PrimaryButton } from '../../components/buttons';
import { Input } from '../../components/input';
import { TextHeader2, TextNote } from '../../components/text';

export const RegisterAccountInfoScreen = ({ navigation }) => {
	let navNext = () => navigation.push("Register Privacy Consent");
	let navBack = () => navigation.pop();

	return (
		<SafeAreaView style={{ padding: 16, paddingTop: 32 }}>
			<TextHeader2 text="Account Information" style={{ marginBottom: 16 }} />

			<TextNote text="Email" />
			<Input placeholder="Email" />

			<TextNote text="Password" />
			<Input placeholder="Password" hideText={true} />

			<TextNote text="Confirm Password" />
			<Input placeholder="Confirm Password" hideText={true} />

			<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
				<OutlineButton label="< Back" style={{ margin: 16 }} onPress={navBack} />
				<PrimaryButton label="Next >" style={{ paddingLeft: 25, paddingRight: 25, margin: 16 }} onPress={navNext} />
			</View>
		</SafeAreaView>
	);
};