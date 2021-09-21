import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ProfileScreen = ({ navigation, route }) => {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text style={styles.title}>Patient Profile</Text>
			<Text style={styles.bold}>Name: <Text style={styles.information}>test</Text></Text>
			<Text style={styles.bold}>ID: <Text style={styles.information}>test</Text></Text>
			<Text style={styles.bold}>Zipcode: <Text style={styles.information}>test</Text></Text>
			<Text style={styles.bold}>Birthdate: <Text style={styles.information}>test</Text></Text>
		</View>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({
	title: {
		fontWeight: "bold",
		fontSize: 32
	},
	bold: {
		fontWeight: "bold",
		fontSize: 16
	},
	information: {
		fontWeight: "normal",
		fontSize: 16
	}
});