import React, { useEffect } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MedicationScreenStack from "./medication/medication-screen-stack";
import { View, Platform } from "react-native";
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons"
import SchedulingScreenStack from "./scheduling/scheduling-screen-stack";
import { PRIMARY_COLOR, WHITE } from "../../colors";
import ProfileScreen from "./profile/profile";
import { Header } from "../../components/header";
import { HomeScreen } from "./home";
import { AdherenceScreen } from "./adherence";
import { ProfileEdit } from "./profile/ProfileEdit";
import { useIsFocused } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';

const Tab = createBottomTabNavigator();

// these screens have their own way to get to them, so we don't want an icon rendered on the bottom navigation
// but it's easier to just keep them in the tab nav stack
const hiddenTabs = ['Profile', 'Home', 'Adherence', 'Edit Profile'];

const PatientScreenStack = ({ navigation }) => {

	// use portrait orientation for patient stack
	const isFocused = useIsFocused();
	useEffect(async () => {
		if (Platform.OS != 'web')
			await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
	}, [isFocused]);

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				header: () => { <View></View> },
				tabBarShowLabel: false,
				tabBarActiveTintColor: WHITE,
				tabBarInactiveTintColor: '#A8A8CB',
				tabBarStyle: { backgroundColor: PRIMARY_COLOR },
				tabBarButton: hiddenTabs.includes(route.name) ? () => null : undefined, // hide the tabs we want hidden
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
				name="Edit Profile"
				component={ProfileEdit}
				options={({ }) => ({
					headerShown: false
				})}
			/>
			<Tab.Screen
				name="Adherence"
				component={AdherenceScreen}
				options={({ }) => ({
					header: () => <Header title="My Med Score" nav={navigation} />
				})}
			/>
		</Tab.Navigator>
	)
}

export default PatientScreenStack;