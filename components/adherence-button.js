import { Card } from "./cards";
import * as Progress from 'react-native-progress';
import { Pressable, View } from "react-native";
import { TextBody, TextNote, TextSubHeader1 } from "./text";
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons";
import { SECONDARY_COLOR } from "../colors";

export const AdherenceButtonLarge = ({ navigation }) => {
	const toAdherence = () => navigation.navigate("Adherence");

	return (
		<Pressable onPress={toAdherence}>
			<Card depth={1} color="secondary" style={{ padding: 16, marginBottom: 12 }}>
				<View style={{ flex: 1, flexDirection: "row", }}>
					<Progress.Circle
						animated={false}
						size={110}
						progress={0.33}
						showsText={true}
						color="#79DCAD"
						unfilledColor="#FFFFFF"
						textStyle={{
							color: "#000",
							fontFamily: "OpenSans-Light",
							fontSize: 26,
						}}
						thickness={6}
						fill="#00000000"
						borderWidth={0}
					/>

					<View style={{ marginLeft: 24 }}>
						<TextSubHeader1 text="My Adherence" />
						<TextNote text="tap to view more" />
						<View style={{ flex: 1, flexDirection: "row", marginTop: 8, alignContent: "space-between" }}>
							<View style={{ margin: 8 }}>
								<TextNote text="Most Missed" />
								<TextBody text="Med Name" />
							</View>
							<View style={{ margin: 8 }}>
								<TextNote text="Most Missed" />
								<TextBody text="Med Name" />
							</View>
						</View>
					</View>

					<View style={{ flex: 1, flexDirection: "row", height: "100%", justifyContent: "flex-end" }}>
						<Icon name="arrow-expand" size={25} color={SECONDARY_COLOR} />
					</View>
				</View>
			</Card>
		</Pressable>
	)
}