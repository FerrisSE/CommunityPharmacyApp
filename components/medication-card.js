import React from "react";
import { Button, Text, View } from "react-native";
import mainStyles from "../main-styles";

const MedicationCard = () => {
	return (
		<View style={mainStyles.CardView}>
			<Text style={mainStyles.CardTitle}>Drug Name</Text>
			<Text>Prescribed: 10/5/2021 by Prescriber Name</Text>

			<View style={{
				marginTop: 16
			}}>
				<Text style={mainStyles.textImportant}>Dosage</Text>
				<Text>10mg every 24 hours</Text>
			</View>

			<View style={{
				marginBottom: 16,
				marginTop: 8
			}}>
				<Text>Note:</Text>
				<View style={mainStyles.CardSubView}>
					<Text>Take once per day</Text>
				</View>
			</View>

			<View style={mainStyles.rowSpaced}>
				<Text style={mainStyles.textImportant}>Status: On hold</Text>
				<Button style={{ alignSelf: 'right', }} title="Request Refill"
					onPress={() => { }} />
			</View>
		</View>
	);
}

export default MedicationCard;