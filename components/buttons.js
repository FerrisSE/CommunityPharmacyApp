import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons"
import { BLACK, PRIMARY_COLOR, PRIMARY_COLOR_TRANSPARENT, WHITE } from "../colors";

export const PrimaryButton = ({ label, onPress, icon, iconSide, style }) => {
	return (
		<TouchableOpacity style={[styles.PrimaryButtonTouchable, { ...style }]} onPress={onPress ? () => onPress() : () => { }}>
			{icon && iconSide == "left" && <Icon name={icon} size={25} color={WHITE} />}
			<Text style={styles.PrimaryButtonText}>{label}</Text>
			{icon && iconSide == "right" && <Icon name={icon} size={25} color={WHITE} />}
		</TouchableOpacity>
	)
}

export const OutlineButton = ({ label, onPress, icon, iconSide, color, style }) => {
	if (color == null)
		color = PRIMARY_COLOR;

	return (
		<TouchableOpacity style={[styles.OutlineButtonTouchable, { borderColor: color }, { ...style }]} onPress={onPress ? () => onPress() : () => { }}>
			{icon && iconSide == "left" && <Icon name={icon} size={25} color={color} />}
			<Text style={[styles.OutlineButtonText, { color: color }]}>{label}</Text>
			{icon && iconSide == "right" && <Icon name={icon} size={25} color={color} />}
		</TouchableOpacity>
	)
}

export const CardButton = ({ label, depth, onPress, icon, style }) => {
	return (
		<TouchableOpacity
			style={[styles.CardButtonTouchable, { borderRadius: 20 - (depth - 1) * 4 }, { ...style }]}
			onPress={onPress ? () => onPress() : () => { }}
		>
			{icon && <Icon name={icon} size={25} color={PRIMARY_COLOR} />}
			<Text style={styles.CardButtonText}>{label}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	PrimaryButtonTouchable: {
		backgroundColor: PRIMARY_COLOR,
		borderRadius: 35,
		justifyContent: 'center',
		alignItems: "center",
		flexDirection: "row",
		opacity: 1,
	},
	PrimaryButtonText: {
		textAlign: 'center',
		color: WHITE,
		fontFamily: "OpenSans-SemiBold",
		fontSize: 16,
		margin: 10,
		opacity: 1,
	},
	OutlineButtonTouchable: {
		borderWidth: 2,
		borderRadius: 35,
		justifyContent: 'center',
		alignItems: "center",
		flexDirection: "row",
		opacity: 1,
	},
	OutlineButtonText: {
		textAlign: 'center',
		fontFamily: "OpenSans-SemiBold",
		fontSize: 16,
		margin: 10,
		marginLeft: 25,
		marginRight: 25,
		opacity: 1,
	},
	CardButtonTouchable: {
		backgroundColor: PRIMARY_COLOR_TRANSPARENT,
		justifyContent: 'flex-start',
		margin: 4,
	},
	CardButtonText: {
		color: BLACK,
		fontFamily: "OpenSans-SemiBold",
		fontSize: 18,
		opacity: 1,
		paddingTop: 14,
		paddingBottom: 14,
		paddingLeft: 14,
	},
});