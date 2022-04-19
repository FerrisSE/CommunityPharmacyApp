import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PharmacistTabNavigator } from '../../components/pharmacist-tabs';
import { PharmacistSchedule } from './pharmacist-schedule';
import { PharmacistPatientsStack } from './patients/pharmacist-patients-stack';

const nav = createNativeStackNavigator();

export const PharmacistStack = ({ navigation }) => {
	return (
		<PharmacistTabNavigator>
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
				component={PharmacistSchedule}
				options={{
					icon: "calendar-month"
				}}
			/>
		</PharmacistTabNavigator>
	)
}