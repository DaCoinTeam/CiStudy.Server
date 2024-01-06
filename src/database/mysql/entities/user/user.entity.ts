import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

export enum UserRole {
  User = "user",
  Moderator = "moderator",
  Administrator = "administrator",
}

@Entity("user")
export default class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  	userId: string

  @Column({ type: "varchar", length: 50, default: null })
  	email: string

  @Column({ type: "varchar", length: 20, default: null })
  	password: string

  @Column({ type: "varchar", length: 200, default: null })
  	avatarUrl: string

  @Column({ type: "varchar", length: 12, default: null })
  	phoneNumber: string

  @Column({
  	type: "decimal",
  	precision: 10,
  	scale: 5,
  	default: 0
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
}
