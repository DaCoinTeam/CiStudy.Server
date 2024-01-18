import { registerEnumType } from "@nestjs/graphql"

enum UserRole {
  User = "User",
  Moderator = "Moderator",
  Administrator = "Administrator",
}
export default UserRole

//for graphql
registerEnumType(UserRole, {
	name: "UserRole",
})