import React from "react";
import { View } from "react-native";
import { HIGH_PRIORITY, HIGH_PRIORITY_TRANSPARENT, PRIMARY_COLOR, PRIMARY_COLOR_TRANSPARENT, SECONDARY_COLOR, SECONDARY_COLOR_TRANSPARENT } from "../colors";

export const Card = ({ color, outlineColor, depth, children, style }) => {
	if (!color)
		color = PRIMARY_COLOR_TRANSPARENT;

	return (
		<View style={[{
			backgroundColor: color,
			borderRadius: 20 - (depth - 1) * 4,
			padding: 4,
			borderWidth: outlineColor ? 3 : 0,
			borderColor: outlineColor,
		}, { ...style }]}>
			{children}
		</View>
	)
};

export const CardWithHeader = ({ color, outlineColor, depth, header, children, style }) => {
	if (!color)
		color = PRIMARY_COLOR_TRANSPARENT;

	return (
		<View style={[{
			backgroundColor: color,
			borderRadius: 20 - (depth - 1) * 4,
			borderWidth: outlineColor ? 3 : 0,
			borderColor: outlineColor,
		}, { ...style }]}>
			<View style={{
				backgroundColor: color,
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
	if (!color)
		color = PRIMARY_COLOR_TRANSPARENT;

	return (
		<View style={[{
			borderRadius: 20 - (depth - 1) * 4,
			padding: 4,
			borderWidth: 10,
			borderColor: color,
		}, { ...style }]}>
			{children}
		</View>
	)
}