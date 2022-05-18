import { Pressable, ScrollView, View } from "react-native"
import { Card } from "../../../components/cards";
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons";
import { TextBody, TextSubHeader1, TextSubHeader2 } from "../../../components/text";
import { GRAY_2, PRIMARY_COLOR } from "../../../colors";
import moment from "moment";
import { RenderServicesGrid } from "../../../components/services";
import { Input } from "../../../components/input";
import { useState } from "react";

const services = [
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
	},
	{ name: "AC-1 Test", icon: "water-outline", desc: "test description" },
	{ name: "Whole Blood Glucose", icon: "water-outline", desc: "test description" },
	{ name: "Hemoglobin Test", icon: "water-outline", desc: "test description" }
]

export const PharmacistServicesScheduleScreen = ({ navigation, route }) => {
	const patient = route.params.patient;
	let [searchText, setSearchText] = useState('');

	let searchServices = [];
	if (searchText.length != 0) {
		searchServices.push(
			...services.filter(v => v.name.toLowerCase().includes(searchText.toLowerCase())),
		);
	}

	const onCardPressed = (service) => {
		navigation.navigate({
			name: 'Services Schedule Details',
			params: {
				patient: patient,
				service: service
			}
		});
	}

	return (
		<View style={{ flex: 1 }}>
			{/* Back Button */}
			< Pressable style={{ margin: 32 }}>
				<TextSubHeader2 text="< Back" style={{ color: GRAY_2 }} />
			</Pressable >

			{/* Patient Info */}
			<View style={{ marginLeft: 32, flexDirection: 'row', alignContent: 'center' }}>
				<Icon name="account-circle" size={80} color={PRIMARY_COLOR} />
				<View style={{ marginLeft: 12 }}>
					<TextSubHeader1 text={`Schedule an Appointment for ${patient.givenName} ${patient.familyName}`} />
					<TextSubHeader2 text={`${moment(patient.birthdate).fromNow(true)} old, ${moment(patient.birthdate).format("MM/DD/YYYY")}`} />
				</View>
			</View>

			<Card style={{ flex: 1, margin: 32, padding: 32 }} depth={0}>
				<Input placeholder="Search" setText={setSearchText} defaultText={searchText} />
				<ScrollView>
					<RenderServicesGrid items={services} navigation={navigation} itemsPerRow={3} onPress={onCardPressed} />
				</ScrollView>
			</Card>
		</View>
	)
}