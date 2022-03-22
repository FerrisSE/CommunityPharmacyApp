import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable, View } from 'react-native';
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons"
import { PRIMARY_COLOR } from '../../../colors';
import { Card } from '../../../components/cards';
import { TextBody, TextHeader3, TextSubHeader2 } from '../../../components/text';

const Stack = createNativeStackNavigator();

const ProfileScreen = ({ navigation, route }) => {
	// we need the nav of the patient/pharmacist/login stack in order to logout, not the patient stack
	const { nav } = route.params;

	const logout = () => {
		//TODO: remove sign in details from redux
		nav.navigate("Login");
	}

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

			<Pressable onPress={logout}>
				<Card depth={1} style={{ padding: 14, margin: 4, flex: 1, flexDirection: "row", alignItems: "center" }}>
					<Icon name="exit-to-app" color={PRIMARY_COLOR} size={24} />
					<TextSubHeader2 text="Logout" style={{ marginLeft: 16 }} />
				</Card>
			</Pressable>
		</View>
	)
}

export default ProfileScreen;