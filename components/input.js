import React from "react";
import { GRAY_1, PRIMARY_COLOR, PRIMARY_COLOR_TRANSPARENT } from "../colors";
import { TextInput } from 'react-native-gesture-handler';

export const Input = ({ placeholder, setText, defaultText, style, hideText }) => {
	return (
		<TextInput
			style={[{
				fontFamily: 'Open Sans Regular',
				fontSize: 18,
				padding: 10,
				margin: 16,
				backgroundColor: PRIMARY_COLOR_TRANSPARENT,
				color: GRAY_1,
				borderColor: PRIMARY_COLOR,
				paddingLeft: 32,
				borderRadius: 25,
			}, { ...style }]}
			secureTextEntry={hideText}
			placeholder={placeholder}
			onChangeText={text => setText(text)}
			defaultValue={defaultText}
		/>
	)
}