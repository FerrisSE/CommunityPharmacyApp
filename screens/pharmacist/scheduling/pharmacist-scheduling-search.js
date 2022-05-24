import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { TextHeader2, TextHeader3, TextSubHeader2 } from '../../../components/text';
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons";
import { SERVER_URL } from '../../../constants';
import { Card } from '../../../components/cards';
import { Input } from '../../../components/input';
import { PRIMARY_COLOR, WHITE, GRAY_2 } from '../../../colors';
import { OutlineButton, PrimaryButton } from '../../../components/buttons';
import { useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';
import { LoadingScreen } from '../../../loading-screen';

const PatientResult = ({ patient, nav }) => {
	const viewPatient = () =>
		nav.navigate("Patients", {
			screen: 'Patient View',
			params: {
				patient: patient
			}
		});

	const schedulePatient = () => {
		nav.navigate("Services", {
			screen: 'Services Schedule',
			params: {
				patient: patient
			}
		});
	}

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
					<OutlineButton label="Schedule" onPress={schedulePatient} style={{ margin: 4 }} />
				</View>
			</View>

			{/* Divider line */}
			<View style={{ flex: 1, backgroundColor: PRIMARY_COLOR, padding: 1, margin: 4 }}></View>
		</View>
	)
}

export const PharmacistScheduleSearchScreen = ({ navigation }) => {
	const [loading, setLoading] = useState(true);
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
			setPatients((await axios(config)).data);
			setLoading(false);
		} catch (err) {
			console.error(err);
		}
	}

	const onBack = () => navigation.navigate("Scheduling View");

	return (
		<View style={{ flex: 1 }}>
			{/* Back Button */}
			<Pressable onPress={onBack} style={{ margin: 32 }}>
				<TextSubHeader2 text="< Back to Schedule" style={{ color: GRAY_2 }} />
			</Pressable >

			<Card style={{ flex: 1, margin: 48, marginTop: 24, padding: 32, alignItems: 'center' }} depth={0}>
				<View style={{ width: "100%", flex: 1 }}>
					<TextHeader2 text="Create Appointment" style={{ color: PRIMARY_COLOR }} />
					<View style={{ width: "100%", flexDirection: 'row' }}>
						<Input placeholder="last name..." defaultText={searchText} setText={setSearchText} style={{ flex: 1, backgroundColor: WHITE }} />
						<PrimaryButton label="Search" onPress={searchPress} style={{ margin: 16, paddingLeft: 32, paddingRight: 32 }} />
					</View>
					{loading && <LoadingScreen />}
					{patients.length != 0 && !loading &&
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
		</View>
	)
};