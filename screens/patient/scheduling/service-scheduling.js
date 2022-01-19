import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { WHITE } from '../../../colors';
import { PrimaryButton } from '../../../components/buttons';
import { CloseButton } from '../../../components/close-button';
import { TextBody, TextHeader1, TextHeader2, TextHeader3, TextSubHeader2 } from '../../../components/text';

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
					<TextHeader3 text="Jan. 08 - Jan. 14," />
					<PrimaryButton label="CONFIRM APPOINTMENT" />
				</View>
			</SafeAreaView>
		</View>
	);
};

export default ServiceScheduling;