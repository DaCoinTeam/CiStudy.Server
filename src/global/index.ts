export * from "./services/3rd"
export * from "./services/base"

import { GlobalServicesModule } from "./services"
import { AuthInterceptor } from "./interceptors"

export { GlobalServicesModule, AuthInterceptor }