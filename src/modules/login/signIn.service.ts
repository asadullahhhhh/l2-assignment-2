import {pool} from '../../database/db';
import bcrypt from "bcryptjs";
import jwt  from'jsonwebtoken';
import config from '../../config/index';

const loginUser = async (email: string, pass: string) => {
    const result = await pool.query(`
            SELECT * FROM users WHERE email=$1    
        `, [email]
    )

    if(result.rows.length === 0) {
        throw new Error("User not fount")
    }

    const user = result.rows[0]
    const isMatchedPass = await bcrypt.compare(pass, user.password)

    if(!isMatchedPass) {
        throw new Error("Worng password")
    }

    const payload = {
        name: user.name,
        email: user.email,
        role: user.role
    }

    const token = jwt.sign(payload, config.jwtSecrect as string, {
        expiresIn: "7d"
    })

    delete user.password

    return{
        token,
        user: user
    }
}

export const signInService = {
    loginUser
}