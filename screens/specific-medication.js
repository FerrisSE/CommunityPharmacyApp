import React, { useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import mainStyles from './main-styles';
import { Button, FlatList, SafeAreaView, Text, View } from 'react-native';

const SpecificMedicationScreen = ({ navigation, route }) => {
	return (
			<ScrollView>
		<SafeAreaView style={mainStyles.container}>
    <View style={mainStyles.center}>
			<Text style={mainStyles.title}>Medication</Text>
            </View>
            <View style={mainStyles.center}>
                <Icon name="pill" size={40} /> 
                <View>
                    <Text> {"Medication Brand Name"} </Text>
                    <Text>{"Generic Name"}</Text>
					
			        	</View>


            </View>

            <View >
            <View style={{margin:10}}>
            <Button
              title="Refill"
              onPress={() => navigation.navigate('Profile')}
            />
            </View>
            <View style={{margin:10}}>
            <Button
              title="Infomation"
              onPress={() => navigation.navigate('Profile')}
            />
             </View>
             <View style={{margin:10}}>
            <Button
              title="Side Effects"
              onPress={() => navigation.navigate('Profile')}
            />
            </View>
            <View style={{margin:10}}>
            <Button
              title="Reminders"
              onPress={() => navigation.navigate('Profile')}
            />
					</View>
			      </View>

            <View >
                    
              <Text> {"Instructions"} </Text>
              <View style={mainStyles.CardView}>
              <Text> {"Instructions for meds"} </Text>

              <View style={mainStyles.center}>
              <Icon name="laptop" size={150} />
                </View>
			      </View>
            </View>

            

			
			{/* <TextLink label="Current Medication" onPress={() => { navigator.navigate('Current Medication') }} /> */}
		</SafeAreaView>
	</ScrollView>
	);
};

export default SpecificMedicationScreen;