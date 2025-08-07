import mongoose from "mongoose";

interface User {
    username: string,
    email: string,
    password: string
}

const userSchema = new mongoose.Schema<User>({
    username: {type: String, required: true},
    email: {type: String, unique: true},
    password: {type: String, unique: true}
});

const userModel = mongoose.model<User>("User", userSchema);

export default userModel;