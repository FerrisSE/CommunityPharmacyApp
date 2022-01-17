import React from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View, SafeAreaView } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import SchedulingButton from '../../../components/scheduling-card-button';
import mainStyles from '../../../main-styles';

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
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView style={[SchldStyles.container, { flex: 1 }]}>
				<Text style={[SchldStyles.title, { marginTop: 40 }]}>Services</Text>

				<TextInput
					style={mainStyles.textInput}
					placeholder="search"
					onChangeText={text => setSearchText(text)}
					defaultValue={searchText}
				/>

				{searchText.length == 0 &&
					<View>
						<Text style={SchldStyles.subtitle}>Vaccines</Text>
						<RenderServicesGrid items={vaccines} navigation={navigation} />

						<Text style={SchldStyles.subtitle}>Blood Tests</Text>
						<RenderServicesGrid items={bloodTests} navigation={navigation} />
					</View>
				}

				{searchText.length != 0 &&
					<View>
						<Text style={SchldStyles.subtitle}>Search Results For {searchText}...</Text>
						<RenderServicesGrid items={searchServices} navigation={navigation} />
					</View>
				}
			</ScrollView>
		</SafeAreaView>
	);
};

const RenderServicesGrid = ({ items, navigation }) => {
	return (
		<FlatGrid
			itemDimension={240}
			data={items}
			style={SchldStyles.gridView}
			spacing={10}
			scrollEnabled={false}
			renderItem={({ item }) => (
				<SchedulingButton icon={item.icon} label={item.name} onClicked={() => {
					navigation.navigate({
						name: 'Service Scheduling',
						params: {
							service: item
						}
					})
				}} />
			)}
		/>
	)
}

export default SchedulingHomeScreen;

const SchldStyles = StyleSheet.create({
	gridView: {
		marginTop: 10,
		flex: 1,
	},
	container: {
		padding: 12,
	},
	title: {
		fontSize: 32,
		fontWeight: "600",
		marginBottom: 16,
	},
	subtitle: {
		fontSize: 24,
		fontWeight: "600",
	},
})