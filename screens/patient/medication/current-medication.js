import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Card } from '../../../components/cards';
import { TextSubHeader1 } from '../../../components/text';
import { OutlineButton } from '../../../components/buttons';
import MedicationCard from '../../../components/medication-card';
import { PRIMARY_COLOR, HIGH_PRIORITY } from '../../../colors';
import { Input } from '../../../components/input';
import { useSelector } from 'react-redux';
import axios from 'axios';

const CurrentMedicationScreen = ({ navigation }) => {
	let [fhirPatient, setFhirPatient] = React.useState('')
	let [loading, setLoading] = React.useState(true)
	let [error, setError] = React.useState(false)
	let [searchText, setSearchText] = React.useState('')
	let [refillCart, setRefillCart] = React.useState([])

	const userToken = useSelector((state) => state.userToken.value);

	const ChangeMedCart = (id, add) => {
		if (add) // adding med to cart
			setRefillCart([...refillCart, id])
		else // remove med from cart
			setRefillCart(refillCart.filter(med => med != id))
	}

	useEffect(() => {
		var config = {
			method: 'get',
			url: 'http://localhost:8080/api/patient/medications/0',
			headers: {
				Authorization: userToken,
			}
		};

		axios(config)
			.then(response => setFhirPatient(response.data))
			.catch(err => {
				console.error(err);
				setError(true);
			})
			.finally(() => setLoading(false));
	}, []);

	const order = () => navigation.navigate({
		name: 'Refill Order',
		params: {
			meds: fhirPatient["patient-medications"].filter(med => refillCart.includes(med.medicationName)),
		}
	});

	// show every med if they aren't searching
	let shownMeds = []
	if (searchText == "")
		shownMeds = fhirPatient["patient-medications"]
	else
		shownMeds = fhirPatient["patient-medications"].filter(m => m.medicationName.toLowerCase().includes(searchText))


	if (error)
		return (
			<SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<TextSubHeader1 text="Something Went Wrong!" style={{ color: HIGH_PRIORITY }} />
			</SafeAreaView>
		)
	if (loading)
		return (
			<SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<TextSubHeader1 text="Loading..." />
			</SafeAreaView>
		)


	return (
		<ScrollView>
			<SafeAreaView style={{ flex: 1, margin: 8 }}>
				<View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', padding: 8, paddingTop: 16 }}>
					<TextSubHeader1 text="Current Medications" style={{ marginBottom: 4 }} />
					{refillCart.length != 0 && <OutlineButton label="Order" onPress={order} color={PRIMARY_COLOR} />}
				</View>

				<Card depth={0}>
					<Input placeholder="search" setText={setSearchText} defaultText={searchText} />
					{
						shownMeds.map(m => (
							<MedicationCard med={m} navigation={navigation} updateCartFunction={ChangeMedCart} />
						))
					}
				</Card>
			</SafeAreaView>
		</ScrollView>

	);
};

export default CurrentMedicationScreen;