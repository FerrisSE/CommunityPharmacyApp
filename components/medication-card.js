import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TouchableCard } from "./card.js"
import pill from "../images/pill.png"
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons"
import * as Progress from 'react-native-progress'
import { Card } from "./cards.js";

const MedicationCard = ({ navigation, med, updateCartFunction }) => {
	let [requestRefill, setRequestRefill] = React.useState(false)

	let precentLeft = med.remainingQuantity / med.totalQuantity;

	let barColor = '#9ECE6A';

	if (precentLeft < .25)
		barColor = '#FF3A45';
	else if (precentLeft < .50)
		barColor = '#FFA035';

	return (
		<TouchableOpacity
			onPress={() => {
				navigation.navigate({
					name: 'Medication',
					params: {
						med: med
					}
				})
			}}
			style={{ margin: 8 }}
		>
			<Card depth={2} style={{ padding: 8 }}>
				<View style={MedCardStyles.row}>
					<View style={MedCardStyles.imageView}>
						<Image source={pill} style={MedCardStyles.image} />
						{precentLeft <= 0.25 &&
							<Icon name="alert-circle" size={25} style={{ position: "absolute", alignSelf: "flex-end", marginTop: -48 }} color={'#FF3A45'} />
						}
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
							progress={precentLeft}
							width={null}
							height={12}
							animated={false}
							color={barColor}
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
			</Card>
		</TouchableOpacity>
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
		alignItems: "center",
		justifyContent: "center",
		height: "100%",
		backgroundColor: "#E3E5EB",
		width: 85,
		height: 85,
		borderRadius: 85 / 2,
	},
	image: {
		width: '60%',
		height: '60%',
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