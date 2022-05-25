import { View } from "react-native"
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons";
import { HIGH_PRIORITY } from "./colors";
import { TextBody, TextHeader2, TextSubHeader1 } from "./components/text";

export const ErrorScreen = ({ error }) => {

	let message = "Something Went Wrong";

	if (error.message.includes("403"))
		message = "Forbidden From Accessing This Data";
	if (error.message.includes("404"))
		message = "Requested Resource Not Found";
	if (error.message.includes("408"))
		message = "Unable to Connect to Server";
	if (error.message.includes("500"))
		message = "Internal Server Error";

	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Icon name="alert" size={128} color={HIGH_PRIORITY} />
			<TextHeader2 text="Oops!" />
			<TextBody text={message} />
		</View>
	)
}