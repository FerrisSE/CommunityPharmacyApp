import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons"
import { BLACK, PRIMARY_COLOR, PRIMARY_COLOR_TRANSPARENT, WHITE } from "../colors";

export const PrimaryButton = ({ label, onPress, icon, iconSide }) => {
	return (
		<TouchableOpacity style={styles.PrimaryButtonTouchable} onPress={onPress ? onPress() : () => { }}>
			{icon && iconSide == "left" && <Icon name={icon} size={25} color={WHITE} />}
			<Text style={styles.PrimaryButtonText}>{label}</Text>
			{icon && iconSide == "right" && <Icon name={icon} size={25} color={WHITE} />}
		</TouchableOpacity>
	)
}

export const OutlineButton = ({ label, onPress, icon, iconSide }) => {
	return (
		<TouchableOpacity style={styles.OutlineButtonTouchable} onPress={onPress ? onPress() : () => { }}>
			{icon && iconSide == "left" && <Icon name={icon} size={25} color={PRIMARY_COLOR} />}
			<Text style={styles.OutlineButtonText}>{label}</Text>
			{icon && iconSide == "right" && <Icon name={icon} size={25} color={PRIMARY_COLOR} />}
		</TouchableOpacity>
	)
}

export const CardButton = ({ label, depth, onPress, icon }) => {
	return (
		<TouchableOpacity
			style={[styles.CardButtonTouchable, { borderRadius: 20 - (depth - 1) * 4 }]}
			onPress={onPress ? onPress() : () => { }}
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
		opacity: 1,
	},
	PrimaryButtonText: {
		textAlign: 'center',
		color: WHITE,
		fontFamily: "Open Sans SemiBold",
		fontSize: 18,
		opacity: 1,
	},
	OutlineButtonTouchable: {
		borderWidth: 2,
		borderColor: PRIMARY_COLOR,
		borderRadius: 35,
		justifyContent: 'center',
		opacity: 1,
	},
	OutlineButtonText: {
		textAlign: 'center',
		color: PRIMARY_COLOR,
		fontFamily: "Open Sans SemiBold",
		fontSize: 18,
		opacity: 1,
	},
	CardButtonTouchable: {
		backgroundColor: PRIMARY_COLOR_TRANSPARENT,
		justifyContent: 'flex-start',
		margin: 4,
	},
	CardButtonText: {
		color: BLACK,
		fontFamily: "Open Sans SemiBold",
		fontSize: 18,
		opacity: 1,
		paddingTop: 14,
		paddingBottom: 14,
		paddingLeft: 14,
	},
});