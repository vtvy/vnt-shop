import mongoose, { Schema } from "mongoose";

const permisionSchema = new Schema({
    index: Number,
    name: String,
});

export default mongoose.model("Permission", permisionSchema);
