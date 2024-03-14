"use server"
import { z } from "zod"

const UserSchema = z.object({
    username: z.string().min(1, { message: "This field is required" }).email({ message: "Invalid email address" }),
    password: z.string().min(4)
})

export async function loginUser(prevState, formData) {
    const username = formData.get("username")
    const password = formData.get("password")

    const validated = UserSchema.safeParse({ username, password })

    if (!validated.success) {
        return validated.error.format()
    }

    if (username !== "a@a.aa" || password !== "1234") {
        return { success: false, _error: ["Incorrect username or password"] }
    }

    return { success: true, redirect: "/dashboard" }
}
