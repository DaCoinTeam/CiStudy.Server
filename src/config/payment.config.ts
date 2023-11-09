export default () => {
	return {
		VNPay: {
			sandbox: {
				vnp_TmnCode: process.env.VNP_TMPCODE_SANDBOX || "", 
				vnp_SecretKey: process.env.VNP_SECRET_KEY_SANDBOX || "",
				vnp_Url: process.env.VNP_URL_SANDBOX || "",
				vnp_ReturnUrl: process.env.VNP_RETURN_URL_SANDBOX || "", 
			}
		}
	}
}