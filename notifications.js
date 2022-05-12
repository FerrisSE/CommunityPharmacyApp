import * as Notifications from 'expo-notifications';

// needed for notifications to be pushed to user
Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

export const scheduleAdherenceNotification = async (medName, time) => {
	time.repeat = true;

	await Notifications.scheduleNotificationAsync({
		content: {
			title: medName,
			body: 'Time to take your medication',
		},
		trigger: time,
	}, medName);
}