import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import TextLink from '../components/text-link';
import mainStyles from '../main-styles';
import CurrentMedicationScreen from './current-medication';

const Stack = createNativeStackNavigator();

const ProfileScreen = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Profile"
				component={ProfileMainScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen name="Current Medication" component={CurrentMedicationScreen} />
		</Stack.Navigator>
	)
}

export default ProfileScreen;

const ProfileMainScreen = ({ navigation, route }) => {
	let [patient, setPatient] = React.useState('')
	let [loading, setLoading] = React.useState(true)
	let [error, setError] = React.useState(false)

	useEffect(() => {
		fetch('http://localhost:8080/api/patient/all', {
			"method": "GET",
			"headers": {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		}).then(response => response.json())
			.then(response => setPatient(response))
			.catch(err => setError(err))
			.finally(() => setLoading(false))
	}, []);


	if (error)
		return <ProfileFailed error_code={error} />
	if (loading)
		return <ProfileLoading />

	return <Profile patient={patient[0]} navigator={navigation} />
};

function ProfileLoading(props) {
	return <View style={mainStyles.center}>
		<Text style={styles.loadingText}>Loading</Text>
	</View>
}

function ProfileFailed(props) {
	return <View style={mainStyles.center}>
		<Text style={styles.errorText}>Something Went Wrong!</Text>
	</View>
}

function Profile({ patient, navigator }) {
	return <SafeAreaView style={mainStyles.container}>
		<View style={mainStyles.CardView}>
			<Text style={mainStyles.CardTitle}>{patient.givenName + ' ' + patient.familyName}</Text>
			<Text style={mainStyles.CardSubtitle}>Personal Information on Record</Text>
			<View style={mainStyles.row}>
				<Icon name="map-marker-radius" size={40} />
				<Text style={styles.information}>{patient.addressStreet + " "}</Text>
				<Text style={styles.information}>{patient.addressCity + ", "}</Text>
				<Text style={styles.information}>{patient.addressState + " "}</Text>
				<Text style={styles.information}>{patient.addressZipcode}</Text>
			</View>
			<View style={mainStyles.row}>
				<Icon name="phone" size={40} />
				<Text style={styles.information}>{patient.phoneNumber}</Text>
			</View>
			<View style={mainStyles.row}>
				<Icon name="account" size={40} />
				<Text style={styles.information}>{patient.gender}</Text>
			</View>
			<View style={mainStyles.row}>
				<Icon name="cake" size={40} />
				<Text style={styles.information}>{patient.birthdate}</Text>
			</View>
		</View>
		<TextLink label="Current Medication" onPress={() => { navigator.navigate('Current Medication') }} />
	</SafeAreaView>
}

const styles = StyleSheet.create({
	information: {
		fontWeight: "normal",
		fontSize: 20
	},
	errorText: {
		fontWeight: "bold",
		fontSize: 24,
		color: "crimson"
	},
	loadingText: {
		fontWeight: "bold",
		fontSize: 24
	},
});