import React, { useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Button, FlatList, SafeAreaView, Text, View } from 'react-native';
import mainStyles from '../../../main-styles';
import YoutubePlayer from "react-native-youtube-iframe";

const SpecificMedicationScreen = ({ navigation, route }) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={mainStyles.container}>
          <View style={mainStyles.center}>
            <Text style={mainStyles.title}>{route.params.med.medicationName}</Text>
          </View>
          <View style={[mainStyles.center, { padding: 16 }]}>
            <Icon name="pill" size={80} />
            <View>
              <Text>{route.params.med.drugPurpose}</Text>
              <Text>{route.params.med.instructions}</Text>

            </View>


          </View>

          <View >
            <View style={{ margin: 10 }}>
              <Button
                title="Refill"
                onPress={() => navigation.navigate('Profile')}
              />
            </View>
            <View style={{ margin: 10 }}>
              <Button
                title="Infomation"
                onPress={() => navigation.navigate('Profile')}
              />
            </View>
            <View style={{ margin: 10 }}>
              <Button
                title="Side Effects"
                onPress={() => navigation.navigate('Profile')}
              />
            </View>
            <View style={{ margin: 10 }}>
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
              <YoutubePlayer
                height={300}
                videoId={"-a5b2u7MG7U"}
              />
            </View>
          </View>




          {/* <TextLink label="Current Medication" onPress={() => { navigator.navigate('Current Medication') }} /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SpecificMedicationScreen;