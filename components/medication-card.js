import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableCard } from "./card.js"
import pill from "../images/pill.png"
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons"

const MedicationCard = ({ navigation, med }) => {
	return (
		<TouchableCard
			onClicked={() => {
				navigation.navigate({
					name: 'Medication',
					params: {
						med: med
					}
				})
			}}
		>
			<View style={MedCardStyles.row}>
				<View style={MedCardStyles.imageView}>
					<Image source={pill} style={MedCardStyles.image} />
				</View>
				<View style={MedCardStyles.textStack}>
					<Text style={MedCardStyles.textBrandName}>{med.display}</Text>
					<Text style={MedCardStyles.textGenericName}>Generic Name</Text>
				</View>
				<Icon name="arrow-expand" size={20} />
			</View>
		</TouchableCard>
	);
}

export default MedicationCard;

const MedCardStyles = StyleSheet.create({
	row: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		alignContent: "space-around",
	},
	textStack: {
		flex: 1,
		height: "100%",
		flexDirection: "column",
		justifyContent: "center",
		padding: 16,
	},
	imageView: {
		padding: 16,
		justifyContent: "center",
		height: "100%",
		backgroundColor: "#E3E5EB",
		width: 85,
		height: 85,
		borderRadius: 85 / 2,
	},
	image: {
		width: '100%',
		height: '100%',
		padding: 16,
	},
	textBrandName: {
		fontSize: 16,
		fontWeight: "700",
	},
	textGenericName: {
		fontSize: 14,
	}
})