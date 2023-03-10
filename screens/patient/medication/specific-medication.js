import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { View } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import { TextBody, TextHeader2, TextHeader3, TextNote, TextSubHeader2 } from '../../../components/text';
import { Card } from '../../../components/cards';
import { CardButton, OutlineButton } from '../../../components/buttons';
import { SECONDARY_COLOR_TRANSPARENT, WHITE } from '../../../colors';
import { useDispatch } from 'react-redux';
import { PRIMARY_COLOR } from '../../../colors';
import { addMed } from '../../../redux/slices/cart-slice';

const SpecificMedicationScreen = ({ navigation, route }) => {
	const dispatch = useDispatch();

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: _ => <View></View>,
			headerRight: () => (
				<OutlineButton
					label="Refill"
					color={PRIMARY_COLOR}
					style={{ marginRight: 8 }}
					onPress={() => {
						dispatch(addMed(route.params.med));
						navigation.navigate("Refill Order");
					}} />
			),
		});
	}, [navigation]);

	return (
		<ScrollView style={{ backgroundColor: SECONDARY_COLOR_TRANSPARENT, flex: 1 }}>
			<View style={{ justifyContent: 'center', alignItems: 'center', padding: 24 }}>
				<Icon name="pill" size={100} color={WHITE} />
			</View>

			<View style={{ backgroundColor: WHITE, borderTopLeftRadius: 20, borderTopRightRadius: 20, flex: 1, padding: 20 }}>
				<TextHeader2 text={route.params.med.medName} />
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
							<TextNote text="Dosage Instructions" />
							<TextSubHeader2 text={route.params.med.doseInstructions} />
						</View>
						<View style={{
							flex: 1,
							flexDirection: "column",
							alignItems: "flex-start",
							height: 100,
						}}>
							<TextNote text="Reason" />
							<TextSubHeader2 text={route.params.med.reasonText} />
						</View>
					</View>
				</View>

				<View style={{ marginBottom: 16 }}>
					<TextNote text="Refills" />
					<TextSubHeader2 text={`${route.params.med.totalRefills - route.params.med.filledRefills} out of ${route.params.med.totalRefills} refills left`} />
				</View>

				<Card depth={1} >
					<CardButton depth={2} label="Side Effects" />
					<CardButton depth={2} label="Information" />
					<CardButton depth={2} label="FAQ" />
				</Card>

				{/* youtube vids don't work on mobile
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
				*/}
			</View>
		</ScrollView>
	);
};

export default SpecificMedicationScreen;