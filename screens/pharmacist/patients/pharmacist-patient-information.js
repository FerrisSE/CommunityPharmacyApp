import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card } from "../../../components/cards";
import { TextBody, TextSubHeader1, TextSubHeader2 } from "../../../components/text";

export const PharmacistPatientInformationScreen = () => {
	return (
		<ScrollView>
			{/* Date of Birth */}
			<Card depth={2} style={{ margin: 8, padding: 8 }}>
				<TextBody text="Date of Birth" style={{ marginBottom: 12 }} />
				<TextSubHeader2 text="12/12/1952" />
			</Card>

			{/* Phone Number */}
			<Card depth={2} style={{ margin: 8, padding: 8 }}>
				<TextBody text="Phone Number" style={{ marginBottom: 12 }} />
				<TextSubHeader2 text="800-588-2300" />
			</Card>

			{/* Address */}
			<Card depth={2} style={{ margin: 8, padding: 8 }}>
				<TextBody text="Address" style={{ marginBottom: 12 }} />
				<TextSubHeader2 text="2703 Mulberry LN. Grand Rapids, MI, 49546" />
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