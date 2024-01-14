import { thirdPartyConfig } from "@config"
import { Injectable } from "@nestjs/common"
import * as admin from "firebase-admin"
import firebase, { ServiceAccount } from "firebase-admin"
import { Auth } from "firebase-admin/lib/auth/auth"
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier"
import { Bucket } from "@google-cloud/storage/build/cjs/src"
import { v4 as uuidv4 } from "uuid"
import { getDownloadURL } from "firebase-admin/storage"

@Injectable()
export default class FirebaseService {
	auth: Auth
	bucket: Bucket
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
		this.bucket = firebase.storage(app).bucket("supple-century-363201.appspot.com")
	}

	async verifyGoogleAccessToken(token: string) : Promise<DecodedIdToken> {
		return await this.auth.verifyIdToken(token)
	}

	async uploadFile(file: File) {
		const arrayBuffer = await file.arrayBuffer()
		const buffer = Buffer.from(arrayBuffer)
		const fileName = uuidv4()
		
		const created = this.bucket.file(fileName)
		await created.save(buffer)
		return getDownloadURL(created)
	}
}
