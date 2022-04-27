import React from "react";
import { Pressable, View } from "react-native";
import { TextSubHeader1 } from "./text";
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons"
import { PRIMARY_COLOR } from "../colors";

export const Header = ({ title, nav }) => {
	return (
		<View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', margin: 16 }}>
			<Pressable onPress={() => nav.navigate("Home")}>
				<Icon name="home-outline" size={36} color={PRIMARY_COLOR} />
			</Pressable>

			<TextSubHeader1 text={title} />

			<Pressable onPress={() => nav.navigate("Profile")}>
				<Icon name="account-circle" size={36} color={PRIMARY_COLOR} />
			</Pressable>
		</View>
	);
}