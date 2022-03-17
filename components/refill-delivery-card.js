import React from "react";
import { Pressable, View } from "react-native";
import { CardWithHeader } from "./cards";
import { TextBody, TextHeader3, TextNote, TextSubHeader2 } from "./text";

export const RefillDeliveryCard = ({ label, selected, time, location, style, onPress }) => {
	return (
		<Pressable onPress={onPress}>
			<CardWithHeader
				depth={1}
				outlined={selected}
				color='secondary'
				style={style}
				header={<TextHeader3 text={label} />}
			>
				<View style={{
					flex: 1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-evenly'
				}}>
					<View style={{ flex: 1, margin: 4 }}>
						<TextNote text="Time" />
						<TextBody text={time} />
					</View>
					<View style={{ flex: 1, margin: 4 }}>
						<TextNote text="Location" />
						<TextBody text={location} />
					</View>
				</View>
			</CardWithHeader>
		</Pressable>
	)
}