import React from 'react';
import { FlatList, SafeAreaView, ScrollView, Text, View } from 'react-native';
import MedicationCard from '../../../components/medication-card';
import BouncyCheckboxGroup from "react-native-bouncy-checkbox-group";
import { OutlineButton, PrimaryButton } from '../../../components/buttons';
import { TextSubHeader1 } from '../../../components/text';
import { PRIMARY_COLOR } from '../../../colors';
import { Card } from '../../../components/cards';
import { useSelector } from 'react-redux';

const DeliverOptions = [
	{
		id: 0,
		text: "Pick-up",
		fillColor: PRIMARY_COLOR,
		textStyle: {
			fontSize: 24,
			textDecorationLine: "none",
		},
	},
	{
		id: 1,
		text: "Delivery",
		fillColor: PRIMARY_COLOR,
		textStyle: {
			fontSize: 24,
			textDecorationLine: "none",
		},
	}
]

const MedicationRefillScreen = ({ navigation, route }) => {
	const cart = useSelector((state) => state.cart.meds);

	return (
		<ScrollView style={{ flex: 1 }}>
			<SafeAreaView style={{ margin: 16, flex: 1 }}>
				<Card depth={1}>
					<TextSubHeader1 text="Shopping Cart" style={{ marginLeft: 12, marginTop: 8 }} />
					<FlatList
						data={cart}
						renderItem={(med) => <MedicationCard med={med.item} navigation={navigation} />}
						keyExtractor={item => item.display}
					/>
				</Card>

				<View style={{ marginTop: 16 }}>
					<BouncyCheckboxGroup
						data={DeliverOptions}
						style={{ flexDirection: "column", margin: 6, paddingBottom: 12 }}
					/>

					<PrimaryButton label="Confirm Order" style={{ margin: 6 }} />
					<OutlineButton label="Cancel Order" style={{ margin: 6 }} color={PRIMARY_COLOR} />
				</View>
			</SafeAreaView>
		</ScrollView>
	);
};

export default MedicationRefillScreen;