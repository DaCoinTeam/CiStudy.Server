import { Injectable } from "@nestjs/common"
import { Request } from "express"
import crypto from "crypto"
import queryString from "qs"
import axios from "axios"
import { paymentConfig } from "@config"
import { Logger } from "@nestjs/common"
import dayjs from "dayjs"

@Injectable()
export class PaymentService {
	async updateBalance(delta: number): Promise<void> {
		
	}
}

export interface VNPayRequestParams {
    vnp_Version: string;
    vnp_Command: string; 
    vnp_TmnCode: string;
    vnp_Amount: number; 
    vnp_BankCode?: string; 
    vnp_CreateDate: number;
    vnp_CurrCode: string; 
    vnp_IpAddr: string; 
    vnp_Locale: string; 
    vnp_OrderInfo: string; 
    vnp_OrderType?: string; 
    vnp_ReturnUrl: string; 
    vnp_TxnRef: string; 
    vnp_SecureHash: string;
}

export interface VNPayRequestBody {
	amount : number
	bankCode? : string
	orderDescription? : string
	orderType? : string
	language?  : string
}