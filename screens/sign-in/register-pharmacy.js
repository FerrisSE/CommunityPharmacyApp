import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { OutlineButton, PrimaryButton } from '../../components/buttons';
import { Card } from '../../components/cards';
import { Input } from '../../components/input';
import { TextBody, TextHeader2, TextHeader3, TextNote, TextSubHeader1, TextSubHeader2 } from '../../components/text';
import { setPharmacy } from '../../redux/slices/register-slice';

const pharmacies = [
	{
		id: 0,
		name: 'test name 1',
		street: '1234 street name',
		city: 'Grand Rapids',
		state: "MI",
		zip: '1234'
	},
	{
		id: 1,
		name: 'great pharmacy',
		street: '6547 Fieldway Dr',
		city: 'Big Rapids',
		state: "MI",
		zip: '48653'
	}
]

const PharmacyContains = (pharm, search) =>
	pharm.name.toLowerCase().includes(search) ||
	pharm.street.toLowerCase().includes(search) ||
	pharm.city.toLowerCase().includes(search) ||
	pharm.state.toLowerCase().includes(search) ||
	pharm.zip.toLowerCase().includes(search);

export const RegisterPharmacyScreen = ({ navigation }) => {
	let navBack = () => navigation.pop();
	let navNext = () => {
		if (preferredPharmacy == -1)
			return;

		navigation.push("Register Privacy Consent");
	}

	const dispatch = useDispatch();

	const preferredPharmacy = useSelector((state) => state.register.pharmacy);
	const setPreferredPharmacy = p => dispatch(setPharmacy(p));

	const [search, SetSearch] = useState('');

	const filteredPharmacies = pharmacies.filter(p => PharmacyContains(p, search.toLowerCase()));

	return (
		<SafeAreaView style={{ padding: 16, paddingTop: 32 }}>
			<TextHeader3 text="Set your Preferred Pharmacy" style={{ marginBottom: 16, textAlign: 'center' }} />

			<Card depth={1}>
				<Input placeholder="Search..." defaultText={search} setText={SetSearch} />

				{filteredPharmacies.map(p =>
					<Pressable key={p.id} onPress={() => setPreferredPharmacy(p.id)}>
						<Card depth={2} outlined={p.id == preferredPharmacy} style={{ margin: 4, padding: 16 }}>
							<TextSubHeader1 text={p.name} style={{ marginBottom: 8 }} />
							<TextNote text="Address" />
							<TextBody text={p.street} />
							<TextBody text={`${p.city}, ${p.state} ${p.zip}`} />
						</Card>
					</Pressable>
				)}
			</Card>

			<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
				<OutlineButton label="< Back" style={{ margin: 16 }} onPress={navBack} />
				<PrimaryButton label="Next >" style={{ paddingLeft: 25, paddingRight: 25, margin: 16 }} onPress={navNext} />
			</View>
		</SafeAreaView>
	);
};