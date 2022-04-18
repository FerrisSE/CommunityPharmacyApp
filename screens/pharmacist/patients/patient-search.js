import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { TextHeader2, TextHeader3, TextSubHeader2 } from '../../../components/text';
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons"
import { SERVER_URL } from '../../../constants';
import { Card } from '../../../components/cards';
import { Input } from '../../../components/input';
import { PRIMARY_COLOR, WHITE } from '../../../colors';
import { OutlineButton, PrimaryButton } from '../../../components/buttons';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

const PatientResult = ({ patient }) => {
	return (
		<View>
			<View style={{ flexDirection: 'row', alignContent: 'center' }}>
				<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
					<Icon name="account-circle" size={48} color={PRIMARY_COLOR} />
					<TextSubHeader2 text={`${patient.givenName} ${patient.familyName}`} style={{ margin: 12 }} />
					<TextSubHeader2 text={patient.birthdate} />
				</View>
				<View style={{ flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'flex-end' }}>
					<OutlineButton label="Schedule" style={{ margin: 4 }} />
					<OutlineButton label="View Profile" style={{ margin: 4, marginLeft: 12 }} />
				</View>
			</View>

			{/* Divider line */}
			<View style={{ flex: 1, backgroundColor: PRIMARY_COLOR, padding: 1, margin: 4 }}></View>
		</View>
	)
}

export const PharmacistPatientSearchScreen = ({ navigation }) => {
	let [searchText, setSearchText] = useState('');
	let [patients, setPatients] = useState([
		{ givenName: "Jacob", familyName: "Goeldel", birthdate: "none" },
	]);

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
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<Card style={{ flex: 1, margin: 48, padding: 32, alignItems: 'center' }} depth={0}>
			<View style={{ width: "100%", maxWidth: '60rem', flex: 1 }}>
				<TextHeader2 text="Patient Search" style={{ color: PRIMARY_COLOR }} />
				<View style={{ width: "100%", flexDirection: 'row' }}>
					<Input placeholder="last name..." defaultText={searchText} setText={setSearchText} style={{ flex: 1, backgroundColor: WHITE }} />
					<PrimaryButton label="Search" onPress={searchPress} style={{ margin: 16, paddingLeft: 32, paddingRight: 32 }} />
				</View>
				{patients &&
					<View style={{ flex: 1 }}>
						<TextHeader3 text="Results" style={{ color: PRIMARY_COLOR, marginTop: 32 }} />

						<Card style={{ backgroundColor: WHITE, padding: 16, flex: 1 }} depth={0}>
							<ScrollView>
								{patients.map((patient) => (
									<PatientResult patient={patient} />
								))}
							</ScrollView>
						</Card>
					</View>
				}
			</View>
		</Card>
	)
};