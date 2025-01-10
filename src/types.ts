import jwt from 'jsonwebtoken'


export interface Props {
    auth: boolean
    cookies?: Record<string, string | undefined>
    cur_url?: string
    decoded?: JWTUser
}

export class JWTUser {
    id: String
    name: String
    auth: String
    avatar: String
    constructor(token: String) {
        //@ts-ignore
        let decoded = jwt.verify(token, process.env.JWT_SECRET)
        this.id = decoded.id
        this.name = decoded.name
        this.auth = decoded.auth
        this.avatar = decoded.avatar
    }

    static fromUser(id: String, name: String, auth: String, avatar: String) {
        //@ts-ignore
        return jwt.sign(JSON.stringify({id, name, auth, avatar}), process.env.JWT_SECRET)
    }
}
