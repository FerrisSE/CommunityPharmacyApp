import React from 'react';
import { Button, Text, View } from 'react-native';

const HomeScreen = ({ navigation }) => {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Home Screen</Text>
			<Button
				title="Profile"
				onPress={() => navigation.push('Profile', { name: "Test User" })}
			/>
		</View>
	);
};

export default HomeScreen;