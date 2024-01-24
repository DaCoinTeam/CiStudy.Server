import { Visibility } from "../enums"

export default interface AssetMetadata {
    assetId: string,
    fileName: string,
    extension: string,
    fileSize: number,
    //default is public
    visibility?: Visibility
}

