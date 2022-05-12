import axios from "axios";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import { PRIMARY_COLOR } from "../../../colors";
import { PrimaryButton } from "../../../components/buttons";
import { Card } from "../../../components/cards";
import { TextBody, TextSubHeader2 } from "../../../components/text";
import { SERVER_URL } from "../../../constants";
import moment from 'moment';

const dayHasPassed = (day) => moment(day).isBefore(moment());

export const PharmacistPatientAppointments = ({ patient }) => {
	const [appointments, setAppointments] = useState([]);

	const upcomingApps = appointments.filter(a => !dayHasPassed(a.day));
	const pastApps = appointments.filter(a => dayHasPassed(a.day));

	const userToken = useSelector((state) => state.userToken.value);

	useEffect(async () => {
		var config = {
			method: 'get',
			url: `${SERVER_URL}/api/schedule/patient/${patient.patientId}`,
			headers: {
				Authorization: userToken,
			}
		};

		let results = (await axios(config)).data;
		setAppointments(results);
	}, []);

	return (
		<ScrollView>
			<TextSubHeader2 text="Upcoming" style={{ margin: 8 }} />
			{upcomingApps.length == 0 ?
				<TextBody text="No Appointments on Record" style={{ margin: 8 }} />
				:
				upcomingApps.map((a, i) => <AppointmentCard key={i} appointment={a} />)
			}

			<PrimaryButton label="Schedule Appointment" style={{ margin: 8, padding: 12, borderRadius: 20 }} />

			{/* Divider line */}
			<View style={{ flex: 1, backgroundColor: PRIMARY_COLOR, padding: 1, margin: 4, marginTop: 32, marginBottom: 32 }}></View>

			<TextSubHeader2 text="Past" style={{ margin: 8 }} />
			{pastApps.length == 0 ?
				<TextBody text="No Past Appointments on Record" style={{ margin: 8 }} />
				:
				pastApps.map((a, i) => <AppointmentCard key={i} appointment={a} />)
			}
		</ScrollView>
	)
}

const AppointmentCard = ({ appointment }) => {
	return (
		<Card depth={1} style={{ margin: 8 }}>
			<View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
				<View style={{ flex: 2, padding: 4, alignContent: 'center', justifyContent: 'center' }}>
					<TextBody text={`${moment(appointment.day).format("MMM Do")}, ${moment(appointment.start, "HH:mm:ss").format("h:mm a")}`} />
				</View>
				<View style={{ flex: 1, padding: 2, alignContent: 'center', justifyContent: 'center' }}>
					<TextBody text={appointment.category} />
				</View>
				<PrimaryButton label="Reviewed" style={{ flex: 1, margin: 2, textAlign: 'center', textAlignVertical: 'center' }} />
			</View>
		</Card>
	)
}