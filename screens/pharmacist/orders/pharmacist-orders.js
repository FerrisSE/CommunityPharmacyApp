import axios from "axios"
import { useEffect, useState } from "react"
import { ScrollView, View } from "react-native"
import { useSelector } from "react-redux"
import { PRIMARY_COLOR, PRIMARY_COLOR_TRANSPARENT, SECONDARY_COLOR, WHITE } from "../../../colors"
import { PrimaryButton } from "../../../components/buttons"
import { Card } from "../../../components/cards"
import { TextHeader2, TextHeader1, TextSubHeader2, TextBody } from "../../../components/text"
import { SERVER_URL } from "../../../constants"
import { LoadingScreen } from "../../../loading-screen"

export const PharmacistOrdersScreen = () => {
	const [loading, setLoading] = useState(true);
	const [orders, setOrders] = useState([]);

	const userToken = useSelector((state) => state.userToken.value);

	let loadOrders = async () => {
		let config = {
			method: 'get',
			url: `${SERVER_URL}/provider/orders`,
			headers: {
				Authorization: userToken,
			}
		};

		let data = (await axios(config)).data;
		setOrders(data);
		setLoading(false);
	}

	useEffect(async () => {
		loadOrders();
	}, []);

	return (
		<View style={{ width: "100%", height: "100%", padding: 32 }}>
			<TextHeader2 text="Orders" style={{ marginBottom: 8 }} />
			<Card style={{ flex: 1, padding: 32 }} depth={0}>
				<TextHeader1 text="Pharmacy Orders" />

				<Card depth={1} color={WHITE} style={{
					flex: 1,
					width: '100%',
					marginTop: 10,
				}}>
					<View style={{ flexDirection: 'row', alignContent: 'center' }}>
						<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
							{/* Top Row*/}
							<RowHeader text="Received" />
							<RowHeader text="Patient Name" />
							<RowHeader text="Prescription" />
							<RowHeader text="Status" />
							<RowHeader text="Notify" />
							<RowHeader text="Release" />
						</View>
					</View>
					{/* Divider */}
					<View style={{ width: '100%', padding: 1, marginTop: 8, marginBottom: 8, backgroundColor: PRIMARY_COLOR }}>
					</View>

					{loading ?
						<LoadingScreen />
						:
						<ScrollView>
							{/* Remaining List */}
							{orders.map((o, i) => <Row data={o} key={i} />)}
						</ScrollView>
					}

				</Card >

			</Card>
		</View>
	)
}

const RowHeader = ({ text }) => {
	return (
		<View style={{ flex: 1, padding: 4, alignItems: 'center', justifyContent: 'center' }}>
			<TextSubHeader2 text={text} style={{ color: PRIMARY_COLOR }} />
		</View>
	)
}

const RowBody = ({ text }) => {
	return (
		<View style={{ flex: 1, padding: 2, alignItems: 'center', justifyContent: 'center' }}>
			<TextBody text={text} />
		</View>
	)
}

const Row = ({ data }) => {
	return (
		<View>
			<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
				<RowBody text={data.createTime} />
				<RowBody text={data.patientName} />
				<RowBody text={data.medicationName} />
				<RowBody text={data.status} />

				<View style={{ flex: 1, padding: 2, alignItems: 'center', justifyContent: 'center' }}>
					{data.status == "Ready" &&
						<PrimaryButton label="Notify Again" />
					}
				</View>

				<View style={{ flex: 1, padding: 2, alignItems: 'center', justifyContent: 'center' }}>
					{data.status == "Approved" &&
						<PrimaryButton label="Ready" style={{ backgroundColor: SECONDARY_COLOR }} />
					}
				</View>
			</View>
			{/* Divider */}
			<View style={{ width: '100%', padding: 1, marginTop: 8, marginBottom: 8, backgroundColor: PRIMARY_COLOR_TRANSPARENT }}>
			</View>
		</View>
	)
}