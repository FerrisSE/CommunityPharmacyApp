import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MedicationScreenStack from "./medication-screen-stack";
import SchedulingScreen from "./scheduling";
import { View } from "react-native";
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons"

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
				component={SchedulingScreen}
			/>
		</Tab.Navigator>
	)
}

export default PatientScreenStack;