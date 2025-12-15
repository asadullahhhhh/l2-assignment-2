import { pool } from '../../database/db';

// ===> get all users 
const getUsers = async () => {
    const result = await pool.query(`
            SELECT * FROM users
        `
    )

    return result
}

// ===> update user
const updateuser = async (id: string, payload: Record<string, unknown>) => {
    const {name, email, phone, role} = payload 

    let isEmailLowerCase = true

    if(email !== undefined) {
        isEmailLowerCase = email === (email as string).toLowerCase()
    }

    if(!isEmailLowerCase) {
        throw new Error("Email must be in lowercase")
    }

    if(role !== undefined && !["admin", "user"].includes(role as string)){
        throw new Error(`Role must be 'admin' or 'user'`)
    }

    const existingUser = await pool.query(`
            SELECT * FROM users WHERE id=$1
        `, [id]
    )

    if(existingUser.rowCount === 0) {
        throw new Error("User not found")
    }

    const user = existingUser.rows[0]

    const updatedUser = {
        name: name !== undefined ? name : user.name,
        email: email !== undefined ? email : user.email,
        phone: phone !== undefined ? phone : user.phone,
        role: role !== undefined ? role : user.role
    }

    const updatedUserData = await pool.query(`
            UPDATE users SET name=$1, email=$2, phone=$3, role=$4 WHERE id=$5 RETURNING *
        `, [updatedUser.name, updatedUser.email, updatedUser.phone, updatedUser.role, id]
    )

    delete updatedUserData.rows[0].password

    return updatedUserData.rows[0]
}

// ===> delete user
const deleteUser = async (id: string) => {
    const result = await pool.query(`
            DELETE FROM users WHERE id=$1
        `, [id]
    )

    return result
}

export const userService = {
    getUsers,
    updateuser,
    deleteUser
}