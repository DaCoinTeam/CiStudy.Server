import { registerEnumType } from "@nestjs/graphql"

enum ContentType {
  Text = "Text",
  Video = "Video",
  Code = "Code",
  Image = "Image",
  Label = "Label",
}

//for graphql
registerEnumType(ContentType, {
	name: "ContentType",
})

export default ContentType