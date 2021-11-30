import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SchedulingHomeScreen from "./scheduling-homepage";
import ServiceScheduling from "./service-scheduling";

const Stack = createNativeStackNavigator();

const SchedulingScreenStack = ({ navigation }) => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Schedule"
				component={SchedulingHomeScreen}
				options={({ route }) => ({
					headerShown: false
				})}
			/>
			<Stack.Screen
				name="Service Scheduling"
				component={ServiceScheduling}
				initialParams={{
					service: {
						name: "Test Event"
					}
				}}
			/>
		</Stack.Navigator>
	)
}

export default SchedulingScreenStack;