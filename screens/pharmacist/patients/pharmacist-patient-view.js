import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { PharmacistPatientInformationScreen } from "./pharmacist-patient-information";
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons"
import { TextBody, TextSubHeader1, TextSubHeader2 } from "../../../components/text";
import { Card } from "../../../components/cards";
import { GRAY_2, PRIMARY_COLOR, PRIMARY_COLOR_TRANSPARENT } from "../../../colors";
import { PharmacistPatientMedicationScreen } from "./pharmacist-patient-mediction";
import { PharmacistPatientAppointments } from "./pharmacist-patient-appointments";
import { PharmacistPatientConditionsScreen } from "./pharmacist-patient-conditions";
import { PharmacistPatientAdherenceScreen } from "./pharmacist-patient-adherence";
import moment from 'moment';

const Tab = ({ isSelected, tabIcon, tabName, onPress }) => {
	const bgColor = isSelected ? PRIMARY_COLOR_TRANSPARENT : "#00000000";

	return (
		<Pressable onPress={onPress} style={{ margin: 8, marginTop: 16, marginBottom: 16, padding: 8, borderRadius: 12, flexDirection: "row", backgroundColor: bgColor }}>
			<Icon size={24} name={tabIcon} color={PRIMARY_COLOR} />
			<TextSubHeader2 text={tabName} style={{ marginLeft: 12 }} />
		</Pressable>
	)
}

export const PharmacistPatientView = ({ navigation, route }) => {
	const patient = route.params.patient;

	// react navigation was a bit overkill in my opinion here, so just conditionally render these tabs based on currentScreen index
	const [currentScreen, setCurrentScreen] = useState(0);
	const screens = [
		{ name: "Personal Information", icon: "account-circle", screen: <PharmacistPatientInformationScreen patient={patient} /> },
		{ name: "Medication", icon: "pill", screen: <PharmacistPatientMedicationScreen patient={patient} /> },
		{ name: "Adherence", icon: "circle-slice-6", screen: <PharmacistPatientAdherenceScreen patient={patient} /> },
		{ name: "Appointments", icon: "calendar-month", screen: <PharmacistPatientAppointments patient={patient} nav={navigation} /> },
		{ name: "Conditions", icon: "heart", screen: <PharmacistPatientConditionsScreen patient={patient} /> },
	];

	const onBack = () => navigation.pop();

	// construct a function takes no parameters, so we can feed it to onPress on the pressable component
	const onPress = (index) => () => setCurrentScreen(index);

	return (
		<View style={{ flex: 1 }}>
			{/* Back Button */}
			< Pressable onPress={onBack} style={{ margin: 32 }}>
				<TextSubHeader2 text="< Back to Search" style={{ color: GRAY_2 }} />
			</Pressable >

			<Card style={{ flex: 1, margin: 32, padding: 32 }} depth={0}>

				<View style={{ flexDirection: 'row', alignContent: 'flex-end' }}>

					{/* Patient Info */}
					<View style={{ flex: 1, flexDirection: 'row', alignContent: 'center' }}>
						<Icon name="account-circle" size={80} color={PRIMARY_COLOR} />
						<View style={{ marginLeft: 12 }}>
							<TextSubHeader1 text={`${patient.givenName} ${patient.familyName}`} />
							<TextSubHeader2 text={`${moment(patient.birthdate).fromNow(true)} old, ${moment(patient.birthdate).format("MM/DD/YYYY")}`} />
							<TextBody text={`Patient ID: ${patient.patientId}`} />
						</View>
					</View>

					{/* Screen Name */}
					<TextSubHeader2 text={screens[currentScreen].name} style={{ flex: 2, marginLeft: 64, alignSelf: 'flex-end' }} />
				</View>

				<View style={{ flex: 1, flexDirection: 'row' }}>
					{/* Tab Selector */}
					<Card style={{ flex: 1, margin: 12 }} depth={2}>
						{screens.map((screen, index) => <Tab key={index} isSelected={currentScreen == index} tabIcon={screen.icon} tabName={screen.name} onPress={onPress(index)} />)}
					</Card>

					{/* Current Screen */}
					<View style={{ flex: 2, margin: 12 }}>
						{screens[currentScreen].screen}
					</View>
				</View>

			</Card>
		</View>
	)
}