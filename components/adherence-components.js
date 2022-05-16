import { Card } from "./cards";
import * as Progress from 'react-native-progress';
import { Pressable, View } from "react-native";
import { TextBody, TextNote, TextSubHeader1, TextSubHeader2 } from "./text";
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons";
import { SECONDARY_COLOR, SECONDARY_COLOR_TRANSPARENT } from "../colors";
import { useSelector } from "react-redux";
import { SERVER_URL } from "../constants";
import { useEffect, useState } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";

export const GetAdherencePrecent = (med) => (med.pillsScheduled != 0) ? (med.pillsTaken / med.pillsScheduled) : 1.0;

export const GetAdherence = async (userToken) => {
	try {
		let config = {
			method: 'get',
			url: `${SERVER_URL}/patient/adherence`,
			headers: {
				Authorization: userToken,
			}
		};

		return (await axios(config)).data;
	} catch (err) {
		console.error(err);
		return [];
	}
}

export const GetAdherencePharmacist = async (userToken, patient) => {
	try {
		let config = {
			method: 'get',
			url: `${SERVER_URL}/provider/adherence/${patient}`,
			headers: {
				Authorization: userToken,
			}
		};

		return (await axios(config)).data;
	} catch (err) {
		console.error(err);
		return [];
	}
}

export const AdherenceButtonLarge = ({ navigation }) => {
	const [meds, setMeds] = useState([]);
	const toAdherence = () => navigation.navigate("Adherence");

	// default values for if meds can't be pulled in or there aren't any
	let overallAdherence = 1;
	let mostMissed = "none";
	let leastMissed = "none";

	// the reduces don't work properly with a length of 1, so force just precentage of the 1 med
	if (meds.length == 1) {
		overallAdherence = GetAdherencePrecent(meds[0]);
	} else if (meds.length > 1) {
		overallAdherence = meds.reduce((t, m) => GetAdherencePrecent(t) + GetAdherencePrecent(m)) / meds.length;
		mostMissed = meds.reduce((c, m) => GetAdherencePrecent(c) < GetAdherencePrecent(m) ? c : m).name;
		leastMissed = meds.reduce((c, m) => GetAdherencePrecent(c) > GetAdherencePrecent(m) ? c : m).name;
	}

	const userToken = useSelector((state) => state.userToken.value);

	let isFocused = useIsFocused();
	useEffect(async () => {
		setMeds(await GetAdherence(userToken));
	}, [isFocused]);

	return (
		<Pressable onPress={toAdherence}>
			<Card depth={1} color={SECONDARY_COLOR_TRANSPARENT} style={{ padding: 16, marginBottom: 12 }}>
				<View style={{ flex: 1, flexDirection: "row", }}>
					<AdherenceGraph size={96} percent={overallAdherence} />

					<View style={{ marginLeft: 24 }}>
						<TextSubHeader1 text="My Med Score" />
						<TextNote text="tap to view more" />
						<View style={{ flex: 1, flexDirection: "row", marginTop: 8, alignContent: "space-between" }}>
							<View style={{ margin: 8 }}>
								<TextNote text="Most Missed" />
								<TextBody text={mostMissed} />
							</View>
							<View style={{ margin: 8 }}>
								<TextNote text="Least Missed" />
								<TextBody text={leastMissed} />
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
	const [meds, setMeds] = useState([]);

	// default values for if meds can't be pulled in or there aren't any
	let overallAdherence = 1;

	// the reduce doesn't work properly with a length of 1, so force just precentage of the 1 med
	if (meds.length == 1) {
		overallAdherence = GetAdherencePrecent(meds[0]);
	} else if (meds.length > 1) {
		overallAdherence = meds.reduce((t, m) => GetAdherencePrecent(t) + GetAdherencePrecent(m)) / meds.length;
	}

	const toAdherence = () => navigation.navigate("Adherence");

	const userToken = useSelector((state) => state.userToken.value);

	let isFocused = useIsFocused();
	useEffect(async () => {
		setMeds(await GetAdherence(userToken));
	}, [isFocused]);


	return (
		<Pressable onPress={toAdherence}>
			<Card depth={1} color={SECONDARY_COLOR_TRANSPARENT} style={{ padding: 8, aspectRatio: 1 }}>
				<View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
					<Icon name="arrow-expand" size={20} color={SECONDARY_COLOR} />
				</View>

				<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
					<AdherenceGraph size={148} percent={overallAdherence} />
				</View>
			</Card>
		</Pressable>
	)
}

export const MedAdherenceCard = ({ med }) => {
	return (
		<Card depth={1} style={{ margin: 8, padding: 8 }}>
			<View style={{ flex: 1, flexDirection: "row", alignItems: 'center' }}>
				<AdherenceGraph size={64} percent={GetAdherencePrecent(med)} />
				<View style={{ marginLeft: 16 }}>
					<TextSubHeader2 text={med.medicationName} />
					<TextNote text={`${med.pillsTaken} Doses taken | ${med.pillsScheduled - med.pillsTaken} Skipped`} />
				</View>
			</View>
		</Card>
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