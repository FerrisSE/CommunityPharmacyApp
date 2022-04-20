import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PRIMARY_COLOR, PRIMARY_COLOR_TRANSPARENT } from "../colors";

const SchedulingButton = ({ onClicked, icon, label }) => {
	const [iconSize, setIconSize] = React.useState(84);

	return (
		<TouchableOpacity
			activeOpacity={0.6}
			underlayColor="#333"
			onPress={onClicked ? () => { onClicked() } : () => { }}
			style={{ width: '50%', aspectRatio: 1 }}
		>
			<View style={cardStyles.CardView}>
				<View
					style={cardStyles.iconView}
					onLayout={layoutEvent => setIconSize(layoutEvent.nativeEvent.layout.width * 0.7)}
				>
					<Icon name={icon} size={iconSize} color={PRIMARY_COLOR} />
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
		borderRadius: 16,
		aspectRatio: 1,
	}
})