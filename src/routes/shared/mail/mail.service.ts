import { appConfig, jwtConfig, mailConfig } from "@config"
import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { createTransport } from "nodemailer"
import { InternalServerErrorException } from "@nestjs/common"

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
		const serverUrl = appConfig().serverUrl
		const token = this.generateVerifyToken(email)
		return {
			from: mailConfig().mailPass,
			to: email,
			subject: "REGISTRATION CONFIRMATION - CISTUDY",
			html: `
			<p>Dear ${email},</p>
			<p>To complete your registration, please click on the confirmation link below:</p>
			<a href="${serverUrl}auth/verify-email?email=${email}&token=${token}">Here</a>
			<p>If you did not sign up for CiStudy, you can ignore this email.</p>
			<p>Best regards,</p>
			<p>Tu Cuong</p>
			<p>C.E.O of CiStudy</p>`,
		}
	}

	async sendMail(email: string) {
		try {
			this.transporter.sendMail(this.mailOptions(email))
		} catch (ex) {
			console.error(ex)
			throw new InternalServerErrorException(
				"Unable to deliver email due to a temporary server issue. We apologize for the inconvenience. Please try again later.",
			)
		}
	}
}
