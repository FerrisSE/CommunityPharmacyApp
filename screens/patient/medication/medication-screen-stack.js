import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CurrentMedicationScreen from "./current-medication";
import SpecificMedicationScreen from "./specific-medication";
import MedicationRefillScreen from "./medication-refill";
import { Header } from "../../../components/header";

const Stack = createNativeStackNavigator();

const MedicationScreenStack = ({ navigation }) => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="My Meds"
				initialParams={{ nav: navigation }}
				component={CurrentMedicationScreen}
				options={({ }) => ({
					header: () => <Header title="My Rx" nav={navigation} />
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
			<Stack.Screen
				name="Refill Order"
				component={MedicationRefillScreen}
			/>
		</Stack.Navigator>
	)
}

export default MedicationScreenStack;