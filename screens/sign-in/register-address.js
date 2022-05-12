import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { OutlineButton, PrimaryButton } from '../../components/buttons';
import { Input } from '../../components/input';
import { TextHeader2, TextNote } from '../../components/text';
import { setAddress } from '../../redux/slices/register-slice';
import { Dropdown } from 'react-native-element-dropdown';

export const RegisterAddressScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const [address, setAdress] = useState('');
	const [city, setCity] = useState('');
	const [zip, setZip] = useState('');

	const [state, setState] = useState(null);
	const states = [
		{ label: 'Michigan', value: 'MI' },
	];

	let navBack = () => navigation.pop();
	let navNext = () => {
		if (address == "" || city == "" || state == "" || zip == "")
			return;

		dispatch(setAddress(`${address} ${city}, ${state}, ${zip}`));
		navigation.push("Register Preferred Pharmacy");
	}

	return (
		<SafeAreaView style={{ padding: 16, paddingTop: 32 }}>
			<TextHeader2 text="Address" style={{ marginBottom: 16 }} />

			<TextNote text="Address" />
			<Input placeholder="Address" defaultText={address} setText={setAdress} />

			<TextNote text="City" />
			<Input placeholder="City" defaultText={city} setText={setCity} />

			<TextNote text="State" />
			<Dropdown
				data={states}
				value={state}
				labelField='label'
				valueField='value'
				placeholder='State'
				onChange={item => {
					setState(item.value);
				}}
				activeColor='#00000000'
				style={{
					padding: 10,
					margin: 16,
					backgroundColor: "#E1E1E8",
					borderRadius: 0,
					paddingLeft: 32,
					borderRadius: 25,
					fontFamily: 'OpenSans-Regular',
					fontSize: 14,
				}}
				containerStyle={{
					fontFamily: 'OpenSans-Regular',
					fontSize: 14,
					padding: 10,
					backgroundColor: "#E1E1E8",
					shadowOpacity: 0,
					borderRadius: 0,
					borderRadius: 25,
				}}
			/>
			<TextNote text="Zip" />
			<Input placeholder="Zip" defaultText={zip} setText={setZip} />

			<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
				<OutlineButton label="< Back" style={{ margin: 16 }} onPress={navBack} />
				<PrimaryButton label="Next >" style={{ paddingLeft: 25, paddingRight: 25, margin: 16 }} onPress={navNext} />
			</View>
		</SafeAreaView >
	);
};