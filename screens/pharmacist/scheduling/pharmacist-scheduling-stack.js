import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PharmacistScheduleSearchScreen } from "./pharmacist-scheduling-search";
import { PharmacistSchedulingHomeScreen } from "./pharmacist-scheduling-home";
import { PharmacistManageAppointmentsScreen } from "./pharmacist-manage-appointments";

const Stack = createNativeStackNavigator();

export const PharmacistSchedulingStack = ({ navigation }) => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Scheduling View"
				component={PharmacistSchedulingHomeScreen}
				options={({ }) => ({
					headerShown: false
				})}
			/>
			<Stack.Screen
				name="Scheduling Search"
				component={PharmacistScheduleSearchScreen}
				options={({ }) => ({
					headerShown: false
				})}
			/>
			<Stack.Screen
				name="Manage"
				component={PharmacistManageAppointmentsScreen}
				options={({ }) => ({
					headerShown: false
				})}
			/>
		</Stack.Navigator>
	)
}