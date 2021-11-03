import React from "react";
import { Text, View } from "react-native";

const SpecificMedicationScreen = ({ navigation, route }) => {
	return (
		<View>
			<Text>Med: {route.params.med.display}</Text>
		</View>
	)
}

export default SpecificMedicationScreen;