import { registerEnumType } from "@nestjs/graphql"

enum VerifiedStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
}
export default VerifiedStatus

//for graphql
registerEnumType(VerifiedStatus, {
	name: "VerifiedStatus",
})
