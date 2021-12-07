import React, { useEffect } from 'react';
import { Button, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { Card } from '../../../components/card';
import MedicationCard from '../../../components/medication-card';
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons"
import mainStyles from '../../../main-styles';

const testMeds = {
	"patient-medications": [
		{
			"medicationName": "Acetaminophen",
			"drugPurpose": "Treats minor aches and pains, reduces fever.",
			"dose": "25 mg",
			"instructions": "Take 1 tablets every 4 hours as needed.",
			"currentRefills": 2,
			"totalRefills": 4,
			"totalQuantity": 20,
			"remainingQuantity": 15,
			"sideEffects": ["nausea", "loss of appetite"],
			"interactions": ["Alcohol", "Something else..."],
			"videoURL": "https://youtube.com",
			"pdf": []
		},
		{
			"medicationName": "drug 2",
			"drugPurpose": "does stuff",
			"dose": "100 mg",
			"instructions": "Take 1 tablets every other day with a meal.",
			"currentRefills": 4,
			"totalRefills": 10,
			"totalQuantity": 20,
			"remainingQuantity": 3,
			"sideEffects": ["drowsiness"],
			"interactions": [],
			"videoURL": "https://youtube.com/something",
			"pdf": []
		},
		{
			"medicationName": "drug 3",
			"drugPurpose": "does stuff",
			"dose": "100 mg",
			"instructions": "Take 1 tablets every other day with a meal.",
			"currentRefills": 4,
			"totalRefills": 10,
			"totalQuantity": 20,
			"remainingQuantity": 8,
			"sideEffects": ["drowsiness"],
			"interactions": [],
			"videoURL": "https://youtube.com/something",
			"pdf": []
		}
	]
}

const CurrentMedicationScreen = ({ navigation }) => {
	let [fhirPatient, setFhirPatient] = React.useState('')
	let [loading, setLoading] = React.useState(true)
	let [error, setError] = React.useState(false)
	let [searchText, setSearchText] = React.useState('')
	let [refillCart, setRefillCart] = React.useState([])

	const ChangeMedCart = (id, add) => {
		if (add) // adding med to cart
			setRefillCart([...refillCart, id])
		else // remove med from cart
			setRefillCart(refillCart.filter(med => med != id))
	}

	useEffect(() => {
		fetch('http://localhost:8080/api/patient/medications/0', {
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

	// show every med if they aren't searching
	let shownMeds = []
	if (searchText == "")
		shownMeds = testMeds["patient-medications"] //fhirPatient["patient-medications"]
	else
		shownMeds = testMeds["patient-medications"].filter(m => m.medicationName.includes(searchText)) // fhirPatient["patient-medications"].filter(m => m.medicationName.includes(searchText))


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
		<ScrollView>
			<TextInput
				style={mainStyles.textInput}
				placeholder="search"
				onChangeText={text => setSearchText(text)}
				defaultValue={searchText}
			/>
			<View style={[mainStyles.rowSpaced, { paddingBottom: 12, paddingRight: 16 }]}>
				<Text style={[MedsStyles.sectionTitle, { fontSize: 24 }]}>Current Medications</Text>
				{
					refillCart.length == 0 ?
						<Button title="Select Refills" disabled={true} />
						:
						<Button title="Order" onPress={() => {
							navigation.navigate({
								name: 'Refill Order',
								params: {
									meds: testMeds["patient-medications"].filter(med => refillCart.includes(med.medicationName)),
								}
							})
						}} />

				}
			</View>
			<FlatList
				data={shownMeds}
				renderItem={(med) => <MedicationCard med={med.item} navigation={navigation} updateCartFunction={ChangeMedCart} />}
				keyExtractor={item => item.medicationName}
			/>

			<Text style={MedsStyles.sectionTitle}>Past Prescriptions</Text>
			<PastPrescriptsAllowCard />
		</ScrollView>

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