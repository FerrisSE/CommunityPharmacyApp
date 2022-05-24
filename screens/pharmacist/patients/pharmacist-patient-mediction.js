import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Card } from "../../../components/cards";
import { TextBody, TextSubHeader1 } from "../../../components/text";
import * as Progress from 'react-native-progress';
import { PRIMARY_COLOR } from "../../../colors";
import { SERVER_URL } from "../../../constants";
import axios from "axios";
import { useSelector } from "react-redux";
import { LoadingScreen } from "../../../loading-screen";

export const PharmacistPatientMedicationScreen = ({ patient }) => {
	const [loading, setLoading] = useState(true);
	const [meds, setMeds] = useState([]);

	const userToken = useSelector((state) => state.userToken.value);

	useEffect(async () => {
		var config = {
			method: 'get',
			url: `${SERVER_URL}/provider/medications/patient-medications/${patient.patientId}`,
			headers: {
				Authorization: userToken,
			}
		};

		let results = (await axios(config)).data;
		setMeds(results);
		setLoading(false);
	}, []);

	if (loading)
		return <LoadingScreen />

	return (
		<Card depth={2} style={{ flex: 1 }}>
			<ScrollView>
				{meds.map((m, i) => (
					<Card key={i} depth={3} style={{ margin: 8, padding: 12 }}>
						<TextSubHeader1 text={m.medName} style={{ marginBottom: 8 }} />
						<TextBody text={`Treated Condition: ${m.reasonText}`} />

						<TextBody style={{ marginTop: 4 }} text="Amount Left:" />
						<Progress.Bar
							progress={m.quantityLeft / m.quantity}
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