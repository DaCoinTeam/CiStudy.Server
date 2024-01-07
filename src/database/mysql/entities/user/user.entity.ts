import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

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

@Entity("user")
export default class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  	userId: string

  @Column({ type: "varchar", length: 50, default: null })
  	email: string

  @Column({ type: "varchar", length: 64, default: null })
  	password: string

  @Column({ type: "varchar", length: 200, default: null })
  	avatarUrl: string

  @Column({ type: "varchar", length: 12, default: null })
  	phoneNumber: string

  @Column({
  	type: "decimal",
  	precision: 10,
  	scale: 5,
  	default: 0,
  })
  	balance: number

  @Column({
  	type: "enum",
  	enum: UserRole,
  	default: UserRole.User,
  })
  	role: UserRole

  @Column({
  	type: "uuid",
  	default: null,
  })
  	walletId: string

  @Column({ type: "varchar", length: 50, default: null })
  	firstName: string

  @Column({ type: "varchar", length: 50, default: null })
  	lastName: string

  @Column({ type: "date", default: null })
  	birthday: Date

  @Column({ type: "boolean", default: false })
  	verified: boolean

  @Column({ type: "enum", enum: UserKind, default: UserKind.Local })
  	kind: UserKind

  @Column({ type: "varchar", length: 128, default: null })
  	externalId: string
}
