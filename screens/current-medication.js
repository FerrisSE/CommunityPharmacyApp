import React from 'react';
import { Button, FlatList, SafeAreaView, Text, View } from 'react-native';
import MedicationCard from '../components/medication-card';
import mainStyles from '../main-styles';

const CurrentMedicationScreen = ({ navigation }) => {
	return (
		<FlatList
			data={[{ key: 'a' }, { key: 'b' }, { key: 'c' }, { key: 'd' }, { key: 'e' }, { key: 'f' }, { key: 'g' }, { key: 'h' }, { key: 'i' }, { key: 'j' }]}
			renderItem={({ item }) => <MedicationCard />}
		/>
	);
};

export default CurrentMedicationScreen;