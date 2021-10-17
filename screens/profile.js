import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import TextLink from '../components/text-link';
import mainStyles from '../main-styles';
import CurrentMedicationScreen from './current-medication';

const Stack = createNativeStackNavigator();

const ProfileScreen = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Profile Dashboard"
				component={ProfileMainScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Current Medication"
				component={CurrentMedicationScreen}
			/>
		</Stack.Navigator>
	)
}

export default ProfileScreen;

const ProfileMainScreen = ({ navigation, route }) => {
	let [patient, setPatient] = React.useState('')
	let [loading, setLoading] = React.useState(true)
	let [error, setError] = React.useState(false)

	useEffect(() => {
		fetch('http://localhost:8080/api/patient/fhir/full/egqBHVfQlt4Bw3XGXoxVxHg3', {
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
		return (
			<View style={mainStyles.center}>
				<Text style={styles.errorText}>Something Went Wrong!</Text>
			</View>
		)
	if (loading)
		return (
			<View style={mainStyles.center}>
				<Text style={styles.loadingText}>Loading</Text>
			</View>
		)

	return <Profile patient={patient} navigator={navigation} />
};

function Profile({ patient, navigator }) {
	return <ScrollView>
		<SafeAreaView style={mainStyles.container}>
			<Text style={mainStyles.title}>Profile</Text>
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

			<View style={styles.infoContainer}>
				<Text style={mainStyles.CardTitle}>Medication</Text>
				{patient.medications.map((med) => {
					return (
						<View style={mainStyles.CardView}>
							<Text style={styles.information}>{med.display}</Text>
						</View>
					)
				})}
			</View>

			<View style={styles.infoContainer}>
				<Text style={mainStyles.CardTitle}>Conditions</Text>
				{patient.conditions.map((cond) => {
					return (
						<View style={mainStyles.CardView}>
							<Text style={mainStyles.CardSubtitle}>{cond.display}</Text>
							<Text>{cond.clinicalStatus}      {cond.verification}</Text>
						</View>
					)
				})}
			</View>

			<View style={styles.infoContainer}>
				<Text style={mainStyles.CardTitle}>Allergies</Text>
				{patient.allergies.map((cond) => {
					return (
						<View style={mainStyles.CardView}>
							<Text style={mainStyles.CardSubtitle}>{cond.display}</Text>
							<Text>{cond.clinicalStatus}      {cond.verification}</Text>
						</View>
					)
				})}
			</View>
			{/* <TextLink label="Current Medication" onPress={() => { navigator.navigate('Current Medication') }} /> */}
		</SafeAreaView>
	</ScrollView>
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
	infoContainer: {
		padding: 8,
		marginTop: 8,
		marginBottom: 8,
		marginLeft: 16,
		marginRight: 16,
	},
});