import dotenv from 'dotenv'
import path from 'path';

dotenv.config({path: path.join(process.cwd(), ".env")})

const config = {
    connectionStr: process.env.CONNECTION_STR,
    jwtSecrect: process.env.JWT_SECRECT,
    port: 5000
}

export default config