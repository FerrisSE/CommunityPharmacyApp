import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

export const Stack = createNativeStackNavigator();

export const navigationRef = React.createRef();

export const navigate = (routeName, params) => {
	navigationRef.current?.navigate(routeName, params);
}

export const changeStack = (routeName) => {
	navigationRef.current?.resetRoot({
		index: 0,
		routes: [{ name: routeName }],
	});
}