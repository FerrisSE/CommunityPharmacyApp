import React from "react";
import { ScrollView, View } from "react-native";
import { TextNote, TextSubHeader2 } from '../../components/text';
import { Card } from "../../components/cards";
import { AdherenceGraph } from "../../components/adherence-components";

const meds = [
	{ name: "Amoxicillian", taken: 24.0, skipped: 6.0 },
	{ name: "Test Med", taken: 10.0, skipped: 5.0 }
]

const GetMedAdherence = (med) => med.taken / (med.taken + med.skipped);

export const AdherenceScreen = () => {
	let overallAdherence = meds.reduce((t, m) => GetMedAdherence(t) + GetMedAdherence(m)) / meds.length;
	let mostMissed = meds.reduce((c, m) => GetMedAdherence(c) < GetMedAdherence(m) ? c : m);
	let leastMissed = meds.reduce((c, m) => GetMedAdherence(c) > GetMedAdherence(m) ? c : m);

	return (
		<ScrollView>
			<View style={{ margin: 12 }}>

				<View style={{ alignItems: "center", justifyContent: "center", margin: 12 }}>
					<AdherenceGraph size={200} percent={overallAdherence} />
				</View>

				<TextSubHeader2 text="By Medication" style={{ marginBottom: 8 }} />
				{meds.map(m => <MedAdherenceCard med={m} key={m.name} />)}

				<View style={{ flex: 1, flexDirection: "row", marginTop: 16 }}>
					<View style={{ width: "50%", padding: 8, aspectRatio: 1 }}>
						<TextSubHeader2 text="Most Missed" style={{ marginLeft: 16 }} />
						<Card depth={1} style={{ flex: 1, margin: 4, padding: 16, justifyContent: 'end' }}>
							<TextSubHeader2 text={mostMissed.name} />
						</Card>
					</View>
					<View style={{ width: "50%", padding: 8, aspectRatio: 1 }}>
						<TextSubHeader2 text="Least Missed" style={{ marginLeft: 16 }} />
						<Card depth={1} style={{ flex: 1, margin: 4, padding: 16, justifyContent: 'end' }}>
							<TextSubHeader2 text={leastMissed.name} />
						</Card>
					</View>
				</View>
			</View>
		</ScrollView>
	)
}

const MedAdherenceCard = ({ med }) => {
	return (
		<Card depth={1} style={{ margin: 8, padding: 8 }}>
			<View style={{ flex: 1, flexDirection: "row", alignItems: 'center' }}>
				<AdherenceGraph size={64} percent={med.taken / (med.taken + med.skipped)} />
				<View style={{ marginLeft: 16 }}>
					<TextSubHeader2 text={med.name} />
					<TextNote text={`${med.taken} Doses taken | ${med.skipped} Skipped`} />
				</View>
			</View>
		</Card>
	)
}