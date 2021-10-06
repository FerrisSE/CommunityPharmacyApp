import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import mainStyles from "../main-styles";

const TextLink = ({ label, onPress }) => {
	return (
		<TouchableHighlight
			activeOpacity={0.6}
			underlayColor="#00000000"
			onPress={onPress}>
			<View style={[mainStyles.CardView, mainStyles.row]}>
				<Text style={styles.text}>{label}</Text>
				<Icon name="arrow-right" size={40} />
			</View>
		</TouchableHighlight>
	)
}

const styles = StyleSheet.create({
	text: {
		fontSize: 24,
	}
});

export default TextLink;