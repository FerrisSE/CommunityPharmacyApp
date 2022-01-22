import React from "react";
import { TouchableOpacity, View } from "react-native";
import { BLACK, GRAY_4, GRAY_5, SECONDARY_COLOR, SECONDARY_COLOR_TRANSPARENT, WHITE } from "../colors";
import { Card, CardWithHeader } from "./cards";
import { TextHeader3, TextNote, TextSubHeader2 } from "./text";

export const TimePicker = ({ title, subtitle, times, style }) => {
	return (
		<CardWithHeader
			depth={1}
			color={'secondary'}
			style={style}
			header={<View>
				<TextHeader3 text={title} style={{ marginLeft: 8 }} />
				<TextSubHeader2 text={subtitle} style={{ marginLeft: 8 }} />
			</View>}
		>
			<View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
				{
					times.map(t => <TimeSlot time={t.time} am={t.am} active={t.active} available={t.available} />)
				}
			</View>

		</CardWithHeader>
	)
};

const TimeSlot = ({ time, am, active, available }) => {
	let subText = am ? "am" : "pm";

	let color = "#D8ECF4";
	let textColor = BLACK;

	if (!available) {
		color = '#94CAE12A';
		textColor = GRAY_4;
	}

	if (active) {
		color = SECONDARY_COLOR
		textColor = WHITE;
	}

	return (
		<TouchableOpacity style={{ width: '25%' }}>
			<Card depth={2} color="secondary" style={{ margin: 4, backgroundColor: color }}>
				<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', padding: 12 }}>
					<TextSubHeader2 text={time} style={{ color: textColor }} />
					<TextNote text={subText} style={{ marginLeft: 4, color: textColor }} />
				</View>
			</Card>
		</TouchableOpacity>
	)
};