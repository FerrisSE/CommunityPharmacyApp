import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import TextLink from '../components/text-link';
import mainStyles from '../main-styles';

const SearchForPatient = (firstName, familyName, birthdate, setPatients) => {
	fetch(`http://localhost:8080/api/patient/name/${firstName}/${familyName}/${birthdate}`, {
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

const SearchScreen = ({ navigation }) => {
	let [patients, setPatients] = React.useState([])
	let [givenName, setGivenName] = React.useState('')
	let [familyName, setFamilyName] = React.useState('')
	let [birthdate, setBirthdate] = React.useState('')

	return (
		<View style={mainStyles.container}>
			<Text style={mainStyles.title}>Patient Search</Text>

			<View style={mainStyles.CardView}>
				<Text style={mainStyles.subheader}>Given Name</Text>
				<TextInput
					style={mainStyles.textInput}
					placeholder="given name"
					onChangeText={text => setGivenName(text)}
					defaultValue={givenName}
				/>

				<Text style={mainStyles.subheader}>Family Name</Text>
				<TextInput
					style={mainStyles.textInput}
					placeholder="familty name"
					onChangeText={text => setFamilyName(text)}
					defaultValue={familyName}
				/>

				<Text style={mainStyles.subheader}>Birthdate</Text>
				<TextInput
					style={mainStyles.textInput}
					placeholder="birthday (year-month-day)"
					onChangeText={text => setBirthdate(text)}
					defaultValue={birthdate}
				/>
				<Button title="Search" onPress={() => SearchForPatient(givenName, familyName, birthdate, setPatients)} />
			</View>

			{patients.map((patient) => {
				return (
					<TextLink label={`${patient.givenName} ${patient.familyName}, ${patient.birthdate}`} onPress={() => {
						navigation.navigate({
							name: 'Patient Profile',
							params: {
								patient: patient
							}
						})
					}} />
				)
			})}

		</View>
	);
};

export default SearchScreen;