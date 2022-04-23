import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PharmacistTabNavigator } from '../../components/pharmacist-tabs';
import { PharmacistPatientsStack } from './patients/pharmacist-patients-stack';
import { PharmacistSchedulingHomeScreen } from './scheduling/pharmacist-scheduling-home';

const nav = createNativeStackNavigator();

export const PharmacistStack = ({ navigation }) => {
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