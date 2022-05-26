import axios from "axios";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import { ACCENT_3, HIGH_PRIORITY, PRIMARY_COLOR } from "../../../colors";
import { PrimaryButton } from "../../../components/buttons";
import { Card } from "../../../components/cards";
import { TextBody, TextSubHeader2 } from "../../../components/text";
import { SERVER_URL, TIMEOUT } from "../../../constants";
import moment from 'moment';
import { DayAndTimeDiff, DayHasPassed } from "../../../time";
import { LoadingScreen } from "../../../loading-screen";
import { ErrorScreen } from "../../../error-screen";

export const PharmacistPatientAppointments = ({ nav, patient }) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [appointments, setAppointments] = useState([]);

	const upcomingApps = appointments.filter(a => !DayHasPassed(a.day, a.start)).sort((a, b) => DayAndTimeDiff(a.day, a.start, b.day, b.start));
	const pastApps = appointments.filter(a => DayHasPassed(a.day, a.start)).sort((a, b) => DayAndTimeDiff(a.day, a.start, b.day, b.start));

	const userToken = useSelector((state) => state.userToken.value);

	useEffect(async () => {
		loadAppts();
	}, []);

	const loadAppts = async () => {
		var config = {
			method: 'get',
			url: `${SERVER_URL}/api/schedule/patient/${patient.patientId}`,
			timeout: TIMEOUT,
			headers: {
				Authorization: userToken,
			}
		};

		try {

			let results = (await axios(config)).data;
			setAppointments(results);
		} catch (err) {
			setError(err);
		}

		setLoading(false);
	}

	const schedulePatient = () => {
		nav.navigate("Services", {
			screen: 'Services Schedule',
			params: {
				patient: patient
			}
		});
	}

	if (error)
		return <ErrorScreen error={error} />

	if (loading)
		return <LoadingScreen />

	return (
		<ScrollView>
			<TextSubHeader2 text="Upcoming" style={{ margin: 8 }} />
			{upcomingApps.length == 0 ?
				<TextBody text="No Appointments on Record" style={{ margin: 8 }} />
				:
				upcomingApps.map((a, i) => <AppointmentCard key={i} appointment={a} loadAppts={loadAppts} />)
			}

			<PrimaryButton label="Schedule Appointment" onPress={schedulePatient} style={{ margin: 8, padding: 12, borderRadius: 20 }} />

			{/* Divider line */}
			<View style={{ flex: 1, backgroundColor: PRIMARY_COLOR, padding: 1, margin: 4, marginTop: 32, marginBottom: 32 }}></View>

			<TextSubHeader2 text="Past" style={{ margin: 8 }} />
			{pastApps.length == 0 ?
				<TextBody text="No Past Appointments on Record" style={{ margin: 8 }} />
				:
				pastApps.map((a, i) => <AppointmentCard key={i} appointment={a} loadAppts={loadAppts} />)
			}
		</ScrollView>
	)
}

const AppointmentCard = ({ appointment, loadAppts }) => {
	const userToken = useSelector((state) => state.userToken.value);

	const onReview = async (appt, newStatus) => {
		let config = {
			method: 'patch',
			url: `${SERVER_URL}/api/schedule/${appt.id}`,
			timeout: TIMEOUT,
			headers: {
				Authorization: userToken,
			},
			data: {
				status: newStatus
			}
		};

		let resp = await axios(config);

		loadAppts();
	}

	// change how the status can be changed depending on current status and time
	let button = <View style={{ flex: 1, padding: 16 }}></View>;
	if (appointment.status == "Needs Verification")
		button = <PrimaryButton style={{ flex: 1 }} label="Review" onPress={() => onReview(appointment, "Verified")} />;
	if (DayHasPassed(appointment.day, appointment.start) && appointment.status == "Verified")
		button = (
			<View style={{ flexDirection: "row", flex: 1 }}>
				<PrimaryButton label="Complete" onPress={() => onReview(appointment, "Complete")} style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, backgroundColor: ACCENT_3, flex: 1 }} />
				<PrimaryButton label="No Show" onPress={() => onReview(appointment, "No Show")} style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, backgroundColor: HIGH_PRIORITY, flex: 1 }} />
			</View>
		);

	return (
		<Card depth={1} style={{ margin: 8 }}>
			<View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
				<View style={{ flex: 1, padding: 8, alignContent: 'center', justifyContent: 'center' }}>
					<TextBody text={`${moment(appointment.day).format("MMM Do")}, ${moment(appointment.start, "HH:mm:ss").format("h:mm a")}`} />
				</View>
				<View style={{ flex: 1, padding: 8, alignContent: 'center', justifyContent: 'center' }}>
					<TextBody text={appointment.category} />
				</View>
				<View style={{ flex: 1, padding: 8, alignContent: 'center', justifyContent: 'center' }}>
					<TextBody text={appointment.status} />
				</View>
				{button}
			</View>
		</Card>
	)
}