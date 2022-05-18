import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PharmacistServicesScreen } from "./pharmacist-services";
import { PharmacistServicesScheduleScreen } from "./pharmacist-services-schedule";
import { PharmacistServicesDetailsScreen } from "./pharmacist-services-details";

const Stack = createNativeStackNavigator();

export const PharmacistServicesStack = ({ navigation }) => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Services View"
				component={PharmacistServicesScreen}
				options={({ }) => ({
					headerShown: false
				})}
			/>
			<Stack.Screen
				name="Services Schedule"
				component={PharmacistServicesScheduleScreen}
				options={({ }) => ({
					headerShown: false
				})}
			/>
			<Stack.Screen
				name="Services Schedule Details"
				component={PharmacistServicesDetailsScreen}
				options={({ }) => ({
					headerShown: false
				})}
			/>
		</Stack.Navigator>
	)
}