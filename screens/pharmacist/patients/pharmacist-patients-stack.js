import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PharmacistPatientSearchScreen } from "./patient-search";

const Stack = createNativeStackNavigator();

export const PharmacistPatientsStack = ({ navigation }) => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Patient Search"
				component={PharmacistPatientSearchScreen}
				options={({ }) => ({
					headerShown: false
				})}
			/>
		</Stack.Navigator>
	)
}