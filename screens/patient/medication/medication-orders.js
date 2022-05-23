import { ScrollView, View } from "react-native"
import { Card } from "../../../components/cards";
import { CloseButton } from "../../../components/close-button";
import { TextBody, TextHeader2, TextHeader3, TextSubHeader1, TextSubHeader2 } from "../../../components/text";

export const MedicationOrdersScreen = ({ navigation, route }) => {
	let orders = route.params.orders;

	return (
		<ScrollView style={{ padding: 8 }}>
			<View style={{ flexDirection: "row", justifyContent: "space-between", padding: 16, alignItems: "center" }}>
				<TextHeader2 text="Orders" />
				<CloseButton />
			</View>
			{orders.map((o, i) =>
				<Card depth={1} key={i} style={{ margin: 4, padding: 16 }}>
					<TextHeader3 text={o.medicationName} style={{ marginBottom: 12 }} />
					<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
						<TextBody text={`Status: ${o.status}`} />
						<TextBody text={`Created: ${o.createTime}`} />
					</View>
				</Card>
			)}
		</ScrollView>
	)
}