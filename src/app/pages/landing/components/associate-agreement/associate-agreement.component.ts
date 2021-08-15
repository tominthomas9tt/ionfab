import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-associate-agreement',
  templateUrl: './associate-agreement.component.html',
  styleUrls: ['./associate-agreement.component.scss'],
})
export class AssociateAgreementComponent implements OnInit {


  whereases = [
    `FSI is a company which bridge between Service/Products provider
and the customer and as a computer/ mobile application software,
which will through the internet, display details of service provider,
enable customers to select service provider of their choice and will
similarly enable service provider to accept the request from the
customer, act according to quotation provided and as per the
appointment scheduled and give service to the customer and
become more easily accessible to customers through computer/mobile application.`,
    `The Service Providers name, contact details and professional details
as provided by the Service Provider are as per the online registered
data and FSI would like to include the Service provider among the
services listed in the App/Website since it would enhance the
credibility and the usefulness of the App/Website.`,
    `The Service Provider is agreeable to be listed on the App/Website of
FSI since such listing helps the Service Provider to reach out to more
customers and thus enable to have more business.`,
    `FSI and the Service Providers have reached an Agreement with
regard to the listing of the Services on the App/Website and the
manner in which FSI and the Service Provider will make use of this
Said App/Website.`,
    `The parties hereto wish to put down in writing the terms and
conditions of the above mentioned agreement reached between
themselves.`];
  nows = [`The Service Provider hereby gives consent to FSI for the listing of
the services in the App/Website of FSI (which listing is
hereinafter referred to as the 'Listing’).`,
    `The Service Provider has provided to FSI, all the details and
information required by FSI in connection with the Listing of the
Service provider/Services on the App/Website and the details
and information are stated in the Schedule hereto and are
hereinafter referred to as the Service Provider Profile.`,
    `The Service Provider undertakes and confirms that all the
information provided by the Service Provider in the Service
Provider Profile, for the purpose of the Listing, would be true
and accurate.`,
    `FSI agrees to list the Service Provider Profile on the App/Website
so that customers will be made aware of the service provided by
the Service Provider and can provide quote, agree on rates with
mutual consent and fix an appointment to schedule the scope
of work with the Service Provider, through the said
App/Website.`,
    `FSI hereby grant a license and permission to the Service Provider
to use all the facilities provided by the App/Website, But once
the job order is confirmed the Service Provider cannot cancel the
services without mutual consent with the customer during the
period these Agreement is in force and in accordance with the
terms and conditions of this Agreement.`,
    `The Service Provider agrees and confirms that it shall be
responsibility of the Service Provider to use a mobile
phone/Computer which is compatible with the system and
software of the App and which will enable the Service Provides
and its employees to download, access and use the
App/Website.`,
    `The Service Provider understands and agrees that while the
Service Provider will be charged for being listed in the
App/Website and all operator charges including telecom and
internet service provider charges for accessing and using the
App/Website shall payable only by the Service Provider.`,
    `The Service Provider agrees that the , use of the App on the
Service Provider mobile device or computer is at the Service
Provider own risk and FSI will not be responsible for any
malfunction on the mobile device or computer or any loss of
data on account of the use by the Service Provider of the
App/Website.`,
    `The Service Provider undertakes that the Service Provider would
be liable for any loss or harm suffered by FSI due to any wrong
information provided by the Service Provider to FSI, in
connection with the Service Provider’s Profile or the Listing of
the Service Provider on the Said App/Website.`,
    `The Service Provider states and confirms that the Service
Provider shall handle all the customers which the Service
Provider gets through App/Website with a great degree of care,
respect and consideration, apart from providing high standard &amp;
quality services.`,
    `The Service Provider undertakes to ensure that all the service
requests from the customer shall be promptly dealt with.`,
    `The Service Provider confirms that the Service Provider shall be
solely and wholly responsible for any complaints made by the
customer, arising out non fulfillment of the service request as
per the scope of quotation.`,
    `The Service Provider undertakes to ensure confidentiality of all
the information provided by the customers to the Service
Provider and shall not disclose any particulars of the customers,
without obtaining the prior written approval of the FSI.`,
    `The Service Provider undertakes and confirms that once an
appointment is confirmed by the Service Provider through the
App/Website, to the customer, the Service Provider shall ensure
that the customers are provided the right quotation as per the
scope of work and the work will be attended at the time
confirmed in the Appointment. In the event, due to the
unavoidable circumstances the Service Provider is unable to
provide the service to the customer at the time confirmed in the
appointment, the Service Provider shall inform the customer
well in advance and will reschedule the appointment with
mutual consent with the customers. Otherwise the service
provider will be penalized as per FSI policy.`,
    `FSI shall ensure that the information given by the Service
Provider for the Service Provider Profile and for the Listing on
the App/Website is not changed except with the prior written
consent of the Service Provider. However the Service Provider
agrees that the FSI is entitled to condense the information
provided by the Service Provider or to rearrange the manner or
the order of presentation as long as the meaning conveyed
remains the same, as provided by the Service Provider.`,
    `The Service Provider undertakes to inform FSI of any changes in
the Service Provider Profile and/or information or details
provided for the Listing, as soon as such change takes place as
the changes have to be carried out in the Service Provider profile
without delay by FSI so that the customers are not in any way
misguided or given wrong information.`,
    `FSI undertakes to update any changes provided by the Service
Provider, for the Service Provider Profile or for Listing, as soon as
possible after receipt of such information, from the Service
Provider.`,
    `FSI agrees to provide the Listing, in the App/Website, to the
Service Provider, with payment required to be made by the
Service Provider.`,
    `FSI offers its service provider to pay through either mobile
wallet, online using net banking/ debit card or other online
service provided in the App/Web application. FSI expressly
claims no responsibility of refund for payment made by cash.
Service provider is liable to pay subscription fee to FSI along
with the subscription process. Subscription will not be complete
without payment of subscription fee. FSI takes no responsibility
for subscription fee is paid to any FSI associate
/persons/companies or we have no control over payments made
in cash to any FSI associate /persons/companies other than what
is agreed as per subscription charges. Hence it is important that
payments to be made directly to FSI via online payment options
available on the platform. We discourage any tips or reward to
any FSI associate /persons/companies however if any customer
is doing so is completely based on their own will and decision.`,
    `If the money gets deducted from the user account and the
payment is not reflected in the application, you are requested to
contact the FSI customer care support Your payment will be
reflected within 48 hours if the transaction is successful at the
payment gateway service provider. If your payment status is not
updated in the given time frame, please contact the bank for
further enquiries, FSI does not take responsibility on such cases
and payment will reflect in your bank account as per Bank&#39;s TAT.`,
    `Customer are requested to provide valid, accurate and complete
information about your identity, payment account details (Card
information, Bank account information, wallet credentials), Biller
information and the payment information (payment amount and
transaction description). FSI reserves the right to terminate user
account or refuse your current and future use of service in case
your information found suspicious.`,

    `FSI assumes no responsibility and shall incur no liability if it is
unable to affect any Payment Instruction(s) on the Payment Date
owing to any one or more of the following circumstances;
o If the Payment Instruction(s) issued by you is/are incomplete,
inaccurate, invalid.
o If the Payment Account has insufficient funds/limits to cover for
the amount as mentioned in the Payment Instruction(s)
o If your Bank or the wallet service refuses or delays honoring the
Payment Instruction(s)
o If payment is not processed by biller upon receipt.
o If the user crosses transaction limit/amount limit decided by
wallet services, payment gateways and banks.  
o Circumstances beyond the control of FSI, including natural
calamities, issues with payment system, power failures etc.
o Customer must ensure seamless internet connectivity and must
have all equipment necessary to make such connection to the
World Wide Web, including a computer and modem or other
access device. Customer is soley responsible any fees associated
with access to World Wide Web, directly or indirectly access to
web content.`,
    `Either Party shall have the right to terminate this Agreement at
any time, without any reason required to be given, by providing
30 days notice in writing to the other Party.`,
    `The Service Provider agrees that in the event of the termination
of this Agreement, by either Party, the Service Provider shall
continue to honour any commitments already made in terms of
appointments, with the customer, unless such appointments are
cancelled by the customer or by FSI.`,
    `The Service Provider agrees and confirms that the collection of
all service charges except the charges of the material shall be
taken from the customer through the App/Website and FSI in
turn will reimburse the amount to the service provider after
deducting the service fee of 15% on the net realised amount
from the customer within 15 days of receipt of the payment. If
the total payable by FSI to the Service provider exceeds above
10000/ the payment will be disbursed within 7 days .`,
    `That FSI is permitted to, request for feed back through the
App/Website, from the customers, with regard to the quality of
the services provided by the Service Provider and that such
customers reviews and/or feedback can be posted by the
customers in the App/Website. FSI agrees that if the Service
Provider informs FSI that any statement on review found on the
App/Website about the Service Provider is false, defamatory on
objectionable, then FSI shall remove such matter from the
App/Website.`,
    `FSI as the full right to delist or downgrade the Service provider if
the service rating fall below the 4+ rating for 2 times in an year.`,
    `The Service Provider agrees that if any consumer complaints,
criminal complaints or civil suits are filed in connection with the
services provided by the Service Provider, then the Service
Provider shall be wholly and solely liable for putting up a defense
in the matter and for paying any compensation or damages and
to suffer any punishment that may be awarded by the
appropriate Courts.`,
    `Warranty for the workmanship is 30 days from the date of work
completion.`,
    `The Service Provider agrees and confirms that the Service
Provider shall personally render to the customers, the services
for which the appointment has been made and shall not
delegate such duties to any other Service provider, unless such
other Service Provider is also listed in the App/Website and the
prior consent of the customer/FSI is obtained to such change of
Service Provider.`,
    `The Service Provider agrees and confirms that in the event the
Service Provider has any complaint against any of the customers,
it shall be the sole responsibility of the Service Provider to take
necessary legal action to obtain a suitable remedy and that FSI
shall have no responsibility or liability in this regard.`,
    `The Service Provider agrees to indemnify and keep harmless FSI,
against all claims, losses, harm or damages caused to FSI due to
any fault or negligence of the Service Provider at the time of
providing the service to the customers.`,
    `The Service Provider confirms that if any of the customers does
not adhere the appointment, FSI shall have no financial or any
other liability to the Service Provider in this regard.`,
    `This Agreement is complete and sets forth the entire Agreement
between the Parties with respect to the subject matter hereof
and supersedes any other agreements/ understandings, written
or oral, in respect of the subject matter hereof. Any amendment
or variation to this Agreement shall be valid only if it is in writing
and signed by both the Parties.`,
    `The Service Provider understands and agrees that FSI is a
NETWORK SERVICE PROVIDER and an INTERMEDIARY within the
meaning of Sec. 79 of the Indian Information Technology Act,
2000 and that FSI merely provides a medium to its Registered
Users to avail services with the Service Provider. All the
information posted therein are third party user generated
content. FSI neither initiates the transmission nor selects the
sender and receiver of the transmission nor selects /modifies the
information contained in the transmission. FSI has no control
over the third party user generated content and shall not be
liable for such content.`,
    `The Service Provider hereby indemnifies and agrees to defend
and hold harmless, FSI and their directors, officers, employees,
subscribers and users (the “Indemnitees”), from and against any
and all losses, damages, penalties, fines, judgments, settlements,
orders, decrees, costs, and expenses (including, without
limitation, reasonable attorneys’ and court/tribunal fees) for any
third party claim or action brought against the Indemnities, in
relation to any breach or alleged breach by the Service Provider
of any terms and conditions of this Agreement. The Service
Provider indemnification obligation and the Indemnities right to
be indemnified herein shall survive any expiry or early
termination of this Agreement.`,
    `This Agreement is executed in two counterparts, each of which
shall be deemed to be an original and both of which together
shall constitute one and the same instrument.`,
    `No failure or delay on the part of any of the Parties to this
Agreement relating to the exercise of any right, privilege or
remedy provided under this Agreement shall operate as a waiver
of such right, power, privilege or remedy or as a waiver of any
preceding or succeeding breach by the other party to this
Agreement, nor shall any single or partial exercise of any right,
power, privilege or remedy preclude any other or further
exercise of any right, power privilege or remedy provided in this
Agreement, all of which are several and cumulative, and are not
exclusive of each other, or of any other rights or remedies
otherwise available to a Party at law or in equity.`,
    `In the event that any provision hereof shall be held to be invalid
or unenforceable due to any reason, the provision shall be
modified to the extent necessary, and in any event, such
invalidity or unenforceability shall have no effect upon the
remaining provisions or terms and conditions hereof.`,
    `Any remedies, rights, undertakings and obligations contained in
this Agreement shall be cumulative and none of them shall be in
limitation of any other remedy, right, undertaking, or obligation
of either party.`,
    `This Agreement shall be governed by and construed in
accordance with the laws of India.`,
    `Resolution of Disputes- Any disputes or differences with may
arise between the parties or their authorized representatives,
with regard  to construction, meaning and effect of this instant
agreement or parts thereof, or rights  and liabilities  of the 
parties  or other matter  relating  to this agreement  shall in the
first instance  be sought to be resolved through  mutual
discussions. Any unresolved dispute shall be  referred to
arbitration of a sole arbitrator to the mutually  agreed upon by
the parties, and on failure to reach such an agreement  within a
period of 7  days of notice from one party to the other on the
nomination of the Sole Arbitrator , the arbitrator/s shall be got
appointed through the Honorable High Court of Kerala. The
decision of the arbitrator  on the dispute shall be final and
binding upon the parties. This clause shall be deemed to be a
submission to arbitration within the meaning  of the Arbitrator
and Conciliation Act 1996, including  any statutory  modifications
and re-enactment thereof. The initial cost of such arbitration 
proceedings shall be share equally by the parties, and  finally  to
be borne  by the party/parties  as determined by the arbitrator .
The arbitration proceedings shall be conducted  in  English.  The
place of arbitration shall be Ernakulam to the exclusion of all
other places and jurisdictions. Parties agree that only civil courts
at Ernakulam to the exclusion of all other places and jurisdictions
shall have jurisdiction to adjudicate  any matter relating  to this
agreement  or the arbitration. The parties and understand that
this clause  accepting Arbitration for settlement of disputes is
only within reference  to the matters constrained in this
agreement and cannot be and shall not be extended to any
matter not falling  within the terms  of this agreement  and
cannot be  extended or assumed or construed to extend to the
terms  of any other agreement that the parties may among
themselves  or jointly with any other person/s may agree
thereafter.
   `];

  constructor() { }

  ngOnInit() { }

}
