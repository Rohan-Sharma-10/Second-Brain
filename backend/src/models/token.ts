import mongoose from "mongoose";

interface token {
    token: string
}

const tokenSchema = new mongoose.Schema<token>({
    token: String
})

export default mongoose.model<token>("RefreshToken", tokenSchema);