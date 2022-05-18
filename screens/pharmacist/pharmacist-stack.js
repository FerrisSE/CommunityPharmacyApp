import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PharmacistTabNavigator } from '../../components/pharmacist-tabs';
import { PharmacistPatientsStack } from './patients/pharmacist-patients-stack';
import { useIsFocused } from '@react-navigation/native';
import { Platform } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect } from 'react';
import { DashboardScreen } from './pharmacist-dashboard';
import { PharmacistSchedulingStack } from './scheduling/pharmacist-scheduling-stack';
import { PharmacistServicesStack } from './services/pharmacist-services-stack';
import { PharmacistOrdersScreen } from './orders/pharmacist-orders';

const nav = createNativeStackNavigator();

export const PharmacistStack = ({ navigation }) => {

	// use landscape orientation for pharmacist stack
	const isFocused = useIsFocused();
	useEffect(async () => {
		if (Platform.OS != 'web')
			await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
	}, [isFocused]);

	return (
		<PharmacistTabNavigator nav={navigation}>
			<nav.Screen
				name="Dashboard"
				component={DashboardScreen}
				options={{
					icon: "home"
				}}
			/>
			<nav.Screen
				name="Patients"
				component={PharmacistPatientsStack}
				options={{
					icon: "account-multiple"
				}}
			/>
			<nav.Screen
				name="Scheduling"
				component={PharmacistSchedulingStack}
				options={{
					icon: "calendar-month"
				}}
			/>
			<nav.Screen
				name="Services"
				component={PharmacistServicesStack}
				options={{
					icon: "medical-bag"
				}}
			/>
			<nav.Screen
				name="Orders"
				component={PharmacistOrdersScreen}
				options={{
					icon: "script-text"
				}}
			/>
		</PharmacistTabNavigator>
	)
}