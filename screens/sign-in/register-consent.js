import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { changeStack } from '../../App.js';
import { PRIMARY_COLOR } from '../../colors.js';
import { OutlineButton, PrimaryButton } from '../../components/buttons.js';
import { TextHeader1, TextSubHeader2 } from '../../components/text.js';

export const RegisterConsentFormScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={{ flex: 1, padding: 20, marginTop: 20 }}>
			<TextHeader1 text="Privacy Consent Form" />
			<TextSubHeader2 text="Before being able to use our app, we need consent to use your medical information." style={{ paddingBottom: 20, paddingTop: 20 }} />
			<View style={{ flex: 10, paddingBottom: 20 }}>
				<ScrollView style={{ padding: 20 }}>
					<Text>{privacyAgreementText}</Text>
				</ScrollView>
			</View>
			<View style={{
				margin: 10,
				flex: 1,
				flexDirection: "row",
				justifyContent: "space-around",
				alignItems: "center"
			}}>
				<OutlineButton label="Decline" onPress={() => navigation.pop()} color={PRIMARY_COLOR} />
				<PrimaryButton label="Agree" style={{ paddingLeft: 24, paddingRight: 24 }} onPress={() => navigation.popToTop()} />
			</View>

		</SafeAreaView>
	);
};

const privacyAgreementText =
	`NOTICE OF NONDISCRIMINATION:
Spectrum Health complies with applicable federal civil rights laws and does not discriminate on the basis of race, color, national origin, age, disability, or sex. Spectrum Health does not exclude people or treat them differently because of race, color, national origin, age, disability, or sex or any other basis prohibited by law.

I AGREE:
• To examination and treatment by providers, residents, students, and other healthcare professionals at Spectrum Health. This may include in-person, shared medical appointment, telemedicine, videotaping, photographing and audio devices. These tools may be used to treat/diagnose or for procedures to be performed for medical, scientific and/or personal safety.  
• As discussed and agreed, the provider may change my and/or my child’s care to benefit my life or health.
• If I am here to give birth, the provider and other healthcare professionals may give care to my baby.
• If I am participating in a shared medical appointment, I will attend this appointment with other patients. During these appointments, personal information about me may be shared by my provider to others.

I UNDERSTAND THAT:
• I will ask questions.
• No one has made promises or guarantees about the results of my treatment or care. I am aware the practice of medicine and surgery is not an exact science. No guarantees have been made to me as a result of my treatment or examination at Spectrum Health.
• Students and staff may see me and look at my medical record for teaching or research purposes.
• The staff will double-check who I am. They will ask what I am having done. This is to protect me.      
• Some providers and staff are not employees of Spectrum Health. I know that Spectrum Health is not responsible for their care or other actions. I also know I will receive separate bills from them even though they provide services to me at a Spectrum Health location. I will work with their offices to answer questions about my insurance.
• Michigan law allows healthcare providers to test my blood for HIV (AIDS virus) or Hepatitis without my consent if someone who has helped in my care is exposed to my blood or body fluids.
• A copy of the Spectrum Health Financial Assistance Eligibility Policy is available upon request at all registration areas and on our website at www.spectrumhealth.org.
• Spectrum Health will not tolerate discrimination against my provider, other healthcare professionals or staff because of race, color, gender, national origin, age, disability, sex or any other basis prohibited by federal, state or local law.
• Should my condition require referral to a specialist, I understand I will be asked my choice of a provider. I will have the opportunity to have Spectrum Health contact the provider of my choice or if I do not have a preference, an independent provider from Spectrum Health’s “on-call” list will be called. I consent to my insurance company billing for professional services given by this provider whether or not this provider participates with my insurance program.
• This consent is valid for one (1) year from the date of my signature.

MY MEDICAL INFORMATION:
• SPECTRUM HEALTH MAY RELEASE MY MEDICAL INFORMATION TO:
• Insurance companies, health plans and administrators for payment of services I or my child receive(s).
• Government agencies like Medicare and Medicaid or as required by law.
• My providers and others involved in my care now or in the future.
• My employer, if the records are related to care or services paid for by my employer, or for other purposes that are allowed under law.
• Any person or entity responsible to pay all or part of my bill.
• I agree that Spectrum Health can take my or my child’s picture and save it to my electronic medical record. I understand that Spectrum Health will use this picture for identification purposes with the goal of improving patient experience.
• I understand Spectrum Health will keep my or my child’s medical information according to state law, federal law and policy. I also understand that my medical information may be stored electronically and may be sent to or received from other healthcare providers and/or payers electronically. This includes my diagnosis (what is wrong with me), treatments (what we are doing to do make me better), and medicine or prescription information. This may also include details about my mental health, infectious diseases (like HIV), and other problems like drug or alcohol use disorder.  
• In some cases, Spectrum Health is required by law to report medical information to an agency like the health department. This may include information about HIV, TB and other diseases.
• If I am transferred to another facility, Spectrum Health’s providers/resident providers may access my medical records to follow up on my care and/or use the information for medical research.

PRIVACY NOTICE
• I have rights and responsibilities when I or my child receive(s) services. Spectrum Health has given me its Notice of Privacy Practices, and I have had an opportunity to ask questions about the information in the Notice.

VALUABLES
• Spectrum Health would like its patients to leave valuables at home or with family members. I agree Spectrum Health is not responsible for safeguarding my property.

PATIENT RIGHTS AND GRIEVANCES
• I understand that I may submit a concern or complaint without fear of reprisal or retaliation. But, efforts will be made to resolve my concern promptly or within seven (7) days, if possible. If I have questions about my rights as a patient, I am free to ask questions. The number to call is 269.983.8624 (Spectrum Health Lakeland) or 855.613.2262 (all other Spectrum Health locations).

CONSENT TO CALL
• I have given residential and/or cellular telephone numbers and an email address to Spectrum Health. I consent to receive autodialed and/or pre-recorded telephone calls, text messages and/or emails from Spectrum Health and/or its agents/third parties. These communications may include billing. I am responsible for any communication charges from my phone provider(s). I can still be treated even if I do not give “consent to call”.  

AUTHORIZATION TO RECEIVE PAYMENT AND BILLING
• Spectrum Health is authorized to seek payment from any third party and from me. I authorize Spectrum Health to act on my behalf to collect benefits from any third party and endorse checks payable to me and/or Spectrum Health. 
• I authorize any insurance company, responsible for payment of my medical care and treatment, to pay Spectrum Health for the services given. I understand that I am responsible for any charges not covered by insurance.
• I request payment due to me of authorized Medicare benefits be paid (on my behalf) to Spectrum Health for any services provided to me by Spectrum Health or in its facilities.
• I agree that if my account is not paid when due, the hospital may retain a lawyer and/or collection agency for collection. I will be responsible to reimburse the hospital for all costs, charges and fees associated with the collection of the amount due. This includes, but not limited to, reasonable interest, legal cost in the event suit is filed and reasonable lawyer fees and/or reasonable collection agency fees including those based on a percentage of the debt.
• If you do not want us to bill your insurance, you must notify us at the time of service.

ASSIGNMENT
• I assign Spectrum Health:
• All benefits, claims, and any and all other rights, including the right to bill and talk to any third party for the purpose of seeking payment, regarding my charges at Spectrum Health.
• The right to file suit or intervene in any lawsuit or proceeding which involves my charges at Spectrum Health.
• The right to take any other action to seek payment of my charges at Spectrum Health.
• This assignment includes, but is not limited to, the right to appeal the denial of payment of my Spectrum Health charges from any payer, including any employer-sponsored benefit plan, insurance policy or insurance coverage provided by law or contract. 
• I also assign to Spectrum Health, and agree that I waive, any and all rights to settle, release or retain payment of my Spectrum Health charges, or take any other action which would in any way compromise payment or reimbursement of my Spectrum Health charges.  
• I also appoint Spectrum health as my authorized representative for the purpose of pursuing payment for my Spectrum Health charges. I authorize Spectrum Health to act on my behalf to pursue any benefit claim, including one under Employee Retirement Income Security Act of 1974, and to appeal an adverse benefit determination. I agree to assist Spectrum Health in the pursuit of all insurance benefits and agree to pay all co-insurance, co-payments and deductibles required by any insurance plan.
• I authorize and direct Spectrum Health to apply the proceeds of any recovery to my Spectrum Health charges.`