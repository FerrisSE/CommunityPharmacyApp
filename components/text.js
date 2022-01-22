import React from "react";
import { StyleSheet, Text } from "react-native";
import { BLACK, GRAY_3 } from "../colors";

export const TextHeader1 = ({ text, style }) => {
	return (
		<Text style={[styles.Header1, { ...style }]}>
			{text}
		</Text>
	)
};

export const TextHeader2 = ({ text, style }) => {
	return (
		<Text style={[styles.Header2, { ...style }]}>
			{text}
		</Text>
	)
};

export const TextHeader3 = ({ text, style }) => {
	return (
		<Text style={[styles.Header3, { ...style }]}>
			{text}
		</Text>
	)
};

export const TextSubHeader1 = ({ text, style }) => {
	return (
		<Text style={[styles.SubHeader1, { ...style }]}>
			{text}
		</Text>
	)
};

export const TextSubHeader2 = ({ text, style }) => {
	return (
		<Text style={[styles.SubHeader2, { ...style }]}>
			{text}
		</Text>
	)
};

export const TextBody = ({ text, style }) => {
	return (
		<Text style={[styles.Body, { ...style }]}>
			{text}
		</Text>
	)
};

export const TextNote = ({ text, style }) => {
	return (
		<Text style={[styles.Note, { ...style }]}>
			{text}
		</Text>
	)
};

const styles = StyleSheet.create({
	Header1: {
		fontFamily: "Open Sans SemiBold",
		fontSize: 48,
		color: BLACK,
	},
	Header2: {
		fontFamily: "Open Sans",
		fontWeight: "bold",
		fontSize: 36,
		color: BLACK,
	},
	Header3: {
		fontFamily: "Open Sans SemiBold",
		fontSize: 24,
		color: BLACK,
	},
	SubHeader1: {
		fontFamily: "Open Sans",
		fontWeight: "bold",
		fontSize: 20,
		color: BLACK,
	},
	SubHeader2: {
		fontFamily: "Open Sans SemiBold",
		fontSize: 16,
		color: BLACK,
	},
	Body: {
		fontFamily: "Open Sans Regular",
		fontSize: 14,
		color: BLACK,
	},
	Note: {
		fontFamily: "Open Sans Light",
		fontSize: 14,
		color: BLACK,
		color: GRAY_3,
	},
});