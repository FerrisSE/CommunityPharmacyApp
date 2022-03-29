import React, { useEffect, useState } from 'react';
import { Button, Pressable, SafeAreaView, Text, View } from 'react-native';
import { AdherenceButtonSmall } from '../../components/adherence-button';
import { TextBody, TextHeader2, TextSubHeader1, TextSubHeader2 } from '../../components/text';
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons";
import { Card } from '../../components/cards';
import { SECONDARY_COLOR } from '../../colors';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';
import { SERVER_URL } from '../../constants';
import { useSelector } from 'react-redux';

export const HomeScreen = ({ navigation }) => {
	const toScheduling = () => navigation.navigate("Scheduling");
	const [nextEvent, setNextEvent] = useState();

	const userToken = useSelector((state) => state.userToken.value);

	// pull next event
	const isFocused = useIsFocused();
	useEffect(() => {
		// get the clients list of scheduled events
		axios({
			method: 'get',
			url: `${SERVER_URL}/api/schedule/patient/0`, // hardcoded to first user
			headers: {
				Authorization: userToken,
			}
		}).then(response => {
			console.log(response.data.length);
			if (response.data.length > 0) {
				setNextEvent({
					name: response.data[0].category,
					date: moment(response.data[0].day),
					time: moment(response.data[0].start, "HH:mm:ss")
				});
			}
		});
	}, [isFocused]);

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
							{nextEvent ?
								<View style={{ flex: 1 }}>
									<TextSubHeader2 text={nextEvent.date.format("dddd")} />

									<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
										<TextHeader2 text={nextEvent.date.format("M/D")} />
									</View>

									<TextSubHeader2 text={nextEvent.name} />
									<TextBody text={nextEvent.time.format("h:mm A")} />
								</View>
								:
								<View style={{ flex: 1, justifyContent: "flex-end" }}>
									<TextSubHeader2 text="No upcoming events" />
								</View>
							}
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