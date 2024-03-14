import mongoose from "mongoose"

export async function connect() {
    return await mongoose.connect(process.env.MONGO_URI)

}

export async function disconnect() {
    return await mongoose.disconnect()

}