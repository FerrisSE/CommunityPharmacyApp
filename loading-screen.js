import { ActivityIndicator, View } from "react-native"
import { PRIMARY_COLOR } from "./colors";

export const LoadingScreen = () => {
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<ActivityIndicator size="large" color={PRIMARY_COLOR} />
		</View>
	)
}