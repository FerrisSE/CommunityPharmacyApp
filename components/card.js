import React from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const Card = ({ backgroundColor, children }) => {
	return (
		<View style={[cardStyles.CardView, { backgroundColor: backgroundColor ? backgroundColor : "#F0F1F4", }]}>
			{children}
		</View>

	);
}

export const TouchableCard = ({ onClicked, backgroundColor, children }) => {
	return (
		<TouchableOpacity
			activeOpacity={0.6}
			underlayColor="#333"
			onPress={onClicked ? () => { onClicked() } : () => { }}>
			<View style={[cardStyles.CardView, { backgroundColor: backgroundColor ? backgroundColor : "#F0F1F4", }]}>
				{children}
			</View>
		</TouchableOpacity>

	);
}

const cardStyles = StyleSheet.create({
	CardView: {
		alignItems: 'stretch',
		justifyContent: 'center',
		borderRadius: 24,
		shadowColor: "black",
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 6,
		flexDirection: 'column',
		justifyContent: 'space-between',
		paddingLeft: 16,
		paddingRight: 16,
		paddingTop: 16,
		paddingBottom: 16,
		marginTop: 8,
		marginBottom: 8,
		marginLeft: 16,
		marginRight: 16,
	}
})