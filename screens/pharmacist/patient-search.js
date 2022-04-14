import React, { useState } from 'react';
import { View } from 'react-native';
import { TextHeader2, TextHeader3, TextSubHeader2 } from '../../components/text';
import { SERVER_URL } from '../../constants';
import { Card } from '../../components/cards';
import { Input } from '../../components/input';
import { PRIMARY_COLOR, WHITE } from '../../colors';
import { PrimaryButton } from '../../components/buttons';
import { useSelector } from 'react-redux';
import axios from 'axios';

const SearchForPatient = (firstName, familyName, birthdate, setPatients) => {
	fetch(`${SERVER_URL}/api/patient/name/${firstName}/${familyName}/${birthdate}`, {
		"method": "GET",
		"headers": {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	}).then(response => response.json())
		.then(response => setPatients(response))
		.catch(err => {
			console.log(err)
			return []
		})
}

export const SearchScreen = ({ navigation }) => {
	let [searchText, setSearchText] = useState('');
	let [patients, setPatients] = useState(false);

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
							{patients.map((patient) => (
								<TextSubHeader2 text={`${patient.givenName} ${patient.familyName}, ${patient.birthdate}`} style={{ margin: 12 }} />
							))}
						</Card>
					</View>
				}
			</View>
		</Card>
	)
};