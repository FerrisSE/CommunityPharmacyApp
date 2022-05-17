import React, { useEffect, useState } from "react";
import { FlatList, Pressable, ScrollView, View } from "react-native";
import { Card } from "../../../components/cards";
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons";
import { TextBody, TextHeader2, TextHeader3, TextSubHeader1, TextSubHeader2 } from "../../../components/text";
import { ACCENT_3, GRAY_2, HIGH_PRIORITY, PRIMARY_COLOR, SECONDARY_COLOR, WHITE } from "../../../colors";
import { PrimaryButton } from "../../../components/buttons";
import moment from "moment";
import axios from "axios";
import { SERVER_URL } from "../../../constants";
import { useSelector } from "react-redux";
import { AppointmentsView } from "../../../components/pharmacist-appointments";

export const PharmacistSchedulingHomeScreen = () => {
	const [appointments, setAppointments] = useState([]);
	const [viewedDay, setViewedDay] = useState(moment());

	const userToken = useSelector((state) => state.userToken.value);

	let loadAppointments = async () => {
		let config = {
			method: 'get',
			url: `${SERVER_URL}/api/schedule/0`,
			headers: {
				Authorization: userToken,
			}
		};

		let data = (await axios(config)).data;
		setAppointments(data);
	}

	useEffect(async () => {
		loadAppointments();
	}, []);

	const addDay = () => setViewedDay(viewedDay.clone().add(1, 'day'));
	const subDay = () => setViewedDay(viewedDay.clone().subtract(1, 'day'));

	let totalApptCount = appointments.length;
	let completeApptCount = appointments.filter(a => a.status == "Complete").length;
	let nowShowApptCount = appointments.filter(a => a.status == "No Show").length;

	return (
		<View style={{ padding: 12, flex: 1 }}>
			<TextHeader2 text="Scheduling" style={{ margin: 12 }} />
			<Card depth={1} style={{ margin: 12, flex: 1, padding: 32 }}>

				{/* Manage Appointments Button */}
				<View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
					<Pressable style={{ flexDirection: 'row' }}>
						<Icon name="cog-outline" size={24} style={{ marginRight: 4 }} />
						<TextSubHeader2 text="Manage Appointment Times" />
					</Pressable>
				</View>

				{/* Top Cards */}
				<TextHeader3 text="Statistics" style={{ marginTop: 16 }} />
				<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<View style={{ flexDirection: 'row' }}>

						<Card depth={2} color={SECONDARY_COLOR} style={{ margin: 8, padding: 12 }}>
							<TextHeader2 text={totalApptCount} style={{ color: WHITE, margin: 8 }} />
							<TextSubHeader2 text="Total Appointments" style={{ color: WHITE }} />
						</Card>

						<Card depth={2} color={ACCENT_3} style={{ margin: 8, padding: 12 }}>
							<TextHeader2 text={completeApptCount} style={{ color: WHITE, margin: 8 }} />
							<TextSubHeader2 text="Complete Appointments" style={{ color: WHITE }} />
						</Card>

						<Card depth={2} color={HIGH_PRIORITY} style={{ margin: 8, padding: 12 }}>
							<TextHeader2 text={nowShowApptCount} style={{ color: WHITE, margin: 8 }} />
							<TextSubHeader2 text="No-Show Appointments" style={{ color: WHITE }} />
						</Card>

					</View>

					<Card depth={2} style={{ margin: 8, alignItems: "center", justifyContent: "center" }} color={PRIMARY_COLOR}>
						<TextSubHeader2 text="Schedule Appointment" style={{ color: WHITE, margin: 8 }} />
					</Card>
				</View>

				<TextHeader3 text="Appointment Schedule" style={{ marginTop: 16 }} />

				<View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center', width: '100%', margin: 4 }}>
					<Pressable onPress={subDay}>
						<Icon name="chevron-left" size={48} color={PRIMARY_COLOR} />
					</Pressable>
					<TextSubHeader2 text={viewedDay.format("ddd, MMMM Do")} />
					<Pressable onPress={addDay}>
						<Icon name="chevron-right" size={48} color={PRIMARY_COLOR} />
					</Pressable>
				</View>

				<AppointmentsView appointments={appointments} viewedDay={viewedDay} loadAppointments={loadAppointments} />
			</Card>
		</View>
	)
}