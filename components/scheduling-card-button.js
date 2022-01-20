import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PRIMARY_COLOR, PRIMARY_COLOR_TRANSPARENT } from "../colors";

const SchedulingButton = ({ onClicked, icon, label }) => {
	return (
		<TouchableOpacity
			activeOpacity={0.6}
			underlayColor="#333"
			onPress={onClicked ? () => { onClicked() } : () => { }}>
			<View style={cardStyles.CardView}>
				<View style={cardStyles.iconView}>
					<Icon name={icon} size={84} color={PRIMARY_COLOR} />
				</View>
				<Text style={cardStyles.cardText}>{label}</Text>
			</View>
		</TouchableOpacity>

	);
}

export default SchedulingButton;

const cardStyles = StyleSheet.create({
	iconView: {
		padding: 16,
		justifyContent: "center",
		alignContent: "center",
		alignItems: "center",
	},
	cardText: {
		fontSize: 16,
		fontWeight: "600",
		textAlign: 'center',
	},
	CardView: {
		backgroundColor: PRIMARY_COLOR_TRANSPARENT,
		alignItems: 'stretch',
		justifyContent: 'center',
		flexDirection: 'column',
		justifyContent: 'space-evenly',
		padding: 16,
		margin: 8,
		width: 190,
		height: 190,
		borderRadius: 16,
	}
})