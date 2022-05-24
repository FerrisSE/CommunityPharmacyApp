import React, { useEffect, useRef, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, View } from 'react-native';
import { PRIMARY_COLOR, WHITE } from '../../../colors';
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
import { LoadingScreen } from '../../../loading-screen';

const ServiceScheduling = ({ navigation, route }) => {
	const calendarRef = useRef();

	const [loading, setLoading] = useState(true);
	let [descVisible, setDescVisible] = useState(false);
	let [pickedId, setPickedId] = useState(-1);
	let [pharmacyInfo, setPharmacyInfo] = useState();
	let [bookedSlots, setBookedSlots] = useState([]);
	let [timeSlots, setTimeSlots] = useState([]);
	let [enabledWeekdays, setEnabledWeekdays] = useState([false, false, false, false, false, false, false]);

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
				setBookedSlots(response.data);

				// get the first avaiable date to view
				// tomorrow might be closed, so loop until there is an available date
				let startDate = moment().add(1, 'days');
				while (!days[startDate.day()]) {
					startDate.add(1, "days");
				}

				// view that first date
				calendarRef.current?.setSelectedDate(startDate);

				setLoading(false);
			}).catch(err => {
				console.error(err);
			});
		}).catch(err => {
			console.error(err);
		});
	}, []);

	const OnDateSelected = date => GenerateTimeslots(pharmacyInfo, date.format("YYYY-MM-DD"));

	const selectAppointment = () => {
		// make sure something is selected
		if (pickedId == -1)
			return;

		// construct appointment data
		let pickedSlot = timeSlots[pickedId];
		let data = {
			start: pickedSlot.time,
			end: pickedSlot.time.clone().add(pharmacyInfo.slotDuration, 'minutes'),
			name: route.params.service.name,
		};

		navigation.navigate({
			name: 'Confirmation',
			params: {
				services: [data]
			}
		});
	}

	return (
		<SafeAreaView style={{ backgroundColor: "#EEEEF4", height: '100%' }}>
			<View style={{ margin: 16 }}>
				<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
					<TextSubHeader2 text="Service Scheduling" />
					<CloseButton />
				</View>
				<View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
					<TextHeader2 text={route.params.service.name} />
					<Pressable onPress={() => setDescVisible(!descVisible)}>
						<Icon name='help-circle' size={25} />
					</Pressable>
				</View>
				{descVisible && <TextNote text={route.params.service.desc} style={{ margin: 4 }} />}
			</View>

			<ScrollView style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: WHITE, flex: 1, height: '100%' }}>
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

					{loading ?
						<LoadingScreen />
						:
						<TimePicker title="Available Appointments" subtitle="location name" times={timeSlots} activeId={pickedId} setActive={setPickedId} style={{ marginTop: 24, marginBottom: 24, width: '90%', flex: 1 }} />
					}

					<PrimaryButton
						label="SELECT APPOINTMENT"
						style={{ width: '75%', marginBottom: 32 }}
						onPress={selectAppointment} />

				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default ServiceScheduling;