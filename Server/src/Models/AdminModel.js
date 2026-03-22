import mongoose, { Schema } from "mongoose";

const AdminSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String },
    image_id: { type: String }
}, {
    timestamps: true
});

const Admin = mongoose.model("Admin", AdminSchema);
export default Admin;