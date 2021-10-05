import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const ProfileScreen = ({ navigation, route }) => {
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

	return <Profile patient={patient[0]} />
};

export default ProfileScreen;

function ProfileLoading(props) {
	return <View style={styles.center}>
		<Text style={styles.loadingText}>Loading</Text>
	</View>
}

function ProfileFailed(props) {
	return <View style={styles.center}>
		<Text style={styles.errorText}>Something Went Wrong!</Text>
	</View>
}

function Profile({ patient }) {
	return <SafeAreaView style={styles.container}>
		<View style={{ flex: 1 }}>
			<Text style={styles.title}>{patient.givenName + ' ' + patient.familyName}</Text>
			<View style={{
				alignSelf: 'stretch',
				borderBottomWidth: 1,
				borderBottomColor: '#000',
				marginTop: 10,
				marginBottom: 10
			}} />
			<Text style={styles.subheader}>Information on Record</Text>
			<View style={styles.row}>
				<Icon name="map-marker-radius" size={40} />
				<Text style={styles.information}>{patient.addressStreet + " "}</Text>
				<Text style={styles.information}>{patient.addressCity + ", "}</Text>
				<Text style={styles.information}>{patient.addressState + " "}</Text>
				<Text style={styles.information}>{patient.addressZipcode}</Text>
			</View>
			<View style={styles.row}>
				<Icon name="phone" size={40} />
				<Text style={styles.information}>{patient.phoneNumber}</Text>
			</View>
			<View style={styles.row}>
				<Icon name="account" size={40} />
				<Text style={styles.information}>{patient.gender}</Text>
			</View>
			<View style={styles.row}>
				<Icon name="cake" size={40} />
				<Text style={styles.information}>{patient.birthdate}</Text>
			</View>
		</View>
	</SafeAreaView>
}

const styles = StyleSheet.create({
	title: {
		fontWeight: "bold",
		fontSize: 48
	},
	subheader: {
		fontWeight: "bold",
		fontSize: 24
	},
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
	center: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	container: {
		margin: 20,
	},
	row: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center"
	}
});