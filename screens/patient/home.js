import React from 'react';
import { Button, SafeAreaView, Text, View } from 'react-native';
import { TextSubHeader2 } from '../../components/text';

export const HomeScreen = ({ navigation }) => {
	return (
		<View style={{ padding: 8 }}>
			<TextSubHeader2 text="Notifications" />
			<TextSubHeader2 text="Your next medication" />
		</View>
	);
};