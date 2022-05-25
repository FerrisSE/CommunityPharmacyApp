import { Platform } from "react-native"

// url for the backend on web
export const SERVER_URL = Platform.select({
	ios: "http://10.0.2.2:8080",
	android: "http://10.0.0.130:8080",
	default: "http://localhost:8080"
});

export const TIMEOUT = 10_000; // 10 seconds