import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import pill from "../images/pill.png"
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons"
import * as Progress from 'react-native-progress'
import { Card } from "./cards.js";
import { HIGH_PRIORITY, PRIMARY_COLOR } from "../colors";
import { TextBody, TextNote, TextSubHeader1 } from "./text";

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
			<Card depth={2} style={{ padding: 8 }} outlined={requestRefill}>
				<View style={MedCardStyles.row}>
					<View style={MedCardStyles.imageView}>
						<Image source={pill} style={MedCardStyles.image} />
						{precentLeft <= 0.25 &&
							<Icon name="alert-circle" size={25} style={{ position: "absolute", alignSelf: "flex-end", marginTop: -48 }} color={HIGH_PRIORITY} />
						}
					</View>
					<View style={MedCardStyles.textStack}>
						<TextSubHeader1 text={med.medicationName} />
						<TextBody text={med.drugPurpose} />

						<View style={{ marginTop: 10, marginBottom: 10 }}>
							<TextBody text={med.instructions} />
							<TextBody text={`Refills: ${med.currentRefills}/${med.totalRefills}`} />
						</View>

						<TextNote text="Amount Left:" />
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
							<Icon name={requestRefill ? "plus-circle" : "plus-circle-outline"} size={25} color={PRIMARY_COLOR} />
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
})