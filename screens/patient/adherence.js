import React from "react";
import * as Progress from 'react-native-progress';
import { View } from "react-native";

export const AdherenceScreen = () => {
	return (
		<View style={{ alignItems: "center", justifyContent: "center" }}>
			<Progress.Circle
				animated={false}
				size={200}
				progress={0.33}
				showsText={true}
				color="#79DCAD"
				unfilledColor="#FFFFFF"
				textStyle={{
					color: "#000",
					fontFamily: "OpenSans-SemiBold",
					fontSize: 42,
				}}
				thickness={10}
				fill="#00000000"
				borderWidth={0}
			/>
		</View>
	)
}