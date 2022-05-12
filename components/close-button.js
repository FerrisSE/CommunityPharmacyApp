import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable } from 'react-native'
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons"

export const CloseButton = () => {
	const navigation = useNavigation();
	return (
		<Pressable
			onPress={navigation.goBack}
		>
			<Icon name="close" size={30} />
		</Pressable>
	)
}