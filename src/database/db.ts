import {Pool} from 'pg';
import config from '../config/index';

export const pool = new Pool({
    connectionString: config.connectionStr
})

const initDB = async () => {
    await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                name VARCHAR(200) NOT NULL,
                email VARCHAR(250) UNIQUE NOT NULL CHECK (email = LOWER(email)),
                password TEXT NOT NULL,
                phone VARCHAR(20) NOT NULL,
                role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'user'))
            )
            
        `)
}


export default initDB