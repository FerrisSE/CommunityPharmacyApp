import axios from "axios";
import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { OutlineButton, PrimaryButton } from "../../../components/buttons";
import { CloseButton } from "../../../components/close-button";
import { TextHeader2, TextHeader3, TextNote, TextSubHeader1, TextSubHeader2 } from "../../../components/text";
import { Modal, ModalFooter, ModalButton, ModalContent } from 'react-native-modals';
import { useSelector } from "react-redux";
import { SECONDARY_COLOR, WHITE } from "../../../colors";
import { Card } from "../../../components/cards";
import { TextInput } from "react-native-gesture-handler";

export const SchedulingConfirmScreen = ({ navigation, route }) => {
	// variables needed for the popup modal
	let [popUpVisible, setPopUpVisible] = useState(false);
	let [popUpText, setPopUpText] = useState('');
	let [popUpFailed, setPopUpFailed] = useState(true);
	let [notes, setNotes] = useState('');

	const userToken = useSelector((state) => state.userToken.value);

	let services = route.params.services;

	const confirmAppointment = () => {
		let data = {
			patientNotes: notes,
			patientId: services[0].patientId,
			day: services[0].start.format("YYYY-MM-DD"),
			start: services[0].start.format("HH:mm:ss"),
			end: services[0].end.format("HH:mm:ss"),
			category: services[0].name,
		};

		axios({
			method: 'post',
			url: `http://localhost:8080/api/schedule/0`,
			headers: {
				Authorization: userToken,
			},
			data: data
		}).then(_ => {
			setPopUpText("Scheduled Service Successfully!");
			setPopUpFailed(false);
			setPopUpVisible(true);
		}).catch(_ => {
			setPopUpText("Failed to Schedule Service!");
			setPopUpFailed(true);
			setPopUpVisible(true);
		});
	}

	return (
		<View style={{ backgroundColor: "#A9A9CC", flex: 1 }}>
			<SafeAreaView style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: "#EAF4F9", marginTop: 8, flex: 1 }}>
				<View style={{ margin: 16 }}>
					<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
						<CloseButton />
					</View>
					<TextHeader2 text="Service Confirmation" />
				</View>

				<View style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: WHITE, flex: 1, padding: 16 }}>
					{services.map(s =>
						<View>
							<TextHeader3 text={s.name} style={{ marginBottom: 24 }} />
							<View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-evenly' }}>
								<View style={{ flex: 1 }}>
									<TextSubHeader2 text="Date" />
									<TextSubHeader1 text={s.start.format("MM/DD/YY")} />
								</View>
								<View style={{ flex: 1 }}>
									<TextSubHeader2 text="Time" />
									<TextSubHeader1 text={s.start.format("h:mma")} />
								</View>
							</View>
						</View>
					)}

					<TextNote text="Notes for Pharmacy" style={{ marginTop: 24 }} />
					<View style={{ flex: 1, alignItems: 'center' }}>
						<Card color='secondary' depth={1} style={{ width: '90%', height: 128, marginTop: 4, marginBottom: 48 }}>
							<TextInput
								value={notes}
								onChangeText={t => setNotes(t)}
								multiline={true}
								style={{ flex: 1 }} />
						</Card>
					</View>

					<View style={{ alignItems: 'center' }}>
						<OutlineButton
							label="CANCEL"
							style={{ width: '75%', marginBottom: 12 }}
							onPress={navigation.goBack}
						/>
						<PrimaryButton
							label="CONFIRM"
							style={{ width: '75%', marginBottom: 32 }}
							onPress={confirmAppointment} />
					</View>

				</View>

				<Modal
					visible={popUpVisible}
					footer={
						<ModalFooter>
							<ModalButton
								text="Ok"
								onPress={() => {
									if (popUpFailed)
										setPopUpVisible(false);
									else
										navigation.popToTop();
								}}
							/>
						</ModalFooter>
					}>
					<ModalContent>
						<TextSubHeader2 text={popUpText} />
					</ModalContent>
				</Modal>
			</SafeAreaView>
		</View>
	)
}