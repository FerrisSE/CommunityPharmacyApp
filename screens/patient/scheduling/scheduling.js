import React from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import SchedulingButton from '../../../components/scheduling-card-button';

const vaccines = [
	{ name: "Covid-19 Vaccine" },
	{ name: "Influenza Vaccine" },
	{ name: "Flu Vaccine" }
]

const bloodTests = [
	{ name: "AC-1 Test" },
	{ name: "Whole Blood Glucose" },
	{ name: "Hemoglobin Test" }
]

const SchedulingScreen = ({ navigation }) => {
	return (
		<ScrollView style={SchldStyles.container}>
			<Text style={SchldStyles.title}>Scheduling Services</Text>

			<Text style={SchldStyles.subtitle}>Vaccines</Text>
			<FlatGrid
				itemDimension={240}
				data={vaccines}
				style={SchldStyles.gridView}
				spacing={10}
				renderItem={({ item }) => (
					<SchedulingButton icon="bandage" label={item.name} />
				)}
			/>

			<Text style={SchldStyles.subtitle}>Blood Tests</Text>
			<FlatGrid
				itemDimension={240}
				data={bloodTests}
				style={SchldStyles.gridView}
				spacing={10}
				renderItem={({ item }) => (
					<SchedulingButton icon="water-outline" label={item.name} />
				)}
			/>
		</ScrollView>
	);
};

export default SchedulingScreen;

const SchldStyles = StyleSheet.create({
	gridView: {
		marginTop: 10,
		flex: 1,
	},
	container: {
		padding: 12,
	},
	title: {
		fontSize: 32,
		fontWeight: "600",
		marginBottom: 16,
	},
	subtitle: {
		fontSize: 24,
		fontWeight: "600",
	},
})