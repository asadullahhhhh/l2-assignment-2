import {pool} from '../../database/db';

const createBooking = async (payload: Record<string, unknown>) => {
    const {customer_id, vehicle_id, rent_start_date, rent_end_date} = payload

    if(!rent_start_date || !rent_end_date) {
        throw new Error("rent_start_date and rent_end_date are required")
    }

    const startDate = new Date(rent_start_date as string)
    const endData = new Date(rent_end_date as string)

    if(isNaN(startDate.getTime()) || isNaN(endData.getTime())) {
        throw new Error("Invalid date format. Use YYYY-MM-DD")
    }

    if(endData < startDate) {
        throw new Error("rent_end_date must be after rent_start_date")
    }

    // ---> get the duration
    const diffInMs = endData.getTime() - startDate.getTime()
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24)
    const duration = diffInDays + 1


    // ---> get vehicle details
    const vehicle = await pool.query(`
            SELECT * FROM vehicles WHERE id=$1
        `, [vehicle_id]
    )

    const dailyRentPrice = Number(vehicle.rows[0].daily_rent_price)
    const totalRentPrice = duration * dailyRentPrice


    const result = await pool.query(`
            INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price) VALUES($1, $2, $3, $4, $5) RETURNING *
        `, [customer_id, vehicle_id, rent_start_date, rent_end_date, totalRentPrice]
    )

    result.rows[0].vehicle = {
        vehicle_name : vehicle.rows[0].vehicle_name,
        daily_rent_price: vehicle.rows[0].daily_rent_price
    }

    return result.rows[0]
}


export const bookingService = {
    createBooking,
}