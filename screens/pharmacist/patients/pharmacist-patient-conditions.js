import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { Card } from "../../../components/cards";
import { TextBody, TextSubHeader1, TextSubHeader2 } from "../../../components/text";
import { SERVER_URL } from "../../../constants";
import { ErrorScreen } from "../../../error-screen";
import { LoadingScreen } from "../../../loading-screen";

export const PharmacistPatientConditionsScreen = ({ patient }) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [conditions, setConditions] = useState([]);

	const userToken = useSelector((state) => state.userToken.value);

	useEffect(async () => {
		var config = {
			method: 'get',
			url: `${SERVER_URL}/provider/condition/${patient.patientId}`,
			headers: {
				Authorization: userToken,
			}
		};

		try {
			let results = (await axios(config)).data;
			setConditions(results);
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
			<TextSubHeader1 text="Active Health Conditions" style={{ marginTop: 24 }} />

			{conditions.length == 0 ?
				<TextBody text="No Conditions on Record" style={{ margin: 8 }} />
				:
				conditions.map((c, i) => <ConditionCard condition={c} key={i} />)
			}
		</ScrollView>
	)
}

const ConditionCard = ({ condition }) => {
	return (
		<Card depth={1} style={{ padding: 8, margin: 8 }}>
			<TextBody text={`Added ${moment(condition.onsetStart).format('MM/DD/YYYY')}`} />
			<TextSubHeader2 text={condition.text} />
		</Card>
	)
}