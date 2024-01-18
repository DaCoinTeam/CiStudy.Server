import { UserRole, UserKind } from "@database"

export default class SignInResponseDto {
	userId: string
	email?: string
	password?: string
	avatarUrl?: string
	phoneNumber?: string
	balance: number
	role: UserRole
	walletId?: string
	firstName?: string
	lastName?: string
	birthdate?: Date
	verified: boolean
	kind: UserKind
	externalId?: string
}
