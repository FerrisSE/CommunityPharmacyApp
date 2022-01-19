import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { PRIMARY_COLOR, PRIMARY_COLOR_TRANSPARENT, WHITE } from '../../../colors';
import { PrimaryButton } from '../../../components/buttons';
import { CloseButton } from '../../../components/close-button';
import { TextHeader2, TextHeader3, TextSubHeader2 } from '../../../components/text';
import CalendarStrip from 'react-native-calendar-strip';

const ServiceScheduling = ({ navigation, route }) => {
	return (
		<View style={{ backgroundColor: "#A9A9CC", flex: 1 }}>
			<SafeAreaView style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: "#EEEEF4", marginTop: 8, flex: 1 }}>
				<View style={{ margin: 16 }}>
					<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
						<TextSubHeader2 text="Service Scheduling" />
						<CloseButton />
					</View>
					<TextHeader2 text={route.params.service.name} />
				</View>

				<View style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: WHITE, flex: 1, alignItems: 'center' }}>
					<CalendarStrip
						style={{ width: "90%", height: 150, paddingTop: 32, paddingBottom: 32 }}
						calendarHeaderStyle={{ fontFamily: "Open Sans SemiBold", fontSize: 24 }}
						highlightDateContainerStyle={{ backgroundColor: PRIMARY_COLOR, borderRadius: 16, padding: 8 }}
						highlightDateNumberStyle={{ color: WHITE }}
						highlightDateNameStyle={{ color: WHITE }}
						dayContainerStyle={{ backgroundColor: PRIMARY_COLOR_TRANSPARENT, borderRadius: 16, padding: 8 }}
						dateNameStyle={{ color: PRIMARY_COLOR }}
						dateNumberStyle={{ color: PRIMARY_COLOR }}
					/>
					<PrimaryButton label="CONFIRM APPOINTMENT" />
				</View>
			</SafeAreaView>
		</View>
	);
};

export default ServiceScheduling;