import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons"
import { HIGH_PRIORITY, PRIMARY_COLOR, PRIMARY_COLOR_TRANSPARENT, WHITE } from '../colors';
import { TextBody } from './text';

export const ShoppingCart = ({ navigation, numbInCart }) => {
	const order = () => {
		if (numbInCart > 0) navigation.navigate("Refill Order");
	}

	let color = PRIMARY_COLOR
	if (numbInCart == 0)
		color = PRIMARY_COLOR_TRANSPARENT

	return (
		<Pressable onPress={order} style={{ alignItems: 'center', marginRight: 12 }}>
			{numbInCart > 0 &&
				<View style={{
					width: 24,
					height: 24,
					position: "absolute",
					alignSelf: "flex-end",
					alignItems: 'center',
					justifyContent: 'center',
					borderRadius: 12,
					backgroundColor: HIGH_PRIORITY,
					marginTop: -16,
					marginRight: -16,
				}}>
					<Text style={{ color: WHITE }}>{numbInCart}</Text>
				</View>
			}
			<Icon name='cart' color={color} size={32} />
			<TextBody text="Cart" style={{ color: color }} />
		</Pressable>
	)
}