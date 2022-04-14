import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { TextHeader1 } from '../../components/text';
import { SERVER_URL } from '../../constants';

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
	let [patients, setPatients] = React.useState([])
	let [givenName, setGivenName] = React.useState('')
	let [familyName, setFamilyName] = React.useState('')

	let [birthDay, setBirthDay] = React.useState('')
	let [birthMonth, setBirthMonth] = React.useState('')
	let [birthYear, setBirthYear] = React.useState('')

	return (
		<View style={{ margin: 12 }}>
			<TextHeader1 text="Patient Search" />
		</View>
	)
	// TODO: comeback to this when working on the pharmacy side. For now it is just disabled
	// 	<View style={mainStyles.container}>
	// 		<Text style={mainStyles.title}>Patient Search</Text>

	// 		<View style={mainStyles.CardView}>
	// 			<Text style={mainStyles.subheader}>Given Name</Text>
	// 			<TextInput
	// 				style={mainStyles.textInput}
	// 				placeholder="given name"
	// 				onChangeText={text => setGivenName(text)}
	// 				defaultValue={givenName}
	// 			/>

	// 			<Text style={mainStyles.subheader}>Family Name</Text>
	// 			<TextInput
	// 				style={mainStyles.textInput}
	// 				placeholder="familty name"
	// 				onChangeText={text => setFamilyName(text)}
	// 				defaultValue={familyName}
	// 			/>

	// 			<Text style={mainStyles.subheader}>Birthdate</Text>
	// 			<View style={mainStyles.row}>
	// 				<Text style={mainStyles.textImportant}>Month</Text>
	// 				<TextInput
	// 					style={mainStyles.textInput}
	// 					placeholder="month"
	// 					onChangeText={text => setBirthMonth(text)}
	// 					defaultValue={birthMonth}
	// 				/>
	// 				<Text style={mainStyles.textImportant}>Day</Text>
	// 				<TextInput
	// 					style={mainStyles.textInput}
	// 					placeholder="day"
	// 					onChangeText={text => setBirthDay(text)}
	// 					defaultValue={birthDay}
	// 				/>
	// 				<Text style={mainStyles.textImportant}>Year</Text>
	// 				<TextInput
	// 					style={mainStyles.textInput}
	// 					placeholder="year"
	// 					onChangeText={text => setBirthYear(text)}
	// 					defaultValue={birthYear}
	// 				/>
	// 			</View>

	// 			<Button title="Search" onPress={() => SearchForPatient(givenName, familyName, `${birthYear}-${birthMonth}-${birthDay}`, setPatients)} />
	// 		</View>

	// 		{patients.map((patient) => {
	// 			return (
	// 				<TextLink label={`${patient.givenName} ${patient.familyName}, ${patient.birthdate}`} onPress={() => {
	// 					navigation.navigate({
	// 						name: 'Patient Profile',
	// 						params: {
	// 							patient: patient
	// 						}
	// 					})
	// 				}} />
	// 			)
	// 		})}

	// 	</View>
	// );
};