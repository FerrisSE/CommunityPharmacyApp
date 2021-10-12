import React from 'react';
import { Button, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { changeStack } from '../App';
import mainStyles from '../main-styles';

const PrivacyAcceptanceScreen = ({ navigation }) => {
	return (
		<View style={{ flex: 1, padding: 20 }}>
			<Text style={mainStyles.title}>Privacy Agreement</Text>
			<Text style={[mainStyles.textImportant, { paddingBottom: 20, paddingTop: 20 }]}>Before being able to use our app, we need consent to use your medical information.</Text>
			<View style={{ flex: 10, paddingBottom: 20 }}>
				<ScrollView style={{ flexGrow: 0.2, padding: 20 }}>
					<Text>{privacyAgreementText}</Text>
				</ScrollView>
			</View>
			<View style={mainStyles.rowFull}>
				<TouchableOpacity onPress={() => { navigation.pop() }}>
					<Text style={mainStyles.textImportant}>Decline</Text>
				</TouchableOpacity>
				<Button
					title="Agree"
					onPress={() => changeStack('Main')}
				/>
			</View>

		</View>
	);
};

export default PrivacyAcceptanceScreen;

const privacyAgreementText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam odio vel risus condimentum venenatis. Ut facilisis ligula vel urna laoreet pulvinar. Vestibulum sit amet nisl quis risus varius ullamcorper gravida quis orci. In hac habitasse platea dictumst. Duis congue purus a ultricies scelerisque. Suspendisse quis egestas dolor, et elementum orci. Ut sit amet luctus risus. Nulla pretium, turpis sit amet ultrices eleifend, eros tellus condimentum felis, sed vehicula orci arcu eget ex. Morbi a diam imperdiet purus viverra auctor id ut tortor. Donec pretium commodo velit id pretium. Curabitur tempor faucibus velit a lacinia. Sed vestibulum faucibus dolor.

Ut justo sapien, viverra eu fermentum sed, posuere sit amet ex. Fusce non tellus eu odio feugiat aliquam. Vestibulum finibus convallis diam, sit amet iaculis neque lacinia ac. Suspendisse fringilla orci vel eros bibendum, at volutpat ex blandit. In mollis scelerisque viverra. Integer tempus orci sem, quis semper ligula feugiat in. Donec nec nisi placerat, hendrerit nunc nec, venenatis turpis. Proin tincidunt magna turpis, sagittis eleifend lorem faucibus eu. Integer sed purus libero. Proin eu erat a est cursus consequat. In semper nec ipsum non ultrices. Etiam ut mauris dapibus, porttitor libero eget, imperdiet ipsum. Morbi aliquet est eget ex molestie aliquam. Vestibulum tristique congue nulla, consectetur suscipit ipsum condimentum vitae. Nulla et velit dolor. Aliquam eu ante mi.

Praesent ullamcorper rutrum ipsum, pretium sollicitudin est scelerisque vel. Morbi gravida elit vel turpis eleifend maximus. Nam at interdum augue. Mauris sed elit nec lorem placerat sagittis id at neque. Curabitur libero augue, dignissim vel tortor sed, ultricies tempus sem. Donec dapibus ac leo in mollis. Nullam malesuada lobortis egestas. Donec vitae pharetra dui. Nullam ut erat urna.

Proin lacus ante, scelerisque a maximus ac, rhoncus id sem. Sed semper elit ullamcorper lorem accumsan fermentum. Sed rhoncus turpis eget iaculis aliquet. Nam eu condimentum mi. Phasellus sollicitudin, eros id auctor congue, odio dolor ornare sem, eget ornare est est sed nisl. Vestibulum euismod euismod justo, vitae tincidunt augue congue at. Vivamus interdum sollicitudin lorem et dictum. Vestibulum ullamcorper lectus ut risus vestibulum, consequat posuere urna sagittis. Pellentesque imperdiet efficitur mauris, quis efficitur dui vulputate sed. Nam facilisis efficitur sem, ut sollicitudin dui auctor sit amet. Vestibulum condimentum molestie velit, ac lobortis urna rhoncus eget.

Praesent vel interdum nisi. Nam vestibulum ante cursus, malesuada libero vel, ornare risus. Sed nec malesuada nulla. Vivamus non nisi nec purus eleifend convallis. Nam vulputate fermentum urna ut scelerisque. Vestibulum aliquam lectus a odio pharetra porta. Praesent viverra diam sed odio efficitur condimentum. Vivamus at viverra dui. Cras efficitur urna a pharetra porttitor. Suspendisse a laoreet mauris. Maecenas in efficitur sem. Nam orci mi, sodales at hendrerit quis, tincidunt eget leo. Duis interdum odio ac tristique semper. Duis tortor ante, egestas gravida blandit quis, feugiat vitae dolor. Cras eleifend, mauris a convallis facilisis, lacus sem pharetra lacus, quis laoreet dolor sem sit amet sapien.

Nullam viverra nibh condimentum velit ultricies, molestie scelerisque ligula accumsan. Pellentesque a hendrerit arcu. In ac malesuada dui. Aliquam ultrices, ipsum eget volutpat ullamcorper, urna urna fringilla arcu, porta aliquet nibh sem vel elit. Nullam porttitor leo in diam euismod imperdiet. Integer bibendum venenatis lorem non blandit. Aenean id est et nisi aliquet blandit. Nam id nisl quis purus malesuada suscipit et nec magna. Nam dui magna, luctus at cursus id, ullamcorper a nunc. In egestas turpis urna, vitae iaculis velit convallis ut. Nullam hendrerit, massa sit amet malesuada ornare, risus urna congue lacus, non interdum nunc risus tristique augue. Quisque dapibus quam metus. Phasellus lacinia tristique nulla, blandit dignissim felis aliquet eu. Nam consequat velit quis maximus consectetur. Integer non tempor augue, a dictum ante.

Vestibulum molestie arcu felis, at gravida leo lacinia sed. Curabitur a bibendum justo. Integer gravida ligula vitae sapien venenatis venenatis. Phasellus aliquet ultricies nisi a ultricies. Praesent quis lectus metus. Fusce in elit risus. Morbi rutrum mollis turpis, at dignissim nisl accumsan non. Ut ac molestie lectus. Curabitur vitae ultricies tellus, sit amet sagittis arcu. Mauris vulputate placerat purus a cursus. Vestibulum fermentum lacus elit, a tempus tellus porttitor in. Maecenas vel scelerisque nisi, et tristique mi. Duis in lorem in mauris ullamcorper porttitor. Mauris a purus enim.

Aenean viverra urna vitae risus lobortis ultrices. Vestibulum auctor, turpis vel fringilla scelerisque, lacus velit molestie augue, at ultricies nunc diam nec lorem. Phasellus volutpat tellus non varius gravida. Nam fringilla at felis ac pulvinar. Duis cursus iaculis enim sit amet bibendum. Vivamus id egestas mauris. Proin id arcu id magna auctor elementum.

Maecenas ornare elementum malesuada. Curabitur id placerat nibh, sed maximus magna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque pharetra dui eu arcu varius tempor quis in risus. Suspendisse malesuada risus ipsum, id consequat justo interdum ac. Sed vitae efficitur neque, eu maximus nunc. In eget odio facilisis, malesuada odio et, mollis quam. Curabitur vehicula nisi quis tempor consectetur. Nam non molestie arcu, eget scelerisque mi. Donec lacinia purus egestas turpis pretium hendrerit. Sed viverra dapibus nisi quis luctus. In pellentesque molestie mi.

Fusce non sodales nunc, id tincidunt diam. Phasellus vestibulum dolor at risus auctor dignissim. Nunc ex risus, cursus et congue commodo, ullamcorper nec lectus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc lacinia mauris non dolor feugiat, non molestie nulla ultrices. Duis molestie, tortor eu ultrices tempor, leo sapien sagittis elit, vel pretium tortor erat eu metus. Fusce est nisi, viverra at ex nec, tempor viverra leo.`