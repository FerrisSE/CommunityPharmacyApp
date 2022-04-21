import { Card } from "./cards";
import * as Progress from 'react-native-progress';
import { Pressable, View } from "react-native";
import { TextBody, TextNote, TextSubHeader1 } from "./text";
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons";
import { SECONDARY_COLOR, SECONDARY_COLOR_TRANSPARENT } from "../colors";

const meds = [
	{ name: "Amoxicillian", taken: 24.0, skipped: 6.0 },
	{ name: "Test Med", taken: 10.0, skipped: 5.0 }
]

const GetMedAdherence = (med) => med.taken / (med.taken + med.skipped);

export const AdherenceButtonLarge = ({ navigation }) => {
	const toAdherence = () => navigation.navigate("Adherence");

	let mostMissed = meds.reduce((c, m) => GetMedAdherence(c) < GetMedAdherence(m) ? c : m);
	let leastMissed = meds.reduce((c, m) => GetMedAdherence(c) > GetMedAdherence(m) ? c : m);

	return (
		<Pressable onPress={toAdherence}>
			<Card depth={1} color={SECONDARY_COLOR_TRANSPARENT} style={{ padding: 16, marginBottom: 12 }}>
				<View style={{ flex: 1, flexDirection: "row", }}>
					<AdherenceGraph size={110} percent={0.33} />

					<View style={{ marginLeft: 24 }}>
						<TextSubHeader1 text="My Med Score" />
						<TextNote text="tap to view more" />
						<View style={{ flex: 1, flexDirection: "row", marginTop: 8, alignContent: "space-between" }}>
							<View style={{ margin: 8 }}>
								<TextNote text="Most Missed" />
								<TextBody text={mostMissed.name} />
							</View>
							<View style={{ margin: 8 }}>
								<TextNote text="Least Missed" />
								<TextBody text={leastMissed.name} />
							</View>
						</View>
					</View>

					<View style={{ flex: 1, flexDirection: "row", height: "100%", justifyContent: "flex-end" }}>
						<Icon name="arrow-expand" size={25} color={SECONDARY_COLOR} />
					</View>
				</View>
			</Card>
		</Pressable>
	)
}

export const AdherenceButtonSmall = ({ navigation }) => {
	const toAdherence = () => navigation.navigate("Adherence");

	return (
		<Pressable onPress={toAdherence}>
			<Card depth={1} color={SECONDARY_COLOR_TRANSPARENT} style={{ padding: 16, flex: 1, aspectRatio: 1, margin: 8 }}>
				<View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
					<Icon name="arrow-expand" size={20} color={SECONDARY_COLOR} />
				</View>

				<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
					<AdherenceGraph size={148} percent={0.33} />
				</View>
			</Card>
		</Pressable>
	)
}

export const AdherenceGraph = ({ size, percent }) => {
	let fontSize = Math.floor(size / 4);
	let thickness = Math.floor(size / 16);

	let color = "#79DCAD";
	if (percent < 0.8)
		color = "#FFBF48"
	if (percent < 0.5)
		color = "#F56A4C"

	return (
		<Progress.Circle
			animated={false}
			size={size}
			progress={percent}
			showsText={true}
			color={color}
			unfilledColor="#FFFFFF"
			textStyle={{
				color: "#000",
				fontFamily: "OpenSans-SemiBold",
				fontSize: fontSize,
			}}
			thickness={thickness}
			fill="#00000000"
			borderWidth={0}
		/>
	)
}