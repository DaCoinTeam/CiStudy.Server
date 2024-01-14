export enum UserRole {
    User = "User",
    Moderator = "Moderator",
    Administrator = "Administrator",
  }
  
export enum UserKind {
    Local = "Local",
    Google = "Google",
    Facebook = "Facebook",
  }
  
export default class VerifyGoogleAccessTokenResponseDto {
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
