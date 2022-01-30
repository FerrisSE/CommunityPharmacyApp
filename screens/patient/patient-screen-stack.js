import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MedicationScreenStack from "./medication/medication-screen-stack";
import { View } from "react-native";
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons"
import SchedulingScreenStack from "./scheduling/scheduling-screen-stack";
import { GRAY_5, PRIMARY_COLOR, WHITE } from "../../colors";

const Tab = createBottomTabNavigator()

const PatientScreenStack = ({ navigation }) => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				header: () => { <View></View> },
				tabBarShowLabel: false,
				tabBarActiveTintColor: WHITE,
				tabBarInactiveTintColor: '#A8A8CB',
				tabBarStyle: { backgroundColor: PRIMARY_COLOR },
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === 'My Rx') {
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
				name="My Rx"
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