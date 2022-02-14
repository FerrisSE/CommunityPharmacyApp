import React, { useState } from "react";
import { Card } from "./cards";
import { TextSubHeader2 } from "./text";
import { TouchableOpacity, View } from "react-native";

const DefaultCountShown = 2;

export const UpcomingEvents = ({ events }) => {
	let [expanded, setExpanded] = useState(false);

	let shownEvents = events.slice(0, expanded ? events.length : DefaultCountShown);

	return (
		<Card depth={1} color='secondary'>
			<View>

				{ // show list of events
					shownEvents.map(e =>
						<Card depth={2} color='secondary' style={{ margin: 4 }}>
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

				{ // show either collapse or expand button
					expanded ?
						<TouchableOpacity style={{ margin: 4 }} onPress={() => setExpanded(false)}>
							<Card depth={2} color='secondary'>
								<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', margin: 8 }}>
									<TextSubHeader2 text="Close List" />
								</View>
							</Card>
						</TouchableOpacity>
						:
						<TouchableOpacity style={{ margin: 4 }} onPress={() => setExpanded(true)}>
							<Card depth={2} color='secondary'>
								<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', margin: 8 }}>
									<TextSubHeader2 text={`View All ${events.length} Appointments`} />
								</View>
							</Card>
						</TouchableOpacity>
				}
			</View>
		</Card>
	)
}