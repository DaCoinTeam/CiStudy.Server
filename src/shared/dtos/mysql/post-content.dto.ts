export enum ContentType {
    Text = "Text",
    Video = "Video",
    Code = "Code",
    Image = "Image",
    Label = "Label"
  }

export default interface PostContentDto {
    postContentId : string;
    index: number;
    content: string;
    contentType: ContentType;
    postId: string;
  }
  