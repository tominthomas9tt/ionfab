import { InvoiceItem } from "./invoiceitems.dto";

export class Invoice {

	public id?: number;

	public irn?: string;

	public tranDtlsTaxSch?: string;

	public tranDtlsSupTyp?: string;

	public tranDtlsRegRev?: string;

	public tranDtlsEcmGstin?: string;

	public tranDtlsIgstOnIntra?: string;

	public docDtlsTyp?: string;

	public docDtlsNo?: string;

	public docDtlsDt?: string;

	public buyerDtlsAccCode?: string;

	public buyerDtlsGstin?: string;

	public buyerDtlsLglNm?: string;

	public buyerDtlsAddr1?: string;

	public buyerDtlsAddr2?: string;

	public buyerDtlsLoc?: string;

	public buyerDtlsPin?: string;

	public buyerDtlsPos?: string;

	public buyerDtlsPh?: string;

	public buyerDtlsEm?: string;

	public dispDtlsNm?: string;

	public dispDtlsAddr1?: string;

	public dispDtlsAddr2?: string;

	public dispDtlsLoc?: string;

	public dispDtlsPin?: string;

	public dispDtlsStcd?: string;

	public shipDtlsAccCode?: string;

	public shipDtlsGstin?: string;

	public shipDtlsLglNm?: string;

	public shipDtlsTrdNm?: string;

	public shipDtlsAddr1?: string;

	public shipDtlsAddr2?: string;

	public shipDtlsLoc?: string;

	public shipDtlsPin?: string;

	public shipDtlsStcd?: string;

	public valDtlsAssVal?: number;

	public valDtlsCgstVal?: number;

	public valDtlsSgstVal?: number;

	public valDtlsIgstVal?: number;

	public valDtlsCesVal?: number;

	public valDtlsStCesVal?: number;

	public valDtlsDiscount?: number;

	public valDtlsOthChrg?: number;

	public valDtlsRndOffAmt?: number;

	public valDtlsTotInvVal?: number;

	public valDtlsTotInvValFc?: number;

	public payDtlsNm?: string;

	public payDtlsAccDet?: string;

	public payDtlsMode?: string;

	public payDtlsFinInsBr?: string;

	public payDtlsPayTerm?: string;

	public payDtlsPayInstr?: string;

	public payDtlsCrTrn?: string;

	public payDtlsDirDr?: string;

	public payDtlsCrDay?: number;

	public payDtlsPaidAmt?: number;

	public payDtlsPaymtDue?: number;

	public refDtlsInvRm?: string;

	public refDtlsDocPerdDtlsInvStDt?: string;

	public refDtlsDocPerdDtlsInvEndDt?: string;

	public refDtlsPrecDocDtlsInvNo?: string;

	public refDtlsPrecDocDtlsInvDt?: string;

	public refDtlsPrecDocDtlsOthRefNo?: string;

	public addlDocDtlsUrl?: string;

	public addlDocDtlsDocs?: string;

	public addlDocDtlsInfo?: string;

	public expDtlsShipBNo?: string;

	public expDtlsShipBDt?: string;

	public expDtlsPort?: string;

	public expDtlsRefClm?: string;

	public expDtlsForCur?: string;

	public expDtlsCntCode?: string;

	public expDtlsExpDuty?: string;

	public ewbDtlsTransId?: string;

	public ewbDtlsTransName?: string;

	public ewbDtlsDistance?: number;

	public ewbDtlsTransDocNo?: string;

	public ewbDtlsTransDocDt?: string;

	public ewbDtlsVehNo?: string;

	public ewbDtlsVehType?: string;

	public ewbDtlsTransMode?: number;

	public tpaymentId?: number;

	public financialyearId?: number;

	public orderNo?: string;

	public despatchNoteNo?: string;

	public despatchDate?: string;

	public tcsCessPercentage?: number;

	public tcsCess?: number;

	public remarks?: string;

	public minvoiceTypeId?: number;

	public minvoiceId?: number;

	public isEinvoiceGenerated?: number;

	public isEwaybillGenerated?: number;

	public createdAt?: string;
			
	public updatedAt?: string;
			
	public deletedAt?: string;

	public status?: number;

	public astatus?: number;

	public items?: InvoiceItem[];

}

export class InvoiceFilter {

	public id?: number;

	public irn?: string;

	public tranDtlsTaxSch?: string;

	public tranDtlsSupTyp?: string;

	public tranDtlsRegRev?: string;

	public tranDtlsEcmGstin?: string;

	public tranDtlsIgstOnIntra?: string;

	public docDtlsTyp?: string;

	public docDtlsNo?: string;

	public docDtlsDt?: string;

	public buyerDtlsAccCode?: string;

	public buyerDtlsGstin?: string;

	public buyerDtlsLglNm?: string;

	public buyerDtlsAddr1?: string;

	public buyerDtlsAddr2?: string;

	public buyerDtlsLoc?: string;

	public buyerDtlsPin?: string;

	public buyerDtlsPos?: string;

	public buyerDtlsPh?: string;

	public buyerDtlsEm?: string;

	public dispDtlsNm?: string;

	public dispDtlsAddr1?: string;

	public dispDtlsAddr2?: string;

	public dispDtlsLoc?: string;

	public dispDtlsPin?: string;

	public dispDtlsStcd?: string;

	public shipDtlsAccCode?: string;

	public shipDtlsGstin?: string;

	public shipDtlsLglNm?: string;

	public shipDtlsTrdNm?: string;

	public shipDtlsAddr1?: string;

	public shipDtlsAddr2?: string;

	public shipDtlsLoc?: string;

	public shipDtlsPin?: string;

	public shipDtlsStcd?: string;

	public valDtlsAssVal?: number;

	public valDtlsCgstVal?: number;

	public valDtlsSgstVal?: number;

	public valDtlsIgstVal?: number;

	public valDtlsCesVal?: number;

	public valDtlsStCesVal?: number;

	public valDtlsDiscount?: number;

	public valDtlsOthChrg?: number;

	public valDtlsRndOffAmt?: number;

	public valDtlsTotInvVal?: number;

	public valDtlsTotInvValFc?: number;

	public payDtlsNm?: string;

	public payDtlsAccDet?: string;

	public payDtlsMode?: string;

	public payDtlsFinInsBr?: string;

	public payDtlsPayTerm?: string;

	public payDtlsPayInstr?: string;

	public payDtlsCrTrn?: string;

	public payDtlsDirDr?: string;

	public payDtlsCrDay?: number;

	public payDtlsPaidAmt?: number;

	public payDtlsPaymtDue?: number;

	public refDtlsInvRm?: string;

	public refDtlsDocPerdDtlsInvStDt?: string;

	public refDtlsDocPerdDtlsInvEndDt?: string;

	public refDtlsPrecDocDtlsInvNo?: string;

	public refDtlsPrecDocDtlsInvDt?: string;

	public refDtlsPrecDocDtlsOthRefNo?: string;

	public addlDocDtlsUrl?: string;

	public addlDocDtlsDocs?: string;

	public addlDocDtlsInfo?: string;

	public expDtlsShipBNo?: string;

	public expDtlsShipBDt?: string;

	public expDtlsPort?: string;

	public expDtlsRefClm?: string;

	public expDtlsForCur?: string;

	public expDtlsCntCode?: string;

	public expDtlsExpDuty?: string;

	public ewbDtlsTransId?: string;

	public ewbDtlsTransName?: string;

	public ewbDtlsDistance?: number;

	public ewbDtlsTransDocNo?: string;

	public ewbDtlsTransDocDt?: string;

	public ewbDtlsVehNo?: string;

	public ewbDtlsVehType?: string;

	public ewbDtlsTransMode?: number;

	public tpaymentId?: number;

	public financialyearId?: number;

	public orderNo?: string;

	public despatchNoteNo?: string;

	public despatchDate?: string;

	public tcsCessPercentage?: number;

	public tcsCess?: number;

	public remarks?: string;

	public minvoiceTypeId?: number;

	public minvoiceId?: number;

	public isEinvoiceGenerated?: number;

	public isEwaybillGenerated?: number;

	public createdAt?: string;
			
	public updatedAt?: string;
			
	public deletedAt?: string;

	public status?: number;

	public astatus?: number;


	public offset?: number;

	public limit?: number;
}