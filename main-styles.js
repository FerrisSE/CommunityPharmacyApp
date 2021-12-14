import { StyleSheet } from "react-native";

const mainStyles = StyleSheet.create({
	title: {
		fontWeight: "bold",
		fontSize: 48
	},
	subheader: {
		fontWeight: "bold",
		fontSize: 24
	},
	textImportant: {
		fontWeight: "bold",
		fontSize: 16,
	},
	textInput: {
		fontSize: 18,
		padding: 10,
		margin: 16,
		backgroundColor: "#e0e0e0",
		borderRadius: 8,
	},
	center: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	container: {
		margin: 20,
	},
	row: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center"
	},
	rowSpaced: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	rowFull: {
		margin: 10,
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center"
	},
	CardView: {
		alignItems: 'stretch',
		justifyContent: 'center',
		backgroundColor: "white",
		borderRadius: 12,
		shadowColor: "black",
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 6,
		flexDirection: 'column',
		justifyContent: 'space-between',
		paddingLeft: 16,
		paddingRight: 16,
		paddingTop: 16,
		paddingBottom: 16,
		marginTop: 8,
		marginBottom: 8,
		marginLeft: 16,
		marginRight: 16,
	},
	CardTitle: {
		fontWeight: "bold",
		fontSize: 32
	},
	CardSubtitle: {
		fontSize: 24
	},
	CardSubView: {
		backgroundColor: "#f4f4f4",
		padding: 12,
		margin: 6,
		borderRadius: 4,
	}
});

export default mainStyles;