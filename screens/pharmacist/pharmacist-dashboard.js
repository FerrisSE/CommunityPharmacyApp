import { View } from "react-native";
import { TextHeader1, TextHeader2, TextHeader3, TextSubHeader1 } from '../../components/text';
import { Card } from '../../components/cards';
import { PRIMARY_COLOR, WHITE } from "../../colors";
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import { Input } from "../../components/input";
import { PrimaryButton } from "../../components/buttons";
import { AppointmentsView } from "../../components/pharmacist-appointments";
import { useSelector } from "react-redux";
import { SERVER_URL } from "../../constants";
import axios from "axios";
import moment from "moment";

export const DashboardScreen = () => {
	const [searchText, setSearchText] = useState("");
	const [appointments, setAppointments] = useState([]);

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

	return (
		<View style={{ width: "100%", height: "100%", padding: 32 }}>
			<TextHeader2 text="Dashboard" style={{ marginBottom: 8 }} />
			<Card style={{ flex: 1, padding: 32, alignItems: "center" }} depth={0}>
				<View style={{ width: "100%", flex: 1 }}>
					<View style={{ width: "100%", alignItems: "center", justifyContent: "center", margin: 24 }}>
						<TextHeader1 text="Community Pharmacy" style={{ color: PRIMARY_COLOR }} />
						<View style={{ width: "75%", flexDirection: 'row', marginTop: 32, marginBottom: 32 }}>
							<Input placeholder="Search App..." defaultText={searchText} setText={setSearchText} style={{ flex: 1, backgroundColor: WHITE }} />
							<PrimaryButton label="Search" style={{ margin: 16, paddingLeft: 32, paddingRight: 32 }} />
						</View>
					</View>
				</View>

				<TextHeader3 text="Quick Links" />
				<View style={{ width: "100%", flexDirection: 'row', margin: 12, alignItems: "flex-start" }}>
					<Card depth={2} style={{ margin: 12, flexDirection: "row", alignItems: "center", justifyContent: "center", padding: 32 }}>
						<Icon name="format-list-bulleted" size={32} color={PRIMARY_COLOR} />
						<TextSubHeader1 text="Schedule Appointments" style={{ color: PRIMARY_COLOR, marginLeft: 4 }} />
					</Card>
					<Card depth={2} style={{ margin: 12, flexDirection: "row", alignItems: "center", justifyContent: "center", padding: 32 }}>
						<Icon name="account-multiple" size={32} color={PRIMARY_COLOR} />
						<TextSubHeader1 text="Patient Search" style={{ color: PRIMARY_COLOR, marginLeft: 4 }} />
					</Card>
				</View>

				<AppointmentsView appointments={appointments} loadAppointments={loadAppointments} viewedDay={moment()} viewLimit={3} />
			</Card>
		</View>
	)
}