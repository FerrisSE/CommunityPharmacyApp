import React, { useEffect, useRef, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, View } from 'react-native';
import { GRAY_2, PRIMARY_COLOR, WHITE } from '../../../colors';
import { PrimaryButton } from '../../../components/buttons';
import { CloseButton } from '../../../components/close-button';
import { TextHeader2, TextNote, TextSubHeader2 } from '../../../components/text';
import CalendarStrip from 'react-native-calendar-strip';
import { TimePicker } from '../../../components/time-picker';
import axios from 'axios';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons"
import { SERVER_URL } from '../../../constants';
import { Card } from '../../../components/cards';
import Modal, { ModalButton, ModalContent, ModalFooter } from 'react-native-modals';

export const PharmacistServicesDetailsScreen = ({ navigation, route }) => {
	const calendarRef = useRef();

	let [pickedId, setPickedId] = useState(-1);
	let [pharmacyInfo, setPharmacyInfo] = useState();
	let [bookedSlots, setBookedSlots] = useState([]);
	let [timeSlots, setTimeSlots] = useState([]);
	let [enabledWeekdays, setEnabledWeekdays] = useState([false, false, false, false, false, false, false]);
	let [popUpVisible, setPopUpVisible] = useState(false);
	let [popUpText, setPopUpText] = useState('');
	let [popUpFailed, setPopUpFailed] = useState(true);

	const userToken = useSelector((state) => state.userToken.value);

	const GenerateTimeslots = (info, date) => {
		// funky splitting to get the time today that the pharmacy opens
		let openTime = info.open.split(":");
		let open = moment(date).add(openTime[0], "hours").add(openTime[1], "minutes");

		// funky splitting to get the time today that the pharmacy closes
		let closeTime = info.close.split(":");
		let close = moment(date).add(closeTime[0], "hours").add(closeTime[1], "minutes");

		// get unavailable time just for selected date
		let unavailable = bookedSlots.map(s => moment(s.start + s.day, "hh:mm:ssYYYY-MM-DD")).filter(t => t.isSame(date, 'day'));
		let slots = [];

		// generate timeslots from opening time to closed time, based on the time slot length
		let currentMoment = open;
		while (currentMoment < close) {
			slots.push({
				time: currentMoment.clone(),
				available: !unavailable.some(s => s.isSame(currentMoment)),
			});
			currentMoment.add(info.slotDuration + info.slotBuffer, 'minutes');
		}

		setTimeSlots(slots);
		setPickedId(-1);
	}

	// only allow scheduling of times on open days from tomorrow to 1 month out
	const datesBlacklistFunc = date => {
		return !enabledWeekdays[date.day()] || date.isBefore(moment()) || date.isAfter(moment().add(1, 'month'));
	}

	useEffect(() => {
		// first get pharamacy information
		axios({
			method: 'get',
			url: `${SERVER_URL}/api/schedule/0/settings`,
			headers: {
				Authorization: userToken,
			}
		}).then(response => {
			console.log(response.data);
			setPharmacyInfo(response.data);

			// set open days
			// you can't set the state and use the new state in the same function
			// as it needs time to update I guess?
			let days = [
				response.data.days.sun,
				response.data.days.mon,
				response.data.days.tue,
				response.data.days.wed,
				response.data.days.thu,
				response.data.days.fri,
				response.data.days.sat,
			];

			setEnabledWeekdays(days);

			// get booked time slots
			let date = moment().add(1, 'month');
			axios({
				method: 'get',
				url: `${SERVER_URL}/api/schedule/0/${date.format('YYYY-MM-DD')}`,
				headers: {
					Authorization: userToken,
				}
			}).then(response => {
				console.log(response.data);
				setBookedSlots(response.data);

				// get the first avaiable date to view
				// tomorrow might be closed, so loop until there is an available date
				let startDate = moment().add(1, 'days');
				while (!days[startDate.day()]) {
					startDate.add(1, "days");
				}

				// view that first date
				calendarRef.current?.setSelectedDate(startDate);
			}).catch(err => {
				console.error(err);
			});
		}).catch(err => {
			console.error(err);
		});
	}, []);

	const OnDateSelected = date => GenerateTimeslots(pharmacyInfo, date.format("YYYY-MM-DD"));

	const confirmAppointment = () => {
		let pickedSlot = timeSlots[pickedId];
		let data = {
			patientId: route.params.patient.patientId,
			patientNotes: "",
			day: pickedSlot.time.format("YYYY-MM-DD"),
			start: pickedSlot.time.format("HH:mm:ss"),
			end: pickedSlot.time.clone().add(pharmacyInfo.slotDuration, 'minutes').format("HH:mm:ss"),
			category: route.params.service.name,
		};

		axios({
			method: 'post',
			url: `${SERVER_URL}/api/schedule/0`,
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

	const onBack = () => {
		navigation.pop();
	}

	return (
		<View style={{ flex: 1 }}>
			{/* Back Button */}
			< Pressable onPress={onBack} style={{ margin: 32 }}>
				<TextSubHeader2 text="< Back" style={{ color: GRAY_2 }} />
			</Pressable >

			<Card depth={1} style={{ margin: 32, flex: 1 }}>
				<ScrollView style={{ flex: 1, height: '100%' }}>
					<View style={{ alignItems: 'center' }}>

						<CalendarStrip
							ref={calendarRef}
							style={{ width: '90%', height: 150, paddingTop: 24, paddingBottom: 8 }}
							calendarHeaderStyle={{ fontFamily: "OpenSans-SemiBold", fontSize: 24 }}
							datesBlacklist={datesBlacklistFunc}
							onDateSelected={OnDateSelected}
							scrollToOnSetSelectedDate={false}
							calendarHeaderContainerStyle={{ padding: 4 }}
							highlightDateContainerStyle={{ backgroundColor: PRIMARY_COLOR, borderRadius: 16, padding: 2 }}
							highlightDateNumberStyle={{ color: WHITE }}
							highlightDateNameStyle={{ color: WHITE }}
							dayContainerStyle={{ backgroundColor: "#EDEDF4", borderRadius: 16, padding: 2 }}
							dateNameStyle={{ color: PRIMARY_COLOR }}
							dateNumberStyle={{ color: PRIMARY_COLOR }}
						/>

						<View style={{ flexDirection: "row" }}>

							<View style={{ flex: 1, margin: 32 }}>
								<TextHeader2 text={route.params.service.name} />
								<TextNote text={route.params.service.desc} style={{ margin: 4, flex: 1 }} />
								<PrimaryButton
									label="Schedule Appointment"
									style={{ width: '100%', marginBottom: 32 }}
									onPress={confirmAppointment} />
							</View>

							<View style={{ flex: 1, margin: 16 }}>
								<Card depth={1} color={WHITE} style={{ marginTop: 24, marginBottom: 24, width: '90%', flex: 1, padding: 0 }}>
									<TimePicker title="Available Appointments" subtitle="location name" times={timeSlots} activeId={pickedId} setActive={setPickedId} style={{ flex: 1 }} />
								</Card>
							</View>
						</View>


					</View>
				</ScrollView>
			</Card>
			<Modal visible={popUpVisible}>
				<ModalContent>
					<TextSubHeader2 text={popUpText} />
				</ModalContent>
				<ModalFooter>
					<ModalButton
						text="Ok"
						onPress={() => {
							if (popUpFailed)
								setPopUpVisible(false);
							else
								navigation.navigate("Scheduling", {
									screen: "Scheduling View"
								});
						}}
					/>
				</ModalFooter>
			</Modal>
		</View>
	);
};