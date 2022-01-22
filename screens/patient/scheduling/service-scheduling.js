import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { PRIMARY_COLOR, PRIMARY_COLOR_TRANSPARENT, WHITE } from '../../../colors';
import { PrimaryButton } from '../../../components/buttons';
import { CloseButton } from '../../../components/close-button';
import { TextHeader2, TextHeader3, TextSubHeader2 } from '../../../components/text';
import CalendarStrip from 'react-native-calendar-strip';
import { TimePicker } from '../../../components/time-picker';

const times = [
	{
		time: "8:00",
		am: true,
		active: false,
		available: true,
	},
	{
		time: "8:30",
		am: true,
		active: true,
		available: true,
	},
	{
		time: "9:00",
		am: true,
		active: false,
		available: false,
	},
	{
		time: "9:30",
		am: true,
		active: false,
		available: true,
	},
	{
		time: "10:00",
		am: true,
		active: false,
		available: true,
	},
	{
		time: "10:30",
		am: true,
		active: false,
		available: false,
	},
	{
		time: "11:00",
		am: true,
		active: false,
		available: false,
	},
	{
		time: "11:30",
		am: true,
		active: false,
		available: true,
	}
];

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

					<TimePicker title="Available Appointments" subtitle="location name" times={times} style={{ marginTop: 24, marginBottom: 24, width: '90%', flex: 1 }} />

					<PrimaryButton label="CONFIRM APPOINTMENT" style={{ width: '75%', marginTop: 32, marginBottom: 32 }} />
				</View>
			</SafeAreaView>
		</View>
	);
};

export default ServiceScheduling;