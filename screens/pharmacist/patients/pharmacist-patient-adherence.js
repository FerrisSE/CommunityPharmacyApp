import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import { AdherenceGraph, GetAdherencePharmacist, GetAdherencePrecent, MedAdherenceCard } from "../../../components/adherence-components";
import { Card } from "../../../components/cards";
import { TextSubHeader2 } from "../../../components/text";
import { LoadingScreen } from "../../../loading-screen";
import { ErrorScreen } from "../../../error-screen";

export const PharmacistPatientAdherenceScreen = ({ patient }) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [meds, setMeds] = useState([]);

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

	useEffect(async () => {
		try {
			setMeds(await GetAdherencePharmacist(userToken, patient.patientId));
		} catch (err) {
			setError(err);
		}

		setLoading(false);
	}, []);

	if (error)
		return <ErrorScreen error={error} />

	if (loading)
		return <LoadingScreen />

	return (
		<ScrollView>
			<View style={{ margin: 12 }}>

				<View style={{ alignItems: "center", justifyContent: "center", margin: 12 }}>
					<AdherenceGraph size={200} percent={overallAdherence} />
				</View>

				<TextSubHeader2 text="By Medication" style={{ marginBottom: 8 }} />
				{meds.map((m, i) => <MedAdherenceCard med={m} key={i} />)}

				<View style={{ flex: 1, flexDirection: "row", marginTop: 16 }}>
					<View style={{ width: "50%", padding: 8 }}>
						<TextSubHeader2 text="Most Missed" style={{ marginLeft: 16 }} />
						<Card depth={1} style={{ flex: 1, margin: 4, padding: 16, justifyContent: 'flex-end' }}>
							<TextSubHeader2 text={mostMissed} />
						</Card>
					</View>
					<View style={{ width: "50%", padding: 8 }}>
						<TextSubHeader2 text="Least Missed" style={{ marginLeft: 16 }} />
						<Card depth={1} style={{ flex: 1, margin: 4, padding: 16, justifyContent: 'flex-end' }}>
							<TextSubHeader2 text={leastMissed} />
						</Card>
					</View>
				</View>
			</View>
		</ScrollView>
	)
}