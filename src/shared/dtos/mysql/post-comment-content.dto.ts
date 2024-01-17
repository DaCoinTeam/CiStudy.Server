export default interface PostCommentContentDto {
    postCommentContentId : string;
    index: number;
    content: string;
    contentType: ContentType;
    postCommentId: string;
  }
  
enum ContentType {
    Text = "Text",
    Video = "Video",
    Code = "Code",
    Image = "Image",
    Label = "Label"
  }