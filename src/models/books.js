import { Schema, model, models } from "mongoose"

const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    pages: Number,
    summary: String,
    cover: String,


}, {
    timestamps: true
})

export default models.Book || model("Book", BookSchema)