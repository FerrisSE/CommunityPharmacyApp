import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PharmacistTabNavigator } from '../../components/pharmacist-tabs';
import { PharmacistPatientsStack } from './patients/pharmacist-patients-stack';
import { PharmacistSchedulingHomeScreen } from './scheduling/pharmacist-scheduling-home';
import { useIsFocused } from '@react-navigation/native';
import { Platform } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect } from 'react';

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
				name="Patients"
				component={PharmacistPatientsStack}
				options={{
					icon: "account-multiple"
				}}
			/>
			<nav.Screen
				name="Scheduling"
				icon="folder"
				component={PharmacistSchedulingHomeScreen}
				options={{
					icon: "calendar-month"
				}}
			/>
		</PharmacistTabNavigator>
	)
}