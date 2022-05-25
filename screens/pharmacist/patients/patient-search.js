import React, { useState } from 'react';
import { View } from 'react-native';
import { TextHeader2, TextHeader3, TextSubHeader2 } from '../../../components/text';
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons";
import { SERVER_URL } from '../../../constants';
import { Card } from '../../../components/cards';
import { Input } from '../../../components/input';
import { PRIMARY_COLOR, WHITE } from '../../../colors';
import { OutlineButton, PrimaryButton } from '../../../components/buttons';
import { useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';
import { LoadingScreen } from '../../../loading-screen';
import { ErrorScreen } from '../../../error-screen';

const PatientResult = ({ patient, nav }) => {
	const viewPatient = () =>
		nav.navigate({
			name: 'Patient View',
			params: {
				patient: patient
			}
		});

	return (
		<View>
			<View style={{ flexDirection: 'row', alignContent: 'center' }}>
				<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
					<Icon name="account-circle" size={48} color={PRIMARY_COLOR} />
					<TextSubHeader2 text={`${patient.givenName} ${patient.familyName}`} style={{ margin: 12 }} />
					<TextSubHeader2 text={moment(patient.birthdate).format("MM/DD/YYYY")} />
				</View>
				<View style={{ flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'flex-end' }}>
					<OutlineButton label="View Profile" onPress={viewPatient} style={{ margin: 4, marginLeft: 12 }} />
				</View>
			</View>

			{/* Divider line */}
			<View style={{ flex: 1, backgroundColor: PRIMARY_COLOR, padding: 1, margin: 4 }}></View>
		</View>
	)
}

export const PharmacistPatientSearchScreen = ({ navigation }) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	let [searchText, setSearchText] = useState('');
	let [patients, setPatients] = useState([]);

	const userToken = useSelector((state) => state.userToken.value);

	const searchPress = async () => {
		var config = {
			method: 'get',
			url: `${SERVER_URL}/api/patient/name/${searchText}`,
			headers: {
				Authorization: userToken,
			}
		};

		try {
			setError(false);
			setLoading(true);
			setPatients((await axios(config)).data);
		} catch (err) {
			setError(err);
		}

		setLoading(false);
	}

	return (
		<Card style={{ flex: 1, margin: 48, padding: 32, alignItems: 'center' }} depth={0}>
			<View style={{ width: "100%", flex: 1 }}>
				<TextHeader2 text="Patient Search" style={{ color: PRIMARY_COLOR }} />
				<View style={{ width: "100%", flexDirection: 'row' }}>
					<Input placeholder="last name..." defaultText={searchText} setText={setSearchText} style={{ flex: 1, backgroundColor: WHITE }} />
					<PrimaryButton label="Search" onPress={searchPress} style={{ margin: 16, paddingLeft: 32, paddingRight: 32 }} />
				</View>
				{loading && <LoadingScreen />}
				{error && <ErrorScreen error={error} />}
				{patients.length != 0 && !loading && !error &&
					<View style={{ flex: 1 }}>
						<TextHeader3 text="Results" style={{ color: PRIMARY_COLOR, marginTop: 32 }} />

						<Card style={{ backgroundColor: WHITE, padding: 16, flex: 1 }} depth={0}>
							<ScrollView>
								{patients.map((patient, index) => (
									<PatientResult key={index} patient={patient} nav={navigation} />
								))}
							</ScrollView>
						</Card>
					</View>
				}
			</View>
		</Card>
	)
};