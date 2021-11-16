import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TouchableCard } from "./card.js"
import pill from "../images/pill.png"
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons"
import * as Progress from 'react-native-progress'

const MedicationCard = ({ navigation, med, updateCartFunction }) => {
	let [requestRefill, setRequestRefill] = React.useState(false)

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
			backgroundColor={requestRefill ? "#FFFFFF" : "#F0F1F4"}
		>
			<View style={MedCardStyles.row}>
				<View style={MedCardStyles.imageView}>
					<Image source={pill} style={MedCardStyles.image} />
				</View>
				<View style={MedCardStyles.textStack}>
					<Text style={MedCardStyles.textBrandName}>{med.medicationName}</Text>
					<Text style={MedCardStyles.textPurpose}>{med.drugPurpose}</Text>

					<View style={{ marginTop: 10, marginBottom: 10 }}>
						<Text>{med.instructions}</Text>
						<Text>Refills: {med.currentRefills}/{med.totalRefills}</Text>
					</View>

					<Text>Amount Left:</Text>
					<Progress.Bar
						progress={med.remainingQuantity / med.totalQuantity}
						width={null}
						height={12}
						animated={false}
						color={'#2196F3'}
						unfilledColor={'#E3E5EB'}
						borderWidth={0}
					/>
				</View>
				{updateCartFunction != null &&
					<TouchableOpacity
						style={{
							height: "100%",
							alignContent: "flex-start",
						}}
						onPress={() => {
							setRequestRefill(!requestRefill);
							updateCartFunction(med.medicationName, !requestRefill);
						}}>
						<Icon name={requestRefill ? "plus-circle" : "plus-circle-outline"} size={25} />
					</TouchableOpacity>
				}
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
		alignItems: "center",
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
		fontSize: 20,
		fontWeight: "700",
	},
	textPurpose: {
		fontSize: 14,
		fontWeight: "700",
	}
})