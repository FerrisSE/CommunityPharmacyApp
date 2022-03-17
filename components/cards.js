import React from "react";
import { View } from "react-native";
import { HIGH_PRIORITY, HIGH_PRIORITY_TRANSPARENT, PRIMARY_COLOR, PRIMARY_COLOR_TRANSPARENT, SECONDARY_COLOR, SECONDARY_COLOR_TRANSPARENT } from "../colors";

export const Card = ({ color, depth, outlined, children, style }) => {
	let backgroundColor = PRIMARY_COLOR_TRANSPARENT;
	let outlineColor = PRIMARY_COLOR;

	if (color == 'secondary') {
		backgroundColor = SECONDARY_COLOR_TRANSPARENT;
		outlineColor = SECONDARY_COLOR;
	}

	if (color == 'priority') {
		backgroundColor = HIGH_PRIORITY_TRANSPARENT;
		outlineColor = HIGH_PRIORITY;
	}

	return (
		<View style={[{
			backgroundColor: backgroundColor,
			borderRadius: 20 - (depth - 1) * 4,
			padding: 4,
			borderWidth: outlined ? 3 : 0,
			borderColor: outlineColor,
		}, { ...style }]}>
			{children}
		</View>
	)
};

export const CardWithHeader = ({ color, depth, outlined, header, children, style }) => {
	let backgroundColor = PRIMARY_COLOR_TRANSPARENT;
	let outlineColor = PRIMARY_COLOR;

	if (color == 'secondary') {
		backgroundColor = SECONDARY_COLOR_TRANSPARENT;
		outlineColor = SECONDARY_COLOR;
	}

	return (
		<View style={[{
			backgroundColor: backgroundColor,
			borderRadius: 20 - (depth - 1) * 4,
			borderWidth: outlined ? 3 : 0,
			borderColor: outlineColor,
		}, { ...style }]}>
			<View style={{
				backgroundColor: backgroundColor,
				borderTopLeftRadius: 20 - (depth - 1) * 4,
				borderTopRightRadius: 20 - (depth - 1) * 4,
				padding: 8,
			}}>
				{header}
			</View>
			<View style={{
				padding: 8,
			}}>
				{children}
			</View>
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