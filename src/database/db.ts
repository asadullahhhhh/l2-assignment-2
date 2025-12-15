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
            
        `
    )

    await pool.query(`
            CREATE TABLE IF NOT EXISTS vehicles(
                id SERIAL PRIMARY KEY,
                vehicle_name VARCHAR(250) NOT NULL,
                type VARCHAR(50) NOT NULL CHECK (type IN ('car', 'bike', 'van', 'SUV')),
                registration_number VARCHAR(150) UNIQUE NOT NULL,
                daily_rent_price NUMERIC(10, 2) NOT NULL CHECK (daily_rent_price > 0),
                availability_status VARCHAR(150) NOT NULL CHECK (availability_status IN ('available', 'booked'))
            )
        `
    )
}


export default initDB