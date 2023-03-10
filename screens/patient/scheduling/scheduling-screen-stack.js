import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SchedulingHomeScreen from "./scheduling-homepage";
import ServiceScheduling from "./service-scheduling";
import { SchedulingConfirmScreen } from "./scheduling-confirm";
import { Header } from "../../../components/header";

const Stack = createNativeStackNavigator();

const SchedulingScreenStack = ({ navigation }) => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Schedule"
				component={SchedulingHomeScreen}
				options={({ route }) => ({
					header: () => <Header title="Scheduling" nav={navigation} />
				})}
			/>
			<Stack.Screen
				name="Service Scheduling"
				component={ServiceScheduling}
				options={({ route }) => ({
					headerShown: false
				})}
				initialParams={{
					service: {
						name: "Test Event"
					}
				}}
			/>
			<Stack.Screen
				name="Confirmation"
				component={SchedulingConfirmScreen}
				options={({ route }) => ({
					headerShown: false
				})}
				initialParams={{
					services: []
				}}
			/>
		</Stack.Navigator>
	)
}

export default SchedulingScreenStack;