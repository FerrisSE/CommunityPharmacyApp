import React, { useEffect } from 'react';
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
	let [pickedId, setPickedId] = React.useState(-1);
	let [pharmacyInfo, setPharmacyInfo] = React.useState();
	let [timeSlots, setTimeSlots] = React.useState([]);
	let [enabledWeekdays, setEnabledWeekdays] = React.useState([false, false, false, false, false, false, false]);

	const userToken = useSelector((state) => state.userToken.value);

	const GenerateTimeslots = (info, date) => {
		console.log("this");
		let config = {
			method: 'get',
			url: `http://localhost:8080/api/schedule/0/${date}`,
			headers: {
				Authorization: userToken,
			}
		};

		axios(config)
			.then(response => {
				let unavailable = response.data;

				let open = moment(info.open, "hh:mm:ss");
				let close = moment(info.close, "hh:mm:ss");
				let slots = [];

				let currentMoment = open;

				while (currentMoment < close) {
					slots.push({
						time: currentMoment.format('h:mm'),
						meridiem: currentMoment.format('a'),
						available: !unavailable.some(s => moment(s.start, "hh:mm:ss").isSame(currentMoment)),
					});
					currentMoment.add(info.slotDuration + info.slotBuffer, 'minutes');
				}

				setTimeSlots(slots);
				setPickedId(-1);
			})
			.catch(err => {
				console.error(err);
			});
	}

	useEffect(() => {
		console.log("called");
		let config = {
			method: 'get',
			url: 'http://localhost:8080/api/schedule/0/settings',
			headers: {
				Authorization: userToken,
			}
		};

		axios(config)
			.then(response => {
				setPharmacyInfo(response.data);

				setEnabledWeekdays([
					response.data.days.sun,
					response.data.days.mon,
					response.data.days.tue,
					response.data.days.wed,
					response.data.days.thu,
					response.data.days.fri,
					response.data.days.sat,
				]);

				GenerateTimeslots(response.data, "2022-02-19");
			})
			.catch(err => {
				console.error(err);
			});
	}, []);

	const datesBlacklistFunc = date => {
		return !enabledWeekdays[date.isoWeekday()] || date.isBefore(moment());
	}

	const OnDateSelected = date => {
		GenerateTimeslots(pharmacyInfo, date.format("YYYY-MM-DD"));
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
						style={{ width: "90%", paddingTop: 32, paddingBottom: 32 }}
						calendarHeaderStyle={{ fontFamily: "Open Sans SemiBold", fontSize: 24 }}
						scrollable={true}
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
						onPress={() => navigation.goBack()} />
				</View>
			</SafeAreaView>
		</ScrollView>
	);
};

export default ServiceScheduling;