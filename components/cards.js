import React from "react";
import { View } from "react-native";
import { PRIMARY_COLOR_TRANSPARENT, SECONDARY_COLOR_TRANSPARENT } from "../colors";

export const Card = ({ color, depth, outlined, children, style }) => {
	let backgroundColor = PRIMARY_COLOR_TRANSPARENT;

	if (color == 'secondary') {
		backgroundColor = SECONDARY_COLOR_TRANSPARENT;
	}

	return (
		<View style={[{
			backgroundColor: backgroundColor,
			borderRadius: 20 - (depth - 1) * 4,
			padding: 4,
			borderWidth: outlined ? 1 : 0,
			borderColor: backgroundColor,
		}, { ...style }]}>
			{children}
		</View>
	)
};

export const CardKnockOut = ({ color, depth, children, style }) => {
	let backgroundColor = PRIMARY_COLOR_TRANSPARENT;

	if (color == 'secondary') {
		backgroundColor = SECONDARY_COLOR_TRANSPARENT;
	}

	return (
		<View style={[{
			borderRadius: 20 - (depth - 1) * 4,
			padding: 4,
			borderWidth: 10,
			borderColor: backgroundColor,
		}, { ...style }]}>
			{children}
		</View>
	)
}