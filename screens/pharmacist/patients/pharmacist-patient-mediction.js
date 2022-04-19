import React from "react";
import { ScrollView, View } from "react-native";
import { Card } from "../../../components/cards";
import { TextBody, TextSubHeader1 } from "../../../components/text";
import * as Progress from 'react-native-progress';
import { PRIMARY_COLOR } from "../../../colors";

const meds = [
	{ name: "med name", treats: "High blood Pressure", refill: "09/12/2021", amountTotal: 10, amountLeft: 5 },
	{ name: "med name", treats: "High blood Pressure", refill: "09/12/2021", amountTotal: 10, amountLeft: 10 }
]

export const PharmacistPatientMedicationScreen = () => {
	return (
		<Card depth={2} style={{ flex: 1 }}>
			<ScrollView>
				{meds.map(m => (
					<Card key={m.name} depth={3} style={{ margin: 8, padding: 12 }}>
						<TextSubHeader1 text={m.name} style={{ marginBottom: 8 }} />
						<TextBody text={`Treated Condition: ${m.treats}`} />
						<TextBody text={`Next Refill: ${m.refill}`} />

						<TextBody style={{ marginTop: 4 }} text="Amount Left:" />
						<Progress.Bar
							progress={m.amountLeft / m.amountTotal}
							width={null}
							height={8}
							animated={false}
							color={PRIMARY_COLOR}
							unfilledColor={'#E3E5EB'}
							borderWidth={0}
						/>
					</Card>
				))}
			</ScrollView>
		</Card>
	)
} 