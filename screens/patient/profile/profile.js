import { useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons"
import { useSelector } from 'react-redux';
import { PRIMARY_COLOR } from '../../../colors';
import { Card } from '../../../components/cards';
import { TextBody, TextSubHeader1, TextSubHeader2 } from '../../../components/text';
import { SERVER_URL } from '../../../constants';

const Stack = createNativeStackNavigator();

const ProfileScreen = ({ navigation, route }) => {
	const [profileData, setProfileData] = useState({});

	const logout = () => {
		//TODO: remove sign in details from redux
		navigation.navigate("Login");
	}

	const userToken = useSelector((state) => state.userToken.value);
	const isFocused = useIsFocused();
	useEffect(() => {
		// get the profile data
		axios({
			method: 'get',
			url: `${SERVER_URL}/user/me`,
			headers: {
				Authorization: userToken,
			}
		}).then(response => {
			console.log(response);
			setProfileData(response.data);
		});
	}, [isFocused]);

	const EditProfile = () => {
		navigation.navigate("Edit Profile");
	}

	return (
		<ScrollView>
			<View style={{ margin: 16 }}>
				<View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
					<TextSubHeader1 text={`${profileData.firstName} ${profileData.lastName}`} />
					<Pressable onPress={EditProfile} style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
						<Icon name='pencil-box-outline' size={16} color={PRIMARY_COLOR} />
						<TextBody style={{ color: PRIMARY_COLOR }} text="Edit Profile" />
					</Pressable>
				</View>

				<TextSubHeader2 text="Date of Birth" style={{ marginTop: 8 }} />
				<Card depth={1} style={{ padding: 14, margin: 4 }}>
					<TextBody text={profileData.birthdate} />
				</Card>

				<TextSubHeader2 text="Address" style={{ marginTop: 8 }} />
				<Card depth={1} style={{ padding: 14, margin: 4 }}>
					<TextBody text={profileData.address} />
				</Card>

				<TextSubHeader2 text="Contact" style={{ marginTop: 8 }} />
				<Card depth={1} style={{ padding: 14, margin: 4 }}>
					<TextBody text={`Phone: ${profileData.phoneNumber}`} />
				</Card>
				<Card depth={1} style={{ padding: 14, margin: 4 }}>
					<TextBody text={`Email: ${profileData.email}`} />
				</Card>

				<TextSubHeader2 text="Insurance on File" style={{ marginTop: 8 }} />
				<Card depth={1} style={{ padding: 14, margin: 4 }}>
					<TextSubHeader1 text="Insurance Provider" />
					<TextBody text="Subscriber Name: Allen Curtis" style={{ marginTop: 4 }} />
					<TextBody text="Subscriber Number: 100002038427384" style={{ marginTop: 4 }} />
					<TextBody text="Member Number: 427384" style={{ marginTop: 4 }} />
					<TextBody text="Group Number: 427384" style={{ marginTop: 4 }} />
				</Card>

				<TextSubHeader2 text="Care Team" style={{ marginTop: 8 }} />
				<Card depth={1} style={{ padding: 14, margin: 4 }}>
					<TextSubHeader1 text="Meghan F Lecanst, MD" />
					<TextBody text="Primary Care" />
				</Card>
				<Card depth={1} style={{ padding: 14, margin: 4 }}>
					<TextSubHeader1 text="Daniel G Smith, PA-C" />
					<TextBody text="Dermatology" />
				</Card>

				<TextSubHeader2 text="Patient Info" style={{ marginTop: 8 }} />
				<Card depth={1} style={{ padding: 14, margin: 4 }}>
					<TextBody text="Current Health Issues: High blood pressure and Diabetes" />
					<TextBody text="Allergies: None" />
				</Card>

				<Pressable onPress={logout}>
					<Card depth={1} style={{ padding: 14, margin: 4, marginTop: 8, flex: 1, flexDirection: "row", alignItems: "center" }}>
						<Icon name="exit-to-app" color={PRIMARY_COLOR} size={24} />
						<TextSubHeader2 text="Logout" style={{ marginLeft: 16 }} />
					</Card>
				</Pressable>
			</View>
		</ScrollView>
	)
}

export default ProfileScreen;