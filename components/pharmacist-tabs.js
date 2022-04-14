import React from "react";
import { Pressable, View } from "react-native";
import { PRIMARY_COLOR } from "../colors";
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons"
import { TextSubHeader1 } from "./text";
import { TabActions, TabRouter, useNavigationBuilder } from "@react-navigation/native";

const Tab = ({ isSelected, tabIcon, tabName, onPress }) => {
	const bgColor = isSelected ? "#CFCFE2" : "#00000000";
	const textColor = isSelected ? PRIMARY_COLOR : "#CFCFE2";

	return (
		<Pressable onPress={onPress} style={{ margin: 8, padding: 12, borderRadius: 7, flex: 1, flexDirection: "row", backgroundColor: bgColor }}>
			<Icon size={24} name={tabIcon} color={textColor} />
			<TextSubHeader1 text={tabName} style={{ color: textColor, marginLeft: 12 }} />
		</Pressable>
	)
}

export const PharmacistTabNavigator = ({ initialRouteName, children, screenOptions }) => {
	const { state, navigation, descriptors, NavigationContent } = useNavigationBuilder(TabRouter, {
		children,
		screenOptions,
		initialRouteName,
	});

	const tabPressed = (route) => {
		return () => {
			const event = navigation.emit({
				type: 'tabPress',
				target: route.key,
				canPreventDefault: true,
			});

			if (!event.defaultPrevented) {
				navigation.dispatch({
					...TabActions.jumpTo(route.name),
					target: state.key,
				});
			}
		}
	}

	return (
		<NavigationContent>
			<View style={{ width: '100%', height: '100%', flex: 1, flexDirection: 'row' }}>

				{/* Render Tabs */}
				<View style={{ minWidth: 200, backgroundColor: PRIMARY_COLOR, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
					<View>
						{state.routes.map((route, index) => (
							<Tab
								key={route.key}
								tabName={descriptors[route.key].options.title || route.name}
								tabIcon={descriptors[route.key].options.icon}
								isSelected={state.index == index}
								onPress={tabPressed(route)}
							/>
						))}
					</View>
				</View>

				{/* Render Selected Screen */}
				<View style={{ flex: 1 }}>
					{descriptors[state.routes[state.index].key].render()}
				</View>

			</View>
		</NavigationContent>
	)
}