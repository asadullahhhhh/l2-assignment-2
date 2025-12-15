import {pool} from '../../database/db';

// ===> Cretae vehicle 
const createVehicles = async (payload: Record<string, unknown>) => {
    const {vehicle_name, type, registration_number, daily_rent_price, availability_status} = payload

    if(!['car', 'bike', 'van', 'SUV'].includes(type as string)){
        throw new Error("type must be 'car', 'bike', 'van' or 'SUV'")
    }

    if(Number(daily_rent_price) < 0) {
        throw new Error("Rent price must be positive")
    }

    if(!['available', 'booked'].includes(availability_status as string)){
        throw new Error("Availability status mus be 'available' or 'booked'")
    }

    const result = await pool.query(`
            INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *
        `, [vehicle_name,  type, registration_number, daily_rent_price, availability_status]
    )

    return result.rows[0]
}

// ===> Get all vehicles 
const getVehicles = async () => {
    const result = pool.query(`
            SELECT * FROM vehicles 
        `
    )

    return result
}

export const vehiclesService = {
    createVehicles,
    getVehicles
}