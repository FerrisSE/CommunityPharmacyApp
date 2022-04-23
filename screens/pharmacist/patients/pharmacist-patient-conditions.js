import React from "react";
import { ScrollView } from "react-native";
import { Card } from "../../../components/cards";
import { TextBody, TextSubHeader1, TextSubHeader2 } from "../../../components/text";

const conditions = [
	{
		added: "02/22/2022",
		name: "Diabetes type II"
	},
	{
		added: "04/23/2022",
		name: "Congestive Heart Failure (CHF)"
	}
]

const allergies = [
	{
		added: "04/23/2022",
		name: "Peanut Allergy"
	}
]

export const PharmacistPatientConditionsScreen = () => {
	return (
		<ScrollView>
			<TextSubHeader1 text="Active Health Conditions" style={{ marginTop: 24 }} />
			<TextSubHeader2 text="Updated: 02/22/2022" />
			{conditions.map(c => <ConditionCard condition={c} />)}

			<TextSubHeader1 text="Allergies" style={{ marginTop: 24 }} />
			<TextSubHeader2 text="Updated: 02/22/2022" />
			{allergies.map(c => <ConditionCard condition={c} />)}
		</ScrollView>
	)
}

const ConditionCard = ({ condition }) => {
	return (
		<Card depth={1} style={{ padding: 8, margin: 8 }}>
			<TextBody text={`Added ${condition.added}`} />
			<TextSubHeader2 text={condition.name} />
		</Card>
	)
}