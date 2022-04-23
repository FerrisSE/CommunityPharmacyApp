import React from "react";
import { ScrollView, View } from "react-native";
import { PRIMARY_COLOR } from "../../../colors";
import { PrimaryButton } from "../../../components/buttons";
import { Card } from "../../../components/cards";
import { TextBody, TextSubHeader2 } from "../../../components/text";

const upcomingAppointments = [
	{
		time: "01/21/2022, 8:30 am",
		name: "Covid-19 Vaccine",
		dob: "01/12/1973, 49",
	},
	{
		time: "01/21/2022, 8:30 am",
		name: "Covid-19 Vaccine",
		dob: "01/12/1973, 49",
	}
]

const pastAppointments = [
	{
		time: "01/21/2022, 8:30 am",
		name: "Covid-19 Vaccine",
		dob: "01/12/1973, 49",
	},
	{
		time: "01/21/2022, 8:30 am",
		name: "Covid-19 Vaccine",
		dob: "01/12/1973, 49",
	},
	{
		time: "01/21/2022, 8:30 am",
		name: "Covid-19 Vaccine",
		dob: "01/12/1973, 49",
	}
]

export const PharmacistPatientAppointments = () => {
	return (
		<ScrollView>
			<TextSubHeader2 text="Upcoming" style={{ margin: 8 }} />
			{upcomingAppointments.map((a, i) => <AppointmentCard key={i} appointment={a} />)}

			<PrimaryButton label="Schedule Appointment" style={{ margin: 8, padding: 6, borderRadius: 20 }} />

			{/* Divider line */}
			<View style={{ flex: 1, backgroundColor: PRIMARY_COLOR, padding: 1, margin: 4, marginTop: 32, marginBottom: 32 }}></View>

			<TextSubHeader2 text="Past" style={{ margin: 8 }} />
			{pastAppointments.map((a, i) => <AppointmentCard key={i} appointment={a} />)}
		</ScrollView>
	)
}

const AppointmentCard = ({ appointment }) => {
	return (
		<Card depth={1} style={{ margin: 8 }}>
			<View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
				<View style={{ flex: 2, padding: 8, alignContent: 'center', justifyContent: 'center' }}>
					<TextBody text={appointment.time} />
				</View>
				<View style={{ flex: 2, padding: 8, alignContent: 'center', justifyContent: 'center' }}>
					<TextBody text={appointment.name} />
				</View>
				<View style={{ flex: 2, padding: 8, alignContent: 'center', justifyContent: 'center' }}>
					<TextBody text={appointment.dob} />
				</View>
				<PrimaryButton label="Reviewed" style={{ flex: 1, margin: 4, textAlign: 'center', textAlignVertical: 'center' }} />
			</View>
		</Card>
	)
}