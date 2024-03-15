import mongoose from "mongoose"

export async function connect() {
    return mongoose.connect(process.env.MONGO_URI)

}

export async function disconnect() {
    return mongoose.disconnect()

}