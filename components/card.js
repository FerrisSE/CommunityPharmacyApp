import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";

const Card = ({ onClicked, backgroundColor, children }) => {
	return (
		<TouchableOpacity
			activeOpacity={0.6}
			underlayColor="#333"
			onPress={onClicked ? () => { onClicked() } : () => { }}>
			<View style={[cardStyles.CardView, { backgroundColor: backgroundColor ? backgroundColor : "white", }]}>
				{children}
			</View>
		</TouchableOpacity>

	);
}

export default Card;

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