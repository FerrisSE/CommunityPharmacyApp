import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ProfileScreen = ({ navigation, route }) => {
	let [patient, setPatient] = React.useState('')
	let [loading, setLoading] = React.useState(true)
	let [error, setError] = React.useState(false)

	useEffect(() => {
		fetch('http://localhost:8080/LocalPatient/Martin/Kucharek', {
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

	return <Profile patient={patient[0]} />
};

export default ProfileScreen;

function ProfileLoading(props) {
	return <View style={styles.center}>
		<Text style={styles.center}>Loading</Text>
	</View>
}

function ProfileFailed(props) {
	return <View style={styles.center}>
		<Text style={styles.errorText}>Something Went Wrong!</Text>
	</View>
}

function Profile(props) {
	console.log(props)
	return <View style={{ flex: 1, alignItems: 'center' }}>
		<Text style={styles.title}>Patient Profile</Text>
		<ProfileField text="Name:" value={props.patient.givenName + ' ' + props.patient.familyName} />
		<ProfileField text="Street:" value={props.patient.addressStreet} />
		<ProfileField text="City: " value={props.patient.addressCity} />
		<ProfileField text="State:" value={props.patient.addressState} />
		<ProfileField text="Zipcode:" value={props.patient.addressZipcode} />
		<ProfileField text="Birthday:" value={props.patient.birthdate} />
		<ProfileField text="Gender: " value={props.patient.gender} />
	</View>
}

function ProfileField(props) {
	return <Text style={styles.bold}>{props.text} <Text style={styles.information}>{props.value}</Text></Text>
}

const styles = StyleSheet.create({
	title: {
		fontWeight: "bold",
		fontSize: 32
	},
	bold: {
		fontWeight: "bold",
		fontSize: 16
	},
	information: {
		fontWeight: "normal",
		fontSize: 16
	},
	errorText: {
		fontWeight: "bold",
		fontSize: 24,
		color: "crimson"
	},
	center: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	}
});