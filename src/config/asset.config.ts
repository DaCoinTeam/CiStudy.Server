import { join } from "path"

export default () => {
	return {
		path : process.env.ASSET_PATH || join(process.cwd(), "assets")
	}
}