import React from 'react';
import { Button, SafeAreaView, Text, View } from 'react-native';

const HomeScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Home Screen</Text>
			<Button
				title="Patient Profile Screen"
				onPress={() => navigation.navigate('Profile')}
			/>
		</SafeAreaView>
	);
};

export default HomeScreen;