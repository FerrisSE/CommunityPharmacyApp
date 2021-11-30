import React from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
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

const SchedulingScreen = ({ navigation }) => {
	let [searchText, setSearchText] = React.useState('')

	let searchEvents = []
	if (searchText.length != 0) {
		searchEvents.push(
			...vaccines.filter(v => v.name.toLowerCase().includes(searchText.toLowerCase())),
			...bloodTests.filter(v => v.name.toLowerCase().includes(searchText.toLowerCase()))
		);
	}

	return (
		<ScrollView style={SchldStyles.container}>
			<Text style={SchldStyles.title}>Services</Text>

			<TextInput
				style={mainStyles.textInput}
				placeholder="search"
				onChangeText={text => setSearchText(text)}
				defaultValue={searchText}
			/>

			{searchText.length == 0 &&
				<View>
					<Text style={SchldStyles.subtitle}>Vaccines</Text>
					<FlatGrid
						itemDimension={240}
						data={vaccines}
						style={SchldStyles.gridView}
						spacing={10}
						renderItem={({ item }) => (
							<SchedulingButton icon={item.icon} label={item.name} />
						)}
					/>

					<Text style={SchldStyles.subtitle}>Blood Tests</Text>
					<FlatGrid
						itemDimension={240}
						data={bloodTests}
						style={SchldStyles.gridView}
						spacing={10}
						renderItem={({ item }) => (
							<SchedulingButton icon={item.icon} label={item.name} />
						)}
					/>
				</View>
			}

			{searchText.length != 0 &&
				<View>
					<Text style={SchldStyles.subtitle}>Search Results For {searchText}...</Text>
					<FlatGrid
						itemDimension={240}
						data={searchEvents}
						style={SchldStyles.gridView}
						spacing={10}
						renderItem={({ item }) => (
							<SchedulingButton icon={item.icon} label={item.name} />
						)}
					/>
				</View>
			}


		</ScrollView>
	);
};

export default SchedulingScreen;

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