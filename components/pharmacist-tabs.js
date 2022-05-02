import React from "react";
import { Pressable, View } from "react-native";
import { PRIMARY_COLOR, WHITE } from "../colors";
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons"
import { TextSubHeader1 } from "./text";
import { TabActions, TabRouter, useNavigationBuilder } from "@react-navigation/native";
import { OutlineButton } from "./buttons";

const Tab = ({ isSelected, tabIcon, tabName, onPress }) => {
	const bgColor = isSelected ? "#CFCFE2" : "#00000000";
	const textColor = isSelected ? PRIMARY_COLOR : "#CFCFE2";

	return (
		<Pressable onPress={onPress} style={{ margin: 8, padding: 12, borderRadius: 7, flexDirection: "row", backgroundColor: bgColor }}>
			<Icon size={24} name={tabIcon} color={textColor} />
			<TextSubHeader1 text={tabName} style={{ color: textColor, marginLeft: 12 }} />
		</Pressable>
	)
}

export const PharmacistTabNavigator = ({ initialRouteName, children, screenOptions, nav }) => {
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

	const logout = () => {
		//TODO: clear token from state
		nav.navigate('Login');
	}

	return (
		<NavigationContent>
			<View style={{ height: '100%', flexDirection: 'row' }}>

				{/* Side Bar */}
				<View style={{ minWidth: 200, backgroundColor: PRIMARY_COLOR, height: '100%', justifyContent: 'space-between', alignItems: 'center' }}>

					{/* Profile Top */}
					<View style={{ width: '100%', backgroundColor: "#CFCFE2" }}>
						<Icon name="account-circle" size={64} color={PRIMARY_COLOR} style={{ margin: 8, marginTop: 32 }} />
					</View>

					{/* Render Tabs */}
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

					{/* Logout */}
					<OutlineButton
						label="Logout"
						onPress={logout}
						color={"#CFCFE2"} style={{ marginBottom: 16 }}
						icon='exit-to-app'
						iconSide="right"
					/>
				</View>

				{/* Render Selected Screen */}
				<View style={{ flex: 1 }}>
					{descriptors[state.routes[state.index].key].render()}
				</View>

			</View>
		</NavigationContent>
	)
}