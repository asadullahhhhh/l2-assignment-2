import {pool} from '../../database/db';
import bcrypt from "bcryptjs";

const userRagistration = async (payload: Record<string, unknown>) => {
    const {name, email, password, phone, role} = payload

    const isEmailLowerCase = email === (email as string).toLowerCase()

    if(!isEmailLowerCase) {
        throw new Error("Email must be is lowercase")
    }

    if((password as string).length < 6) {
        throw new Error("Password must be at least 6 characters");
    }

    if(!["admin", "user"].includes(role as string)){
        throw new Error(`Role must be 'admin' or 'user'`)
    }

    const hasedPass = await bcrypt.hash(password as string, 12)

    const result = await pool.query(`
            INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *
        `, [name, email, hasedPass, phone, role]
    )

    delete result.rows[0].password
    
    return result

}

export const ragistrationService = {
    userRagistration,
}