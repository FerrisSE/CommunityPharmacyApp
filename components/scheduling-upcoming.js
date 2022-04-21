import React, { useState } from "react";
import { Card } from "./cards";
import { TextSubHeader2 } from "./text";
import { TouchableOpacity, View } from "react-native";
import { SECONDARY_COLOR_TRANSPARENT } from "../colors";

const DefaultCountShown = 2;

export const UpcomingEvents = ({ events }) => {
	let [expanded, setExpanded] = useState(false);

	let shownEvents = events.slice(0, expanded ? events.length : DefaultCountShown);

	return (
		<Card depth={1} color={SECONDARY_COLOR_TRANSPARENT}>
			<View>

				{ // show list of events
					shownEvents.map(e =>
						<Card depth={2} color={SECONDARY_COLOR_TRANSPARENT} style={{ margin: 4 }} key={e.name + e.date}>
							<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', margin: 8 }}>
								<View>
									<TextSubHeader2 text={e.date} />
									<TextSubHeader2 text={e.time} />
								</View>
								<TextSubHeader2 text={e.name} />
							</View>
						</Card>
					)
				}

				{ // show either collapse or expand button, so long as there are enough events to warrant a dropdown
					events.length > DefaultCountShown && (
						expanded ?
							<TouchableOpacity style={{ margin: 4 }} onPress={() => setExpanded(false)}>
								<Card depth={2} color={SECONDARY_COLOR_TRANSPARENT}>
									<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', margin: 8 }}>
										<TextSubHeader2 text="Close List" />
									</View>
								</Card>
							</TouchableOpacity>
							:
							<TouchableOpacity style={{ margin: 4 }} onPress={() => setExpanded(true)}>
								<Card depth={2} color={SECONDARY_COLOR_TRANSPARENT}>
									<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', margin: 8 }}>
										<TextSubHeader2 text={`View All ${events.length} Appointments`} />
									</View>
								</Card>
							</TouchableOpacity>
					)
				}
			</View>
		</Card>
	)
}