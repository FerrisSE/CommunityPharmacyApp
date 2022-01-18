import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SafeAreaView, Text, View } from 'react-native';
import mainStyles from '../../../main-styles';
import YoutubePlayer from "react-native-youtube-iframe";
import { TextBody, TextHeader2, TextHeader3, TextNote, TextSubHeader2 } from '../../../components/text';
import { Card } from '../../../components/cards';
import { CardButton } from '../../../components/buttons';
import { WHITE } from '../../../colors';

const SpecificMedicationScreen = ({ navigation, route }) => {
	return (
		<ScrollView style={{ backgroundColor: WHITE, flex: 1 }}>
			<View style={[mainStyles.container, { flex: 1 }]}>
				<View style={{ justifyContent: 'center', alignItems: 'center' }}>
					<Icon name="pill" size={100} />
				</View>
				<TextHeader2 text={route.params.med.medicationName} />
				<TextBody text={route.params.med.drugPurpose} />

				<View style={{ marginTop: 16 }}>
					<TextHeader3 text="Rx Details" />
					<View style={{
						flex: 1,
						flexDirection: "row",
						justifyContent: "flex-start",
						alignItems: "center",
						marginTop: 4,
					}}>
						<View style={{
							flex: 1,
							flexDirection: "column",
							alignItems: "flex-start",
							height: 100,
						}}>
							<TextNote text="Dose" />
							<TextSubHeader2 text={route.params.med.dose} />
						</View>
						<View style={{
							flex: 1,
							flexDirection: "column",
							alignItems: "flex-start",
							height: 100,
						}}>
							<TextNote text="Instructions" />
							<TextSubHeader2 text={route.params.med.instructions} />
						</View>
					</View>
				</View>

				<View style={{ marginBottom: 16 }}>
					<TextNote text="Refills" />
					<TextSubHeader2 text={`${route.params.med.currentRefills} out of ${route.params.med.totalRefills} refills left`} />
				</View>

				<Card depth={1} >
					<CardButton depth={2} label="Refill" />
					<CardButton depth={2} label="Information" />
					<CardButton depth={2} label="Side Effects" />
					<CardButton depth={2} label="Reminders" />
				</Card>

				<View style={{ marginTop: 16, flex: 0 }}>
					<TextHeader3 text="Education" />
					<Card depth={1}>
						<View style={{ padding: 16 }}>
							<TextSubHeader2 text="Instructions for medication: " />
							<YoutubePlayer
								height={256}
								videoId={"-a5b2u7MG7U"}
							/>
						</View>
					</Card>
				</View>

			</View>
		</ScrollView>
	);
};

export default SpecificMedicationScreen;