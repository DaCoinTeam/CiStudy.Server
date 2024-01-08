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

export interface UserDto {
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
	birthday?: Date
	verified: boolean
	kind: UserKind
	externalId?: string
}
