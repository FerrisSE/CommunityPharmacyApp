import React from "react";
import { FlatList, Pressable, View } from "react-native";
import { Card } from "../../../components/cards";
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons";
import { TextBody, TextHeader2, TextHeader3, TextSubHeader2 } from "../../../components/text";
import { ACCENT_3, GRAY_2, HIGH_PRIORITY, PRIMARY_COLOR, SECONDARY_COLOR, WHITE } from "../../../colors";
import { PrimaryButton } from "../../../components/buttons";

export const PharmacistSchedulingHomeScreen = () => {
	return (
		<View style={{ padding: 12, flex: 1 }}>
			<TextHeader2 text="Services" style={{ margin: 12 }} />
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
							<TextHeader2 text="3" style={{ color: WHITE, margin: 8 }} />
							<TextSubHeader2 text="Total Appointments" style={{ color: WHITE }} />
						</Card>

						<Card depth={2} color={ACCENT_3} style={{ margin: 8, padding: 12 }}>
							<TextHeader2 text="2" style={{ color: WHITE, margin: 8 }} />
							<TextSubHeader2 text="Complete Appointments" style={{ color: WHITE }} />
						</Card>

						<Card depth={2} color={HIGH_PRIORITY} style={{ margin: 8, padding: 12 }}>
							<TextHeader2 text="2" style={{ color: WHITE, margin: 8 }} />
							<TextSubHeader2 text="No-Show Appointments" style={{ color: WHITE }} />
						</Card>

					</View>

					<Card depth={2} style={{ margin: 8, alignItems: "center", justifyContent: "center" }} color={PRIMARY_COLOR}>
						<TextSubHeader2 text="Schedule Appointment" style={{ color: WHITE, margin: 8 }} />
					</Card>
				</View>

				<TextHeader3 text="Appointment Schedule" style={{ marginTop: 16 }} />

				{/* Appointments Grid */}
				<Card depth={1} color={WHITE} style={{
					flex: 1,
					width: '100%',
					marginTop: 10,
				}}
				>
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
							<View style={{ flex: 2, padding: 4, justifyContent: 'center' }}>
								<TextSubHeader2 text="Verification" style={{ color: PRIMARY_COLOR }} />
							</View>
							{/* Blank on header, but items will have 3 dot more options button */}
							<View style={{ flex: 1 }}>
							</View>
						</View>
					</View>
					{/* Divider */}
					<View style={{ width: '100%', padding: 1, marginTop: 8, marginBottom: 8, backgroundColor: PRIMARY_COLOR }}>
					</View>

					{/* Remaining List */}
					<AppointmentRow time="8:30 am" service="Covid Vaccine" name="Jacob Goeldel" dob="04/23/2022, 20" status="Incomplete" />
				</Card>
			</Card>
		</View>
	)
}

const AppointmentRow = ({ time, service, name, dob, status }) => {
	return (
		<View>
			<View style={{ flexDirection: 'row', alignContent: 'center' }}>
				<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
					{/* Top Row*/}
					<View style={{ flex: 1, padding: 4, alignItems: 'center', justifyContent: 'center' }}>
						<Icon name="checkbox-blank-outline" size={32} color={PRIMARY_COLOR} />
					</View>
					<View style={{ flex: 1, padding: 4, alignItems: 'center', justifyContent: 'center' }}>
						<TextBody text={time} />
					</View>
					<View style={{ flex: 3, padding: 4, justifyContent: 'center' }}>
						<TextBody text={service} />
					</View>
					<View style={{ flex: 3, padding: 4, justifyContent: 'center' }}>
						<TextBody text={name} />
					</View>
					<View style={{ flex: 2, padding: 4, justifyContent: 'center' }}>
						<TextBody text={dob} />
					</View>
					<View style={{ flex: 2, padding: 4, justifyContent: 'center' }}>
						<TextBody text={status} />
					</View>
					<View style={{ flex: 2, padding: 4, justifyContent: 'center' }}>
						<PrimaryButton label="Reviewed" textStyle={{ margin: 6 }} />
					</View>
					<View style={{ flex: 1, padding: 4, justifyContent: 'center' }}>
						<Icon name="dots-vertical" size={24} color={GRAY_2} />
					</View>
				</View>
			</View>
			{/* Divider */}
			<View style={{ width: '100%', padding: 1, marginTop: 8, marginBottom: 8, backgroundColor: PRIMARY_COLOR }}>
			</View>
		</View>
	)
}