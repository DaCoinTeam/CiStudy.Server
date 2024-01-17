import { VerifiedStatus } from "@database"
import { registerEnumType } from "@nestjs/graphql"

registerEnumType(VerifiedStatus, {
	name: "VerifiedStatus",
})
