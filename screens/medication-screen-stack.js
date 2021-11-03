import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CurrentMedicationScreen from "./current-medication";
import SpecificMedicationScreen from "./specific-medication";

const Stack = createNativeStackNavigator();

const MedicationScreenStack = ({ navigation }) => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="My Meds"
				component={CurrentMedicationScreen}
				options={({ route }) => ({
					headerShown: false
				})}
			/>
			<Stack.Screen
				name="Medication"
				component={SpecificMedicationScreen}
				initialParams={{
					med: {
						display: "Test Med"
					}
				}}
			/>
		</Stack.Navigator>
	)
}

export default MedicationScreenStack;