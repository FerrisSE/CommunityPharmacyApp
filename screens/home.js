import React from 'react';
import { Button, Text, View } from 'react-native';

const HomeScreen = ({ navigation }) => {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Home Screen</Text>
			<Button
				title="Patient Profile Screen"
				onPress={() => navigation.navigate('Personal Information')}
			/>
		</View>
	);
};

export default HomeScreen;