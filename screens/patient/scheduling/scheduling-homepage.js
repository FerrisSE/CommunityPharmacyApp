import React from 'react';
import { ScrollView, View, SafeAreaView } from 'react-native';
import { WHITE } from '../../../colors';
import { Card } from '../../../components/cards';
import { Input } from '../../../components/input';
import SchedulingButton from '../../../components/scheduling-card-button';
import { UpcomingEvents } from '../../../components/scheduling-upcoming';
import { TextSubHeader1, TextSubHeader2 } from '../../../components/text';

const vaccines = [
	{ name: "Covid-19 Vaccine", icon: "bandage" },
	{ name: "Influenza Vaccine", icon: "bandage" },
	{ name: "Flu Vaccine", icon: "bandage" }
]

const bloodTests = [
	{ name: "AC-1 Test", icon: "water-outline" },
	{ name: "Whole Blood Glucose", icon: "water-outline" },
	{ name: "Hemoglobin Test", icon: "water-outline" }
]

const SchedulingHomeScreen = ({ navigation }) => {
	let [searchText, setSearchText] = React.useState('')

	let searchServices = []
	if (searchText.length != 0) {
		searchServices.push(
			...vaccines.filter(v => v.name.toLowerCase().includes(searchText.toLowerCase())),
			...bloodTests.filter(v => v.name.toLowerCase().includes(searchText.toLowerCase()))
		);
	}

	return (
		<SafeAreaView style={{ backgroundColor: WHITE, flex: 1 }}>
			<ScrollView style={{ padding: 12, flex: 1 }}>
				<UpcomingEvents />

				<TextSubHeader1 text="Services" style={{ marginTop: 24 }} />

				<Card depth={1}>
					<Input placeholder="Search" setText={setSearchText} defaultText={searchText} />

					{searchText.length == 0 &&
						<View>
							<TextSubHeader2 text="Vaccines" style={{ marginLeft: 8, marginTop: 16 }} />
							<RenderServicesGrid items={vaccines} navigation={navigation} />

							<TextSubHeader2 text="Blood Tests" style={{ marginLeft: 8, marginTop: 16 }} />
							<RenderServicesGrid items={bloodTests} navigation={navigation} />
						</View>
					}

					{searchText.length != 0 &&
						<View>
							<TextSubHeader2 text={`Search Results For ${searchText}...`} style={{ marginLeft: 8 }} />
							<RenderServicesGrid items={searchServices} navigation={navigation} />
						</View>
					}
				</Card>
			</ScrollView>
		</SafeAreaView>
	);
};

const RenderServicesGrid = ({ items, navigation }) => {
	return (
		<View style={{
			width: '100%',
			marginTop: 10,
			flex: 1,
			flexDirection: 'row',
			flexWrap: 'wrap',
			justifyContent: 'flex-start',
		}}>
			{items.map(s => (
				< SchedulingButton icon={s.icon} label={s.name} onClicked={() => {
					navigation.navigate({
						name: 'Service Scheduling',
						params: {
							service: s
						}
					})
				}} />
			))}
		</View>
	)
}

export default SchedulingHomeScreen;