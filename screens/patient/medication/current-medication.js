import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Card } from '../../../components/cards';
import { TextSubHeader1 } from '../../../components/text';
import MedicationCard from '../../../components/medication-card';
import { Input } from '../../../components/input';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addMed, removeMed } from '../../../redux/slices/cart-slice';
import { ShoppingCart } from '../../../components/shopping-cart';
import { SERVER_URL } from '../../../constants';
import { AdherenceButtonLarge } from '../../../components/adherence-components';
import { HIGH_PRIORITY } from '../../../colors';

const CurrentMedicationScreen = ({ navigation }) => {
	let [meds, setMeds] = React.useState([])
	let [loading, setLoading] = React.useState(true)
	let [error, setError] = React.useState(false)
	let [searchText, setSearchText] = React.useState('')

	const userToken = useSelector((state) => state.userToken.value);
	const cart = useSelector((state) => state.cart);

	const dispatch = useDispatch();

	const changeCart = (med, add) => dispatch(add ? addMed(med) : removeMed(med));

	useEffect(async () => {
		var config = {
			method: 'get',
			url: `${SERVER_URL}/patient/medication/patient-medications`,
			headers: {
				Authorization: userToken,
			}
		};

		try {
			let data = (await axios(config)).data;
			setMeds(data);
		} catch (err) {
			console.error(err);
			setError(true);
		} finally {
			setLoading(false)
		}

	}, []);

	// show every med if they aren't searching
	let shownMeds = []
	if (searchText == "")
		shownMeds = meds
	else
		shownMeds = meds.filter(m => m.medicationName.toLowerCase().includes(searchText))


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

				<AdherenceButtonLarge navigation={navigation} />

				<View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', padding: 8, paddingTop: 16 }}>
					<TextSubHeader1 text="Current Medications" style={{ marginBottom: 4 }} />
					<ShoppingCart navigation={navigation} numbInCart={cart.meds.length} />
				</View>

				<Card depth={0}>
					<Input placeholder="search" setText={setSearchText} defaultText={searchText} />
					{
						shownMeds.map((m, i) => (
							<MedicationCard key={i} med={m} navigation={navigation} updateCartFunction={changeCart} />
						))
					}
				</Card>
			</SafeAreaView>
		</ScrollView>

	);
};

export default CurrentMedicationScreen;