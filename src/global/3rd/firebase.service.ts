import { thirdPartyConfig } from "@config"
import { Injectable } from "@nestjs/common"
import * as admin from "firebase-admin"
import firebase, { ServiceAccount } from "firebase-admin"
import { Auth } from "firebase-admin/lib/auth/auth"
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier"
import { Storage } from "firebase-admin/lib/storage/storage"

@Injectable()
export default class FirebaseService {
	auth: Auth
	storage: Storage
	constructor() {
		const adminConfig: ServiceAccount = {
			projectId: thirdPartyConfig().firebase.projectId,
			privateKey: thirdPartyConfig().firebase.privateKey.replace(/\\n/g, "\n"),
			clientEmail: thirdPartyConfig().firebase.clientEmail,
		}
		const app = admin.initializeApp({
			credential: admin.credential.cert(adminConfig),
		})

		this.auth = firebase.auth(app)
		this.storage = firebase.storage(app)
	}

	async verifyGoogleAccessToken(token: string) : Promise<DecodedIdToken> {
		return await this.auth.verifyIdToken(token)
	}
}
