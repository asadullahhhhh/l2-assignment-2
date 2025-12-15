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

// ===> get single vehicle
const getSingleVehicle = async (id: string) => {
    const result = await pool.query(`
            SELECT * FROM vehicles WHERE id=$1 
        `, [id]
    )

    return result
}

// ===> update vehicle
const updateVehicle = async (id: string, payload: Record<string, unknown>) => {
    const {vehicle_name, type, registration_number, daily_rent_price, availability_status} = payload

    if(type !== undefined && !['car', 'bike', 'van', 'SUV'].includes(type as string)){
        throw new Error("type must be 'car', 'bike', 'van' or 'SUV'")
    }

    if(daily_rent_price !== undefined && Number(daily_rent_price) < 0) {
        throw new Error("Rent price must be positive")
    }

    if(availability_status !== undefined && !['available', 'booked'].includes(availability_status as string)){
        throw new Error("Availability status mus be 'available' or 'booked'")
    }

    const extingVehicle = await pool.query(`
            SELECT * FROM vehicles WHERE id=$1 
        `, [id]
    )

    if(extingVehicle.rows.length === 0) {
        throw new Error("No vehicle found in this id")
    }

    const updateVehicle = {
        up_name : vehicle_name !== undefined ? vehicle_name : extingVehicle.rows[0].vehicle_name,
        up_type : type !== undefined ? type : extingVehicle.rows[0].type,
        up_registration_number : registration_number !== undefined ? registration_number : extingVehicle.rows[0].registration_number,
        up_daily_rent_price : daily_rent_price !== undefined ? daily_rent_price : extingVehicle.rows[0].daily_rent_price,
        up_availability_status : availability_status !== undefined ? availability_status : extingVehicle.rows[0].availability_status,
    }

    const result = await pool.query(`
            UPDATE vehicles SET vehicle_name=$1, type=$2, registration_number=$3, daily_rent_price=$4, availability_status=$5 WHERE id=$6 RETURNING *
        `, [updateVehicle.up_name, updateVehicle.up_type, updateVehicle.up_registration_number, updateVehicle.up_daily_rent_price, updateVehicle.up_availability_status, id]
    )

    return result
}

// ===> delete vehicle
const deleteVehicle = async (id: string) => {
    const result = await pool.query(`
            DELETE FROM vehicles WHERE id=$1
        `, [id]
    )

    if(result.rowCount === 0) {
        throw new Error("Vehicle data not found!")
    }

    return result 
}

export const vehiclesService = {
    createVehicles,
    getVehicles,
    getSingleVehicle,
    updateVehicle,
    deleteVehicle
}