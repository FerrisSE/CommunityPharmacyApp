import React from "react";
import { View, Image } from "react-native";
import { PrimaryButton } from "../../components/buttons";
import { TextBody, TextSubHeader1 } from "../../components/text";

export const RegisterSucceededScreen = ({ navigation, route }) => {
	const pressFinished = () => navigation.popToTop();

	return (
		<View style={{ flex: 1, justifyContent: 'center' }}>
			<View style={{ height: '75%', alignSelf: 'center' }}>
				<View style={{ flex: 1, margin: 32 }}>
					<View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
						<Image source={require("../../images/registerSuccess.png")} style={{ width: '100%', height: '100%' }} resizeMode='contain' />
					</View>
					<View style={{ flex: 1 }}>
						<TextSubHeader1 text="All Set!" />
						<TextBody text="Your account was created successfully. You can now login." style={{ marginTop: 32, marginBottom: 32 }} />
						<PrimaryButton label='Finish' onPress={pressFinished} />
					</View>
				</View>
			</View>
		</View>
	)
}