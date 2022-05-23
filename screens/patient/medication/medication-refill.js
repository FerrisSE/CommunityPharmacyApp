import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import MedicationCard from '../../../components/medication-card';
import { OutlineButton, PrimaryButton } from '../../../components/buttons';
import { TextSubHeader1, TextSubHeader2 } from '../../../components/text';
import { PRIMARY_COLOR } from '../../../colors';
import { Card } from '../../../components/cards';
import { useDispatch, useSelector } from 'react-redux';
import { RefillDeliveryCard } from '../../../components/refill-delivery-card';
import Modal, { ModalButton, ModalContent, ModalFooter } from 'react-native-modals';
import { clearCart } from '../../../redux/slices/cart-slice';
import axios from 'axios';
import { SERVER_URL } from '../../../constants';

const MedicationRefillScreen = ({ navigation, route }) => {
	const [selectedOption, setSelectedOption] = useState(-1);
	const [modalOpen, setModalOpen] = useState(false);

	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart.meds);
	const userToken = useSelector((state) => state.userToken.value);

	const pressOrder = async () => {
		try {

			let config = {
				method: 'post',
				url: `${SERVER_URL}/patient/orders`,
				headers: {
					Authorization: userToken,
				},
				data: cart.map(m => m.medicationId)
			};

			let response = (await axios(config)).data;

			setModalOpen(true);
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<ScrollView style={{ flex: 1 }}>
			<SafeAreaView style={{ margin: 16, flex: 1 }}>
				<Card depth={1}>
					<TextSubHeader1 text="Shopping Cart" style={{ marginLeft: 12, marginTop: 8 }} />
					{cart.map((m, i) => <MedicationCard med={m} navigation={navigation} key={i} />)}
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

					<PrimaryButton label="Confirm Order" onPress={pressOrder} style={{ margin: 6 }} />
					<OutlineButton label="Cancel Order" style={{ margin: 6 }} color={PRIMARY_COLOR} />
				</View>
			</SafeAreaView>

			<Modal visible={modalOpen}>
				<ModalContent>
					<TextSubHeader2 text="Thanks for your order!" />
				</ModalContent>
				<ModalFooter>
					<ModalButton
						text="Ok"
						onPress={() => {
							setModalOpen(false);
							dispatch(clearCart());
							navigation.popToTop();
						}}
					/>
				</ModalFooter>
			</Modal>
		</ScrollView>
	);
};

export default MedicationRefillScreen;