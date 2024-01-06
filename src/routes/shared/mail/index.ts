import { appConfig, jwtConfig, mailConfig } from "@config"
import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { createTransport } from "nodemailer"

@Injectable()
export default class MailService {
	constructor(private readonly jwtService: JwtService) {}

	private generateVerifyToken(email: string): string {
		const payload = { email }
		return this.jwtService.sign(payload, {
			expiresIn: jwtConfig().verifyTokenExpiryTime,
			secret: jwtConfig().secret,
		})
	}

	private transporter = createTransport({
		service: "gmail",
		auth: {
			user: mailConfig().mailPass,
			pass: mailConfig().mailUser,
		},
	})

	private mailOptions = (email: string) => {
		const serverURL = appConfig().serverUrl
		const token = this.generateVerifyToken(email)
		return {
			from: "starcidapride@gmail.com",
			to: email,
			subject: "REGISTRATION CONFIRMATION - STARCI",
			html: `
			<p>Dear ${email},</p>
			<p>To complete your registration, please click on the confirmation link below:</p>
			<a href="${serverURL}auth/verify-email?email=${email}&token=${token}">Here</a>
			<p>If you did not sign up for StarCi, you can ignore this email.</p>
			<p>Best regards,</p>
			<p>Tu Cuong</p>
			<p>Founder of StarCi</p>`,
		}
	}

	async sendMail(email: string) {
		this.transporter.sendMail(this.mailOptions(email))
	}
}
