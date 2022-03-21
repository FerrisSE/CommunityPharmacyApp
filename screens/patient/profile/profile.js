import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import { Card } from '../../../components/cards';
import { TextBody, TextHeader3, TextSubHeader2 } from '../../../components/text';

const Stack = createNativeStackNavigator();

const ProfileScreen = ({ navigation, route }) => {
	return (
		<View style={{ margin: 16 }}>
			<TextHeader3 text="Allen Curtis" />

			<TextSubHeader2 text="Date of birth" style={{ marginTop: 8 }} />
			<Card depth={1} style={{ padding: 14, margin: 4 }}>
				<TextBody text="02/12/1964" />
			</Card>

			<TextSubHeader2 text="Address" style={{ marginTop: 8 }} />
			<Card depth={1} style={{ padding: 14, margin: 4 }}>
				<TextBody text="7475 Mulberry Dr. Grand Rapids, MI, 49536" />
			</Card>

			<TextSubHeader2 text="Contact" style={{ marginTop: 8 }} />
			<Card depth={1} style={{ padding: 14, margin: 4 }}>
				<TextBody text="616-566-7685" />
			</Card>
			<Card depth={1} style={{ padding: 14, margin: 4 }}>
				<TextBody text="allencurtis64@gmail.com" />
			</Card>
		</View>
	)
}

export default ProfileScreen;