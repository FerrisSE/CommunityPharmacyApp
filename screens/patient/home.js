import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';
import { AdherenceButtonSmall, GetAdherence } from '../../components/adherence-components';
import { TextBody, TextHeader2, TextNote, TextSubHeader1, TextSubHeader2 } from '../../components/text';
import pill from "../../images/pill.png"
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons";
import { Card } from '../../components/cards';
import { PRIMARY_COLOR, SECONDARY_COLOR, SECONDARY_COLOR_TRANSPARENT } from '../../colors';
import { useIsFocused } from '@react-navigation/native';
import { PrimaryButton } from '../../components/buttons';
import axios from 'axios';
import moment from 'moment';
import { SERVER_URL } from '../../constants';
import { useSelector } from 'react-redux';

export const HomeScreen = ({ navigation }) => {
	const toScheduling = () => navigation.navigate("Scheduling");

	let [adherenceMeds, setAdherenceMeds] = useState([]);
	let [adherenceModel, setAdherenceModel] = useState([]);
	const [nextEvent, setNextEvent] = useState();

	const userToken = useSelector((state) => state.userToken.value);

	const getMedsThisDay = (medId) => adherenceModel.find(m => m.medId == medId).medsPerDay[moment().day()];

	const getMedAdherence = async () => {
		try {
			return await GetAdherence(userToken);
		} catch (err) {
			console.error(err);
			return [];
		}
	}

	const getAdherenceModel = async () => {
		try {
			let data = (await axios({
				method: 'get',
				url: `${SERVER_URL}/patient/adherence/models`,
				headers: {
					Authorization: userToken,
				}
			})).data;

			let model = data.map(m => ({
				medId: m.patientMedicationId,
				medsPerDay: [
					m.sundayPills,
					m.mondayPills,
					m.tuesdayPills,
					m.wednesdayPills,
					m.thursdayPills,
					m.fridayPills,
					m.saturdayPills,
				]
			}));

			return model;
		} catch (err) {
			console.log(err);
			return [];
		}
	}

	const getNextEvent = async () => {
		try {
			// get the clients list of scheduled events
			let data = (await axios({
				method: 'get',
				url: `${SERVER_URL}/api/schedule/`,
				headers: {
					Authorization: userToken,
				}
			})).data;

			// grab the next event only
			if (data.length > 0) {
				return {
					name: data[0].category,
					date: moment(data[0].day),
					time: moment(data[0].start, "HH:mm:ss")
				};
			}

			return false;
		} catch (err) {
			console.error(err);
			return false;
		}
	}

	// pull next event
	const isFocused = useIsFocused();
	useEffect(async () => {
		setNextEvent(await getNextEvent());
		setAdherenceModel(await getAdherenceModel());
		setAdherenceMeds(await getMedAdherence());
	}, [isFocused]);

	return (
		<ScrollView style={{ padding: 8 }}>

			{adherenceMeds.length != 0 &&
				<View style={{ margin: 4, marginBottom: 24 }}>
					<TextSubHeader2 text="Today's Medications" style={{ marginLeft: 16, marginBottom: 4 }} />
					{adherenceMeds.map((m, i) => <AdherenceHomeCard
						med={m}
						medsThisDay={getMedsThisDay(m.patientMedicationId)}
						refreshMeds={async () => setAdherenceMeds(await getMedAdherence())}
						key={i}
					/>)}
				</View>
			}


			<View style={{
				width: '100%',
				flexDirection: 'row',
				flexWrap: 'wrap',
				justifyContent: 'flex-start',
			}}>

				<View style={{ width: '50%', padding: 4 }}>
					<TextSubHeader2 text="Upcoming Events" style={{ marginLeft: 16, marginBottom: 4 }} />
					<Pressable onPress={toScheduling}>
						<Card depth={1} color={SECONDARY_COLOR_TRANSPARENT} style={{ padding: 8, aspectRatio: 1 }}>
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

				<View style={{ width: '50%', padding: 4 }}>
					<TextSubHeader2 text="My Med Score" style={{ marginLeft: 16, marginBottom: 4 }} />
					<AdherenceButtonSmall navigation={navigation} />
				</View>

			</View>
		</ScrollView>
	);
};

const AdherenceHomeCard = ({ med, refreshMeds, medsThisDay }) => {
	const [expanded, setExpanded] = useState(false);

	const userToken = useSelector((state) => state.userToken.value);

	const toggleExpanded = () => setExpanded(!expanded);

	const medsCanTake = Math.min(Math.max(0, med.pillsTaken - med.pillsScheduled), medsThisDay);

	const takeMed = async () => {
		if (medsCanTake == 0)
			return;

		try {
			await axios({
				method: 'patch',
				url: `${SERVER_URL}/patient/adherence/pills-taken`,
				headers: {
					Authorization: userToken,
				},
				data: {
					patientMedicationId: med.patientMedicationId,
					additionalPillsTaken: 1,
				}
			});

			refreshMeds();
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<Card color="#E1E1E8" depth={1} style={{ padding: 0 }}>

			<Pressable onPress={toggleExpanded}>
				<Card color="#D2D2DF" depth={1} style={{ padding: 0 }}>
					<View style={{ flexDirection: "row" }}>
						<Card depth={1} color={PRIMARY_COLOR} style={{ width: 96, height: 96, alignItems: 'center', justifyContent: 'center' }}>
							<Image source={pill} style={{ width: 64, height: 64 }} />
						</Card>
						<View style={{ margin: 8, flex: 1 }}>
							<View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
								<TextBody text="8:00 am" />
								<Icon name={expanded ? "chevron-up" : "chevron-down"} size={25} />
							</View>
							<TextSubHeader2 text={med.medicationName} />
							<TextNote text={`${medsCanTake} of ${medsThisDay} doses today`} />
						</View>
					</View>
				</Card>
			</Pressable>

			{expanded &&
				<View style={{ flexDirection: "row", margin: 4 }}>
					<PrimaryButton label="Taken" onPress={takeMed} style={{ flex: 1, margin: 4 }} />
					<PrimaryButton label="Skip" style={{ flex: 1, margin: 4 }} />
					<PrimaryButton label="Reminder" style={{ flex: 1, margin: 4 }} />
				</View>
			}

		</Card>
	)
}