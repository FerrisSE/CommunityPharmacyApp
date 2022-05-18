import { View } from "react-native"
import SchedulingButton from "./scheduling-card-button"

export const RenderServicesGrid = ({ items, navigation, itemsPerRow, onPress }) => {
	return (
		<View style={{
			width: '100%',
			marginTop: 10,
			flex: 1,
			flexDirection: 'row',
			flexWrap: 'wrap',
			justifyContent: 'flex-start',
		}}>
			{items.map(s => (
				< SchedulingButton icon={s.icon} label={s.name} width={(1.0 / itemsPerRow) * 100.0} key={s.name} onClicked={() => onPress(s)} />
			))}
		</View>
	)
}