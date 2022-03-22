import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MedicationScreenStack from "./medication/medication-screen-stack";
import { View } from "react-native";
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons"
import SchedulingScreenStack from "./scheduling/scheduling-screen-stack";
import { PRIMARY_COLOR, WHITE } from "../../colors";
import ProfileScreen from "./profile/profile";
import { Header } from "../../components/header";

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
				tabBarButton: route.name == 'Profile' ? () => null : undefined, // don't show profile on tab nav (it's in the header)
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === 'My Rx') {
						iconName = 'pill';
					} else if (route.name === 'Scheduling') {
						iconName = 'calendar-blank-multiple';
					}

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
			<Tab.Screen
				name="Profile"
				component={ProfileScreen}
				initialParams={{ nav: navigation }}
				options={({ }) => ({
					header: () => <Header title="Profile" nav={navigation} />
				})}
			/>
		</Tab.Navigator>
	)
}

export default PatientScreenStack;