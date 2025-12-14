import { pool } from '../../database/db';

// get all users 
const getUsers = async () => {
    const result = await pool.query(`
            SELECT * FROM users
        `
    )

    return result
}




export const userService = {
    getUsers,
}