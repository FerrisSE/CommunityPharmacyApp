import React from 'react';
import { Text, View } from 'react-native';

const ProfileScreen = ({ navigation, route }) => {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>This is {route.params.name}'s profile</Text>
		</View>
	);
};

export default ProfileScreen;