import { Token } from './../../auth/schemas/token.schema';
import { User } from "src/users/schemas/user.schema"

export interface IAuth {
    method?: string,
    tokens: IToken,
    user: User
}

export interface IToken {
    accessToken: Token,
    refreshToken: string,
}