import { Pressable, ScrollView, View } from "react-native";
import { ACCENT_3, GRAY_2, HIGH_PRIORITY, PRIMARY_COLOR, WHITE } from "../../../colors";
import { Card } from "../../../components/cards";
import { TextBody, TextHeader3, TextSubHeader1, TextSubHeader2 } from "../../../components/text";
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { useSelector } from "react-redux";
import { SERVER_URL, TIMEOUT } from "../../../constants";
import moment from "moment";
import { LoadingScreen } from "../../../loading-screen";
import { ErrorScreen } from "../../../error-screen";

const Unavailability = [
	{ date: "December 25th", duration: "All day", repeat: "Repeats Annually" },
	{ date: "March 16th, 2022", duration: "3:00pm - 9:00pm", repeat: "Does not repeat" }
];

export const PharmacistManageAppointmentsScreen = ({ navigation }) => {
	const [error, setError] = useState(false);
	const [settings, setSettings] = useState(false);
	const [availability, setAvailability] = useState([]);

	const onBack = () => navigation.pop();

	const userToken = useSelector((state) => state.userToken.value);

	const isFocused = useIsFocused();
	useEffect(async () => {
		try {
			let data = (await axios({
				method: 'get',
				url: `${SERVER_URL}/api/schedule/0/settings`,
				timeout: TIMEOUT,
				headers: {
					Authorization: userToken,
				}
			})).data;

			setSettings(data);
			setAvailability([
				{ day: "Sunday", all: data.days.sun, from: "", to: "" },
				{ day: "Monday", all: data.days.mon, from: "", to: "" },
				{ day: "Tuesday", all: data.days.tue, from: "", to: "" },
				{ day: "Wednesday", all: data.days.wed, from: "", to: "" },
				{ day: "Thursday", all: data.days.thu, from: "", to: "" },
				{ day: "Friday", all: data.days.fri, from: "", to: "" },
				{ day: "Saturday", all: data.days.sat, from: "", to: "" },
			]);
		} catch (err) {
			setError(err);
		}
	}, [isFocused]);

	if (error)
		return <ErrorScreen error={error} />

	if (!settings)
		return <LoadingScreen />

	return (
		<View style={{ flex: 1 }}>
			{/* Back Button */}
			<Pressable onPress={onBack} style={{ margin: 32 }}>
				<TextSubHeader2 text="< Back to Schedule" style={{ color: GRAY_2 }} />
			</Pressable >

			<Card style={{ flex: 1, margin: 32, marginTop: 8, padding: 32 }} depth={0}>
				<TextHeader3 text="Manage Appointments" style={{ color: PRIMARY_COLOR }} />
				<ScrollView>
					<View style={{ flex: 1, flexDirection: "row", marginTop: 16 }}>

						<View style={{ flex: 3, padding: 12 }}>
							<TextSubHeader1 text="Availability" style={{ marginTop: 12, marginBottom: 4 }} />
							<Card depth={1} color={WHITE}>
								<View style={{ width: "100%", flexDirection: "row", marginBottom: 8 }}>
									<AvailabilityHeader text="" flex={3} />
									<AvailabilityHeader text="All Day" />
									<AvailabilityHeader text="From" />
									<AvailabilityHeader text="To" />
									<AvailabilityHeader text="From" />
									<AvailabilityHeader text="To" />
								</View>
								{availability.map((a, i) => <AvailabilityRow data={a} key={i} />)}
							</Card>

							<TextSubHeader1 text="Unavailability" style={{ marginTop: 16, marginBottom: 4 }} />
							<Card depth={1} color={WHITE}>
								{Unavailability.map((u, i) => <UnavailabilityRow data={u} key={i} />)}
							</Card>
						</View>

						<View style={{ flex: 2, padding: 12 }}>
							<TextSubHeader1 text="Hours of Operation" />
							<View style={{ flexDirection: "row", marginTop: 4 }}>
								<View style={{ flex: 1, padding: 4 }}>
									<HoursCard text={moment(settings.open, "hh:mm:ss").format("h:mm a")} subtext="Opening" />
								</View>
								<View style={{ flex: 1, padding: 4 }}>
									<HoursCard text={moment(settings.close, "hh:mm:ss").format("h:mm a")} subtext="Closing" />
								</View>
							</View>

							<TextSubHeader1 text="Appointment Details" style={{ marginTop: 16 }} />
							<View style={{ flexDirection: "row", marginTop: 4 }}>
								<View style={{ flex: 1, padding: 4 }}>
									<HoursCard text={`${settings.slotDuration} min`} subtext="Duration" />
								</View>
								<View style={{ flex: 1, padding: 4 }}>
									<HoursCard text={`${settings.slotBuffer} min`} subtext="Buffer" />
								</View>
							</View>

							<TextSubHeader1 text="Pharmacy Breaks" style={{ marginTop: 16 }} />
							<View style={{ flexDirection: "row", marginTop: 4 }}>
								<View style={{ flex: 1, padding: 4 }}>
									<HoursCard text="12:00pm - 1:00pm" subtext="Unavailable" color={HIGH_PRIORITY} />
								</View>
								<View style={{ flex: 1, padding: 4 }}>
								</View>
							</View>

							<TextSubHeader1 text="Rules by Service Type" style={{ marginTop: 16 }} />
							<View style={{ flexDirection: "row", marginTop: 4 }}>
								<View style={{ flex: 1, padding: 4 }}>
									<HoursCard text="Create Rule" subtext="" color={ACCENT_3} />
								</View>
								<View style={{ flex: 1, padding: 4 }}>
								</View>
							</View>

						</View>
					</View>
				</ScrollView>
			</Card>
		</View>
	)
}

const AvailabilityHeader = ({ text, flex }) => {
	if (!flex)
		flex = 2

	return (
		<View style={{ flex: flex, alignItems: "center", justifyContent: "center" }}>
			<TextSubHeader2 text={text} style={{ color: PRIMARY_COLOR }} />
		</View>
	)
}

const AvailabilityRow = ({ data }) => {
	return (
		<View style={{ width: "100%", flexDirection: "row", marginTop: 8, marginBottom: 8 }}>
			<AvailabilityHeader text={data.day} flex={3} />
			<View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
				<Icon name={data.all ? "checkbox-blank" : "checkbox-blank-outline"} size={20} color={PRIMARY_COLOR} />
			</View>
			<View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
				<TextBody text={data.from} />
			</View>
			<View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
				<TextBody text={data.to} />
			</View>
			<View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
				<TextBody text={data.from} />
			</View>
			<View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
				<TextBody text={data.to} />
			</View>
		</View>
	)
}

const UnavailabilityRow = ({ data }) => {
	return (
		<View style={{ width: "100%", flexDirection: "row", marginTop: 8, marginBottom: 8 }}>
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<TextBody text={data.date} />
			</View>
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<TextBody text={data.duration} />
			</View>
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<TextBody text={data.repeat} />
			</View>
		</View>
	)
}

const HoursCard = ({ text, subtext, color }) => {
	if (!color)
		color = PRIMARY_COLOR;

	return (
		<Card depth={2} color={color} style={{ padding: 12 }}>
			<TextSubHeader2 text={text} style={{ color: WHITE }} />
			<TextBody text={subtext} style={{ color: WHITE }} />
		</Card>
	)
}