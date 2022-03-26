import mongoose, { Schema } from "mongoose";
const userSchema = new Schema(
    {
        informationId: {
            type: Schema.Types.ObjectId,
            ref: "information",
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        defaultPassword: {
            type: String,
            required: true,
        },
        permission: {
            type: Schema.Types.ObjectId,
            ref: "Permission",
            required: true,
        },
        state: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);
export default mongoose.model("User", userSchema);
