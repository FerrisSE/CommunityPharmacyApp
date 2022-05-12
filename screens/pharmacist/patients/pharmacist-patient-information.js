import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Card } from "../../../components/cards";
import { TextBody, TextSubHeader2 } from "../../../components/text";
import moment from 'moment';

export const PharmacistPatientInformationScreen = ({ patient }) => {
	return (
		<ScrollView>
			{/* Date of Birth */}
			<Card depth={2} style={{ margin: 8, padding: 8 }}>
				<TextBody text="Date of Birth" style={{ marginBottom: 12 }} />
				<TextSubHeader2 text={moment(patient.birthdate).format("MM/DD/YYYY")} />
			</Card>

			{/* Phone Number */}
			<Card depth={2} style={{ margin: 8, padding: 8 }}>
				<TextBody text="Phone Number" style={{ marginBottom: 12 }} />
				<TextSubHeader2 text={patient.phoneNumber} />
			</Card>

			{/* Address */}
			<Card depth={2} style={{ margin: 8, padding: 8 }}>
				<TextBody text="Address" style={{ marginBottom: 12 }} />
				<TextSubHeader2 text={`${patient.addressStreet} ${patient.addressCity}, ${patient.addressState}, ${patient.addressZipcode}`} />
			</Card>

			{/* Primary Care */}
			<Card depth={2} style={{ margin: 8, padding: 8 }}>
				<TextBody text="Primary Care" style={{ marginBottom: 12 }} />
				<TextSubHeader2 text="Name: Dr. Matthew Jones" />
				<TextSubHeader2 text="Office: SideStreat Medical" />
				<TextSubHeader2 text="Phone Number: 800-588-2300" />
			</Card>
		</ScrollView>
	)
}