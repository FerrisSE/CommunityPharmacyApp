import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import MedicationCard from '../../../components/medication-card';
import BouncyCheckboxGroup from "react-native-bouncy-checkbox-group";

const DeliverOptions = [
	{
		id: 0,
		text: "Pick-up",
		fillColor: "#2196F3",
		textStyle: {
			fontSize: 24,
			textDecorationLine: "none",
		},
	},
	{
		id: 1,
		text: "Delivery",
		fillColor: "#2196F3",
		textStyle: {
			fontSize: 24,
			textDecorationLine: "none",
		},
	}
]

const MedicationRefillScreen = ({ navigation, route }) => {
	return (
		<View style={{ padding: 16, flex: 1 }}>
			<Text style={MedRefillStyles.textTitle}>Cart</Text>
			<FlatList
				data={route.params.meds}
				renderItem={(med) => <MedicationCard med={med.item} navigation={navigation} />}
				keyExtractor={item => item.display}
			/>

			<View style={{ flex: 1, justifyContent: "center" }}>
				<BouncyCheckboxGroup
					data={DeliverOptions}
					style={{ flexDirection: "column" }}
				/>
			</View>

			<Button title="Confirm Order" />
			<View style={{ paddingTop: 12 }} />
			<Button title="Cancel Order" />
		</View>
	);
};

export default MedicationRefillScreen;

const MedRefillStyles = StyleSheet.create({
	textTitle: {
		fontSize: 32,
		fontWeight: "700",
		padding: 12,
	},
})