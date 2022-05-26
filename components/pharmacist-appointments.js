import { View } from "react-native";
import { ACCENT_1, ACCENT_3, GRAY_2, HIGH_PRIORITY, PRIMARY_COLOR, WHITE } from "../colors";
import { Card } from "./cards";
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons";
import { TextBody, TextSubHeader2 } from "./text";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { SERVER_URL, TIMEOUT } from "../constants";
import axios from "axios";
import moment from "moment";
import { PrimaryButton } from "./buttons";
import { DayHasPassed } from "../time";


export const AppointmentsView = ({ viewedDay, appointments, loadAppointments, viewLimit }) => {

	let appts = appointments;
	if (viewLimit)
		appts = appointments.slice(0, viewLimit);

	return (
		<Card depth={1} color={WHITE} style={{
			flex: 1,
			width: '100%',
			marginTop: 10,
		}}>
			<View style={{ flexDirection: 'row', alignContent: 'center' }}>
				<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
					{/* Top Row*/}
					<View style={{ flex: 1, padding: 4, alignItems: 'center', justifyContent: 'center' }}>
						<Icon name="checkbox-blank-outline" size={32} color={PRIMARY_COLOR} />
					</View>
					<View style={{ flex: 1, padding: 4, alignItems: 'center', justifyContent: 'center' }}>
						<Icon name="clock-time-nine-outline" size={32} color={PRIMARY_COLOR} />
					</View>
					<View style={{ flex: 3, padding: 4, justifyContent: 'center' }}>
						<TextSubHeader2 text="Service" style={{ color: PRIMARY_COLOR }} />
					</View>
					<View style={{ flex: 3, padding: 4, justifyContent: 'center' }}>
						<TextSubHeader2 text="Patient Name" style={{ color: PRIMARY_COLOR }} />
					</View>
					<View style={{ flex: 2, padding: 4, justifyContent: 'center' }}>
						<TextSubHeader2 text="DOB, Age" style={{ color: PRIMARY_COLOR }} />
					</View>
					<View style={{ flex: 2, padding: 4, justifyContent: 'center' }}>
						<TextSubHeader2 text="Status" style={{ color: PRIMARY_COLOR }} />
					</View>
					<View style={{ flex: 3, padding: 4, justifyContent: 'center' }}>
					</View>
				</View>
			</View>
			{/* Divider */}
			<View style={{ width: '100%', padding: 1, marginTop: 8, marginBottom: 8, backgroundColor: PRIMARY_COLOR }}>
			</View>

			<ScrollView>
				{/* Remaining List */}
				{appts.filter(a => a.day == viewedDay.format("YYYY-MM-DD"))
					.sort((a, b) => DayAndTimeDiff(a.day, a.start, b.day, b.start))
					.map((a, i) => <AppointmentRow appointment={a} loadAppointments={loadAppointments} key={i} />)
				}
			</ScrollView>

		</Card >
	)
}

const AppointmentRow = ({ appointment, loadAppointments }) => {
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

		loadAppointments();
	}

	// change how the status can be changed depending on current status and time
	let button = <View></View>;
	if (appointment.status == "Needs Verification")
		button = <PrimaryButton label="Review" onPress={() => onReview(appointment, "Verified")} />;
	if (DayHasPassed(appointment.day, appointment.start) && appointment.status == "Verified")
		button = (
			<View style={{ flexDirection: "row" }}>
				<PrimaryButton label="Complete" onPress={() => onReview(appointment, "Complete")} style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, backgroundColor: ACCENT_3 }} />
				<PrimaryButton label="No Show" onPress={() => onReview(appointment, "No Show")} style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, backgroundColor: HIGH_PRIORITY }} />
			</View>
		);

	return (
		<View>
			<View style={{ flexDirection: 'row', alignContent: 'center' }}>
				<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
					{/* Top Row*/}
					<View style={{ flex: 1, padding: 4, alignItems: 'center', justifyContent: 'center' }}>
						<Icon name="checkbox-blank-outline" size={32} color={PRIMARY_COLOR} />
					</View>
					<View style={{ flex: 1, padding: 4, alignItems: 'center', justifyContent: 'center' }}>
						<TextBody text={moment(appointment.start, "hh:mm:ss").format("h:mm a")} />
					</View>
					<View style={{ flex: 3, padding: 4, justifyContent: 'center' }}>
						<TextBody text={appointment.category} />
					</View>
					<View style={{ flex: 3, padding: 4, justifyContent: 'center' }}>
						<TextBody text={`${appointment.patientGivenName} ${appointment.patientFamilyName}`} />
					</View>
					<View style={{ flex: 2, padding: 4, justifyContent: 'center' }}>
						<TextBody text={`${moment(appointment.patientDOB).format("MM/DD/YYYY")}, ${moment(appointment.patientDOB).fromNow(true)}`} />
					</View>
					<View style={{ flex: 2, padding: 4, justifyContent: 'center' }}>
						<TextBody text={appointment.status} />
					</View>
					<View style={{ flex: 3, padding: 4, justifyContent: 'center' }}>
						{button}
					</View>
				</View>
			</View>
			{/* Divider */}
			<View style={{ width: '100%', padding: 1, marginTop: 8, marginBottom: 8, backgroundColor: PRIMARY_COLOR }}>
			</View>
		</View>
	)
}