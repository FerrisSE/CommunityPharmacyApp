import React, { useEffect, useRef } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { PRIMARY_COLOR, PRIMARY_COLOR_TRANSPARENT, WHITE } from '../../../colors';
import { PrimaryButton } from '../../../components/buttons';
import { CloseButton } from '../../../components/close-button';
import { TextHeader2, TextSubHeader2 } from '../../../components/text';
import CalendarStrip from 'react-native-calendar-strip';
import { TimePicker } from '../../../components/time-picker';
import axios from 'axios';
import { useSelector } from 'react-redux';
import moment from 'moment';

const ServiceScheduling = ({ navigation, route }) => {
	const calendarRef = useRef();
	let [pickedId, setPickedId] = React.useState(-1);
	let [pharmacyInfo, setPharmacyInfo] = React.useState();
	let [bookedSlots, setBookedSlots] = React.useState([]);
	let [timeSlots, setTimeSlots] = React.useState([]);
	let [enabledWeekdays, setEnabledWeekdays] = React.useState([false, false, false, false, false, false, false]);

	const userToken = useSelector((state) => state.userToken.value);

	const GenerateTimeslots = (info, date) => {
		let openTime = info.open.split(":");
		let open = moment(date).add(openTime[0], "hours").add(openTime[1], "minutes");

		let closeTime = info.close.split(":");
		let close = moment(date).add(closeTime[0], "hours").add(closeTime[1], "minutes");

		let unavailable = bookedSlots.map(s => moment(s.start + s.day, "hh:mm:ssYYYY-MM-DD")).filter(t => t.isSame(date, 'day'));
		let slots = [];

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

	const datesBlacklistFunc = date => {
		return !enabledWeekdays[date.day()] || date.isBefore(moment());
	}

	useEffect(() => {
		// first get pharamacy information
		axios({
			method: 'get',
			url: 'http://localhost:8080/api/schedule/0/settings',
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
				url: `http://localhost:8080/api/schedule/0/${date.format('YYYY-MM-DD')}`,
				headers: {
					Authorization: userToken,
				}
			}).then(response => {
				setBookedSlots(response.data);

				// get the first avaiable date to view
				let startDate = moment().add(1, 'days');
				while (!days[startDate.day()]) {
					startDate.add(1, "days");
				}

				// view that first date
				calendarRef.current.setSelectedDate(startDate);
			}).catch(err => {
				console.error(err);
			});
		}).catch(err => {
			console.error(err);
		});
	}, []);

	const OnDateSelected = date => GenerateTimeslots(pharmacyInfo, date.format("YYYY-MM-DD"));

	const requestAppointment = () => {
		if (pickedId == -1)
			return;

		let pickedSlot = timeSlots[pickedId];

		let data = {
			patientNotes: '',
			patientId: 0,
			day: pickedSlot.time.format("YYYY-MM-DD"),
			start: pickedSlot.time.format("hh:mm:ss"),
			end: pickedSlot.time.clone().add(pharmacyInfo.slotDuration, 'minutes').format("hh:mm:ss"),
			category: route.params.service.name,
		};

		console.log(data);

		axios({
			method: 'post',
			url: `http://localhost:8080/api/schedule/0`,
			headers: {
				Authorization: userToken,
			},
			data: data
		}).then(response => {
			console.log(response);
			navigation.goBack();
		}).catch(error => console.error(error));
	}

	return (
		<ScrollView style={{ backgroundColor: "#A9A9CC", flex: 1 }}>
			<SafeAreaView style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: "#EEEEF4", marginTop: 8, flex: 1 }}>
				<View style={{ margin: 16 }}>
					<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
						<TextSubHeader2 text="Service Scheduling" />
						<CloseButton />
					</View>
					<TextHeader2 text={route.params.service.name} />
				</View>

				<View style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: WHITE, flex: 1, alignItems: 'center' }}>
					<CalendarStrip
						ref={calendarRef}
						style={{ width: "90%", paddingTop: 32, paddingBottom: 32 }}
						calendarHeaderStyle={{ fontFamily: "Open Sans SemiBold", fontSize: 24 }}
						minDate={moment()}
						maxDate={moment().add(1, "month")}
						datesBlacklist={datesBlacklistFunc}
						onDateSelected={OnDateSelected}
						calendarHeaderContainerStyle={{ padding: 4 }}
						highlightDateContainerStyle={{ backgroundColor: PRIMARY_COLOR, borderRadius: 16, padding: 4 }}
						highlightDateNumberStyle={{ color: WHITE }}
						highlightDateNameStyle={{ color: WHITE }}
						dayContainerStyle={{ backgroundColor: PRIMARY_COLOR_TRANSPARENT, borderRadius: 16, padding: 4 }}
						dateNameStyle={{ color: PRIMARY_COLOR }}
						dateNumberStyle={{ color: PRIMARY_COLOR }}
					/>

					<TimePicker title="Available Appointments" subtitle="location name" times={timeSlots} activeId={pickedId} setActive={setPickedId} style={{ marginTop: 24, marginBottom: 24, width: '90%', flex: 1 }} />

					<PrimaryButton
						label="CONFIRM APPOINTMENT"
						style={{ width: '75%', marginBottom: 32 }}
						onPress={requestAppointment} />
				</View>
			</SafeAreaView>
		</ScrollView>
	);
};

export default ServiceScheduling;