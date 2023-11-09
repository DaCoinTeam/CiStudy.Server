import { Injectable } from "@nestjs/common"
import { Request } from "express"
import crypto from "crypto"
import queryString from "qs"
import axios from "axios"
import { paymentConfig } from "@config"

@Injectable()
export class PaymentService {
	async processVNPaySandbox(req: Request): Promise<void> {
		const ipAddr = req.headers["x-forwarded-for"] ||
                req.socket.remoteAddress
       
		const tmnCode = paymentConfig().VNPay.sandbox.vnp_TmnCode
		const secretKey = paymentConfig().VNPay.sandbox.vnp_SecretKey
		let vnpUrl = paymentConfig().VNPay.sandbox.vnp_Url
		const returnUrl = paymentConfig().VNPay.sandbox.vnp_ReturnUrl
        
		const date = new Date()

		const dateFormat = (await import("dateformat")).default
        
		const createDate = dateFormat(date, "yyyymmddHHmmss")
		const orderId = dateFormat(date, "HHmmss")

		const amount = req.body.amount
		const bankCode = req.body.bankCode
            
		const orderInfo = req.body.orderDescription
		const orderType = req.body.orderType
		let locale = req.body.language

		if(locale === null || locale === ""){
			locale = "vn"
		}
		const currCode = "VND"

		const vnp_Params : VNPayRequestParams = {
			vnp_Amount : amount * 100,
			vnp_Version: "2.1.0",
			vnp_Command: "pay",
			vnp_TmnCode: tmnCode,
			vnp_Locale: locale,
			vnp_CurrCode: currCode,
			vnp_TxnRef: orderId,
			vnp_OrderInfo: orderInfo,
			vnp_OrderType: orderType,
			vnp_ReturnUrl: returnUrl,
			vnp_IpAddr: ipAddr as string,
			vnp_CreateDate: createDate,
			vnp_SecureHash: ""
		}
        
		if (bankCode !== null && bankCode !== "") {
			vnp_Params.vnp_BankCode = bankCode
		}

        
		const signData = queryString.stringify(vnp_Params, { encode: false })  
		const hmac = crypto.createHmac("sha512", secretKey)
		const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex") 
		vnp_Params.vnp_SecureHash = signed

		vnpUrl += "?" + queryString.stringify(vnp_Params, { encode: false })
		await axios.post(vnpUrl)
	}
}

export interface VNPayRequestParams {
    vnp_Version: string;
    vnp_Command: string; 
    vnp_TmnCode: string;
    vnp_Amount: number; 
    vnp_BankCode?: string; 
    vnp_CreateDate: string;
    vnp_CurrCode: string; 
    vnp_IpAddr: string; 
    vnp_Locale: string; 
    vnp_OrderInfo: string; 
    vnp_OrderType?: string; 
    vnp_ReturnUrl: string; 
    vnp_TxnRef: string; 
    vnp_SecureHash: string;
}