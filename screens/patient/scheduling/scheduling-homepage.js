import axios from 'axios';
import React, { useEffect } from 'react';
import { ScrollView, View, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { Card } from '../../../components/cards';
import { Input } from '../../../components/input';
import SchedulingButton from '../../../components/scheduling-card-button';
import { UpcomingEvents } from '../../../components/scheduling-upcoming';
import { TextHeader3, TextSubHeader1, TextSubHeader2 } from '../../../components/text';
import moment from 'moment';
import { useIsFocused } from "@react-navigation/native";
import { SERVER_URL, TIMEOUT } from '../../../constants';
import { RenderServicesGrid } from '../../../components/services';
import { DayAndTimeDiff } from '../../../time';

// TODO: replace these hardcoded services with a list of what is actually offered at a given pharmacy

const vaccines = [
	{
		name: "Covid-19 Vaccine",
		icon: "bandage",
		desc: "You can get a COVID-19 vaccine and other vaccines, including a flu vaccine, at the same visit. Experience with other vaccines has shown that the way our bodies develop protection, known as an immune response, and possible side effects after getting vaccinated are generally the same when given alone or with other vaccines."
	},
	{
		name:
			"Influenza Vaccine",
		icon: "bandage",
		desc: "test description"
	},
	{
		name: "Flu Vaccine",
		icon: "bandage",
		desc: "Influenza (flu) vaccines (often called “flu shots”) are vaccines that protect against the four influenza viruses that research indicates most common during the upcoming season. Most flu vaccines are “flu shots” given with a needle, usually in the arm, but there also is also a nasal spray flu vaccine."
	}
]

const bloodTests = [
	{ name: "AC-1 Test", icon: "water-outline", desc: "test description" },
	{ name: "Whole Blood Glucose", icon: "water-outline", desc: "test description" },
	{ name: "Hemoglobin Test", icon: "water-outline", desc: "test description" }
]

const SchedulingHomeScreen = ({ navigation }) => {
	let [searchText, setSearchText] = React.useState('');
	let [events, setEvents] = React.useState([]);

	let searchServices = []
	if (searchText.length != 0) {
		searchServices.push(
			...vaccines.filter(v => v.name.toLowerCase().includes(searchText.toLowerCase())),
			...bloodTests.filter(v => v.name.toLowerCase().includes(searchText.toLowerCase()))
		);
	}

	const onCardPressed = (service) => {
		navigation.navigate({
			name: 'Service Scheduling',
			params: {
				service: service
			}
		});
	}

	const userToken = useSelector((state) => state.userToken.value);

	const isFocused = useIsFocused();
	useEffect(() => {
		// get the clients list of scheduled events
		axios({
			method: 'get',
			url: `${SERVER_URL}/api/schedule`,
			timeout: TIMEOUT,
			headers: {
				Authorization: userToken,
			}
		}).then(response => {
			setEvents(response.data
				.sort((a, b) => DayAndTimeDiff(a.day, a.start, b.day, b.start))
				.map(t => {
					return {
						name: t.category,
						date: moment(t.day).format("MMM Do"),
						time: moment(t.start, "HH:mm:ss").format("h:mm a"),
						status: t.status,
					}
				}));
		});
	}, [isFocused]);

	return (
		<ScrollView style={{ flex: 1 }}>
			<SafeAreaView style={{ flex: 1, padding: 12 }}>
				{events.length != 0 &&
					<View>
						<TextHeader3 text="Upcoming Events" style={{ marginLeft: 12, marginBottom: 12 }} />
						<UpcomingEvents events={events} />
					</View>
				}

				<TextSubHeader1 text="Services" style={{ marginTop: 24 }} />

				<Card depth={1}>
					<Input placeholder="Search" setText={setSearchText} defaultText={searchText} />

					{searchText.length == 0 &&
						<View>
							<TextSubHeader2 text="Vaccines" style={{ marginLeft: 8, marginTop: 16 }} />
							<RenderServicesGrid items={vaccines} navigation={navigation} itemsPerRow={2} onPress={onCardPressed} />

							<TextSubHeader2 text="Blood Tests" style={{ marginLeft: 8, marginTop: 16 }} />
							<RenderServicesGrid items={bloodTests} navigation={navigation} itemsPerRow={2} onPress={onCardPressed} />
						</View>
					}

					{searchText.length != 0 &&
						<View>
							<TextSubHeader2 text={`Search Results For ${searchText}...`} style={{ marginLeft: 8 }} />
							<RenderServicesGrid items={searchServices} navigation={navigation} itemsPerRow={2} onPress={onCardPressed} />
						</View>
					}
				</Card>
			</SafeAreaView>
		</ScrollView>
	);
};

export default SchedulingHomeScreen;