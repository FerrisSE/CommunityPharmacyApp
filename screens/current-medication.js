import React, { useEffect } from 'react';
import { Button, FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Card } from '../components/card';
import MedicationCard from '../components/medication-card';
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons"
import mainStyles from '../main-styles';

const CurrentMedicationScreen = ({ navigation }) => {
	let [fhirPatient, setFhirPatient] = React.useState('')
	let [loading, setLoading] = React.useState(true)
	let [error, setError] = React.useState(false)
	let [searchText, setSearchText] = React.useState('')

	useEffect(() => {
		fetch('http://localhost:8080/api/patient/fhir/full/egqBHVfQlt4Bw3XGXoxVxHg3', {
			"method": "GET",
			"headers": {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		}).then(response => response.json())
			.then(response => setFhirPatient(response))
			.catch(err => setError(err))
			.finally(() => setLoading(false))
	}, []);

	if (error)
		return (
			<View style={mainStyles.center}>
				<Text style={MedsStyles.errorText}>Something Went Wrong!</Text>
			</View>
		)
	if (loading)
		return (
			<View style={mainStyles.center}>
				<Text style={MedsStyles.loadingText}>Loading</Text>
			</View>
		)


	return (
		<View>
			<TextInput
				style={mainStyles.textInput}
				placeholder="search"
				onChangeText={text => setSearchText(text)}
				defaultValue={searchText}
			/>
			<View style={[mainStyles.rowSpaced, { paddingBottom: 12, paddingRight: 16 }]}>
				<Text style={MedsStyles.sectionTitle}>Current Medication</Text>
				<Button title="Select Refills" />
			</View>
			<FlatList
				data={fhirPatient.medications}
				renderItem={(med) => <MedicationCard med={med.item} navigation={navigation} />}
				keyExtractor={item => item.display}
			/>

			<Text style={MedsStyles.sectionTitle}>Past Prescriptions</Text>
			<PastPrescriptsAllowCard />
		</View>

	);
};

export default CurrentMedicationScreen;

const PastPrescriptsAllowCard = () => {
	return (
		<Card backgroundColor="#F0F1F4">
			<View style={MedsStyles.prescripCardInfoView}>
				<Icon name="information-outline" size={16} />
			</View>
			<Text style={MedsStyles.prescripCardTitle}>Grant Access to Medical History</Text>
			<Text style={MedsStyles.prescripCardDesc}>Allowing access to your medical history will let you see your prescription history.</Text>
			<Button title="Allow" />
			<View style={{ paddingBottom: 12 }} />
		</Card>
	);
}

const MedsStyles = StyleSheet.create({
	sectionTitle: {
		paddingLeft: 16,
		paddingTop: 38,
		paddingBottom: 12,
		fontSize: 42,
		fontWeight: 300,
	},
	prescripCardInfoView: {
		width: "100%",
		flex: 1,
		alignItems: "flex-end"
	},
	prescripCardTitle: {
		fontSize: 16,
		fontWeight: "bold"
	},
	prescripCardDesc: {
		fontSize: 14,
		paddingBottom: 24,
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
})