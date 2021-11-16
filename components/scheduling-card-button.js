import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SchedulingButton = ({ onClicked, icon, label }) => {
	return (
		<TouchableOpacity
			activeOpacity={0.6}
			underlayColor="#333"
			onPress={onClicked ? () => { onClicked() } : () => { }}>
			<View style={cardStyles.CardView}>
				<View style={cardStyles.iconView}>
					<Icon name={icon} size={128} />
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
		fontWeight: "600"
	},
	CardView: {
		backgroundColor: "#F0F1F4",
		alignItems: 'stretch',
		justifyContent: 'center',
		borderRadius: 8,
		shadowColor: "black",
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.2,
		shadowRadius: 6,
		elevation: 4,
		flexDirection: 'column',
		justifyContent: 'space-evenly',
		paddingLeft: 16,
		paddingRight: 16,
		paddingTop: 16,
		paddingBottom: 16,
		margin: 8,
	}
})