import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import MedicationCard from '../../../components/medication-card';
import { OutlineButton, PrimaryButton } from '../../../components/buttons';
import { TextSubHeader1 } from '../../../components/text';
import { PRIMARY_COLOR } from '../../../colors';
import { Card } from '../../../components/cards';
import { useSelector } from 'react-redux';
import { RefillDeliveryCard } from '../../../components/refill-delivery-card';

const MedicationRefillScreen = ({ navigation, route }) => {
	const cart = useSelector((state) => state.cart.meds);
	const [selectedOption, setSelectedOption] = React.useState(-1);

	return (
		<ScrollView style={{ flex: 1 }}>
			<SafeAreaView style={{ margin: 16, flex: 1 }}>
				<Card depth={1}>
					<TextSubHeader1 text="Shopping Cart" style={{ marginLeft: 12, marginTop: 8 }} />
					{cart.map(m => <MedicationCard med={m} navigation={navigation} key={m.medicationName} />)}
				</Card>

				<View style={{ marginTop: 16 }}>
					<RefillDeliveryCard
						label="Pick-up"
						time="Monday, 10/15"
						location={"Patient Name\nStreet Address\nCity, State"}
						selected={selectedOption == 0}
						onPress={() => setSelectedOption(0)}
						style={{ margin: 4 }}
					/>
					<RefillDeliveryCard
						label="Delivery"
						time="Wednesday, 10/17"
						location={"Pharmacy Name\nStreet Address\nCity, State"}
						selected={selectedOption == 1}
						onPress={() => setSelectedOption(1)}
						style={{ margin: 4 }}
					/>

					<PrimaryButton label="Confirm Order" style={{ margin: 6 }} />
					<OutlineButton label="Cancel Order" style={{ margin: 6 }} color={PRIMARY_COLOR} />
				</View>
			</SafeAreaView>
		</ScrollView>
	);
};

export default MedicationRefillScreen;