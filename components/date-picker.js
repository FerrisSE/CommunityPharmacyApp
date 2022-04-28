import { Platform, Text, TextInput, View, Pressable } from "react-native"
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { GRAY_1, PRIMARY_COLOR, PRIMARY_COLOR_TRANSPARENT } from "../colors";

export const DatePicker = ({ minimumDate, maximumDate, date, setDate, style }) => {
	const [mobileDate, setMobileDate] = useState('');
	const [open, setOpen] = useState(false);
	const inputRef = useRef();

	useEffect(() => {
		if (inputRef?.current) {
			inputRef?.current?.setNativeProps({
				type: 'date',
				min: format(minimumDate, 'yyyy-MM-dd'),
				max: format(maximumDate, 'yyyy-MM-dd'),
				pattern: 'd{4}-d{2}-d{2}',
			})
		}
	}, [inputRef?.current]);

	const onChange = (selectedDate) => {
		setDate(selectedDate);
	};

	const mobileChange = (event, selectedDate) => {
		let newDate = format(selectedDate, 'yyyy-MM-dd');
		setDate(newDate);
		setMobileDate(newDate);
		setOpen(false);
	}

	if (Platform.OS == 'web') {
		return (
			<TextInput
				ref={inputRef}
				onChangeText={onChange}
				type="date"
				style={[{
					fontFamily: 'OpenSans-Regular',
					fontSize: 18,
					padding: 10,
					margin: 16,
					backgroundColor: PRIMARY_COLOR_TRANSPARENT,
					color: GRAY_1,
					borderColor: PRIMARY_COLOR,
					paddingLeft: 32,
					borderRadius: 25,
				}, { ...style }]}
			/>
		)
	} else {
		return (
			<View>
				<Pressable onPress={() => setOpen(true)}>
					<Text
						style={[{
							fontFamily: 'OpenSans-Regular',
							fontSize: 18,
							padding: 10,
							margin: 16,
							backgroundColor: PRIMARY_COLOR_TRANSPARENT,
							color: GRAY_1,
							borderColor: PRIMARY_COLOR,
							paddingLeft: 32,
							borderRadius: 25,
						}, { ...style }]}>
						{mobileDate}
					</Text>
				</Pressable>

				{open &&
					<DateTimePicker
						testID="dateTimePicker"
						value={new Date()}
						onChange={mobileChange}
						mode={'date'}
					/>
				}
			</View>
		)
	}
}