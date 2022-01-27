import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CurrentMedicationScreen from "./current-medication";
import SpecificMedicationScreen from "./specific-medication";
import MedicationRefillScreen from "./medication-refill";
import { OutlineButton } from "../../../components/buttons";
import { PRIMARY_COLOR } from "../../../colors";
import { View } from "react-native";

const Stack = createNativeStackNavigator();

const MedicationScreenStack = ({ navigation }) => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="My Meds"
				component={CurrentMedicationScreen}
				options={({ }) => ({
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
				options={({ route }) => ({
					headerTitle: _ => <View></View>,
					headerRight: () => (
						<OutlineButton
							label="Refill"
							color={PRIMARY_COLOR}
							style={{ marginRight: 8 }}
							onPress={() => {
								navigation.navigate({
									name: 'Refill Order',
									params: {
										meds: [route.params.med],
									}
								})
							}} />
					),
				})
				}
			/>
			<Stack.Screen
				name="Refill Order"
				component={MedicationRefillScreen}
			/>
		</Stack.Navigator>
	)
}

export default MedicationScreenStack;