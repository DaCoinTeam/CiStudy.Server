import { registerEnumType } from "@nestjs/graphql"

enum UserKind {
  Local = "Local",
  Google = "Google",
  Facebook = "Facebook",
}
export default UserKind

//for graphql
registerEnumType(UserKind, {
	name: "UserKind",
})