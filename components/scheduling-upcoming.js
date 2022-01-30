import React from "react";
import { Card } from "./cards";
import { TextHeader3, TextNote, TextSubHeader2 } from "./text";
import { OutlineButton } from "./buttons";
import { HIGH_PRIORITY } from "../colors";
import { View } from "react-native";

export const UpcomingEvents = ({ events }) => {
	return (
		<Card depth={1} color='priority'>
			<View style={{ margin: 4 }}>
				<TextHeader3 text="Upcoming Events" style={{ marginLeft: 12, marginBottom: 12 }} />

				<TextSubHeader2 text="Covid-19 Vaccine" style={{ marginLeft: 12 }} />
				<TextNote text="Pfizer Vaccine, First dose" style={{ marginLeft: 12, marginBottom: 6 }} />
				<Card depth={2} color='priority'>
					<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', margin: 8 }}>
						<View>
							<TextSubHeader2 text="Thu. Oct 15" />
							<TextSubHeader2 text="9:45am" />
						</View>
						<OutlineButton label="Reschedule" color={HIGH_PRIORITY} />
					</View>
				</Card>
			</View>
		</Card>
	)
}