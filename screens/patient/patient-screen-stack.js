import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MedicationScreenStack from "./medication/medication-screen-stack";
import { View } from "react-native";
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons"
import SchedulingScreenStack from "./scheduling/scheduling-screen-stack";
import { PRIMARY_COLOR, WHITE } from "../../colors";
import ProfileScreen from "./profile/profile";
import { Header } from "../../components/header";
import { HomeScreen } from "./home";
import { AdherenceScreen } from "./adherence";

const Tab = createBottomTabNavigator();

const hiddenTabs = ['Profile', 'Home', 'Adherence'];

const PatientScreenStack = ({ navigation }) => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				header: () => { <View></View> },
				tabBarShowLabel: false,
				tabBarActiveTintColor: WHITE,
				tabBarInactiveTintColor: '#A8A8CB',
				tabBarStyle: { backgroundColor: PRIMARY_COLOR },
				tabBarButton: hiddenTabs.includes(route.name) ? () => null : undefined,
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
				name="Home"
				component={HomeScreen}
				options={({ }) => ({
					header: () => <Header title="Dashboard" nav={navigation} />
				})}
			/>
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
				options={({ }) => ({
					header: () => <Header title="Profile" nav={navigation} />
				})}
			/>
			<Tab.Screen
				name="Adherence"
				component={AdherenceScreen}
				options={({ }) => ({
					header: () => <Header title="Adherence" nav={navigation} />
				})}
			/>
		</Tab.Navigator>
	)
}

export default PatientScreenStack;