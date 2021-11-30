import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MedicationScreenStack from "./medication/medication-screen-stack";
import { View } from "react-native";
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons"
import SchedulingScreenStack from "./scheduling/scheduling-screen-stack";

const Tab = createBottomTabNavigator()

const PatientScreenStack = ({ navigation }) => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				header: () => { <View></View> },
				tabBarShowLabel: false,
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === 'Medication') {
						iconName = 'pill';
					} else if (route.name === 'Scheduling') {
						iconName = 'calendar-blank-multiple';
					}

					// You can return any component that you like here!
					return <Icon name={iconName} size={size} color={color} />;
				},
			})}
		>
			<Tab.Screen
				name="Medication"
				component={MedicationScreenStack}
			/>
			<Tab.Screen
				name="Scheduling"
				component={SchedulingScreenStack}
			/>
		</Tab.Navigator>
	)
}

export default PatientScreenStack;