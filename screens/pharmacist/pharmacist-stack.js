import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PharmacistTabNavigator } from '../../components/pharmacist-tabs';
import { PharmacistSchedule } from './pharmacist-schedule';
import { SearchScreen } from "./search-screen";

const nav = createNativeStackNavigator();

export const PharmacistStack = ({ navigation }) => {
	return (
		<PharmacistTabNavigator>
			<nav.Screen
				name="Patients"
				component={SearchScreen}
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