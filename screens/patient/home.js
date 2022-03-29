import React from 'react';
import { Button, Pressable, SafeAreaView, Text, View } from 'react-native';
import { AdherenceButtonSmall } from '../../components/adherence-button';
import { TextSubHeader2 } from '../../components/text';
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons";
import { Card } from '../../components/cards';
import { SECONDARY_COLOR } from '../../colors';

export const HomeScreen = ({ navigation }) => {
	const toScheduling = () => navigation.navigate("Scheduling");

	return (
		<View style={{ padding: 8 }}>
			<TextSubHeader2 text="Notifications" />
			<TextSubHeader2 text="Your next medication" />

			<View style={{
				width: '100%',
				flex: 1,
				flexDirection: 'row',
				flexWrap: 'wrap',
				justifyContent: 'flex-start',
			}}>

				<View style={{ width: '50%', padding: 16 }}>
					<TextSubHeader2 text="Upcoming Events" style={{ marginLeft: 16 }} />
					<Pressable onPress={toScheduling}>
						<Card depth={1} color="secondary" style={{ padding: 16, flex: 1, aspectRatio: 1, margin: 8 }}>
							<View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
								<Icon name="arrow-expand" size={20} color={SECONDARY_COLOR} />
							</View>
							<View style={{ flex: 1, justifyContent: "flex-end" }}>
								<TextSubHeader2 text="No upcoming events" />
							</View>
						</Card>
					</Pressable>
				</View>

				<View style={{ width: '50%', padding: 16 }}>
					<TextSubHeader2 text="My Med Score" style={{ marginLeft: 16 }} />
					<AdherenceButtonSmall navigation={navigation} />
				</View>

			</View>
		</View>
	);
};