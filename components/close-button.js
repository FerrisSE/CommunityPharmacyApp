import React from "react";
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons"

export const CloseButton = () => {
	const navigation = useNavigation();

	return (
		<TouchableOpacity
			onPress={navigation.goBack}
		>
			<Icon name="close" size={30} />
		</TouchableOpacity>
	)
}