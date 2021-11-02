import React from 'react';
import { Button, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Card from '../components/card';
import MedicationCard from '../components/medication-card';
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons"

const CurrentMedicationScreen = ({ navigation }) => {

	return (
		<View>
			<Text style={MedsStyles.sectionTitle}>My Meds</Text>
			<FlatList
				data={[{ key: 'a' }, { key: 'b' }, { key: 'c' }, { key: 'd' }]}
				renderItem={({ item }) => <MedicationCard />}
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
})