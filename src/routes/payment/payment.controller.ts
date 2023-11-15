import { Request } from "express"
import { PaymentService } from "./payment.service"
import { Controller, NotFoundException, Post } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"

@ApiTags("Payment")
@Controller("api/payment")
export class PaymentController {
	constructor(
        private readonly paymentService: PaymentService,
	) { }


    @Post("vnpay")
	async handleVNPaySandbox(req: Request): Promise<void> {
		try{
			await this.paymentService.processVNPaySandbox(req)
		} catch(err: unknown){
			throw new NotFoundException(err.toString())
		}
	}
}