import React from 'react';
import { Text, View } from 'react-native';

const ProfileScreen = ({ navigation, route }) => {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Patient Profile</Text>
		</View>
	);
};

export default ProfileScreen;