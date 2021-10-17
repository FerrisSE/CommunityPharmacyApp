import React from 'react';
import { Button, Text, View } from 'react-native';

const SearchScreen = ({ navigation }) => {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Search</Text>
			<Button
				title="Patient Profile Screen"
				onPress={() => navigation.navigate({
					name: 'Patient Profile',
					params: {
						patient: {
							"givenName": "Joe",
							"familyName": "Bob",
							"phoneNumber": "123456789",
							"gender": "male",
							"birthdate": "2020-09-14",
							"addressStreet": "nothing",
							"addressZipcode": "456465",
							"addressCity": "nothing",
							"addressState": "nothing",
							"status": true,
							"consentTimeStamp": "2020-09-14",
							"conditions": null,
							"medications": null,
							"allergies": null
						}
					}
				})}
			/>
		</View>
	);
};

export default SearchScreen;