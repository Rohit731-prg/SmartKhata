import Admin from "../Models/AdminModel.js";
import { decodeToken } from "../Utils/token.js";

export const verifyJwt = async (req, res, next) => {
    const { token } = req.cookies;
    console.log("token: ", token);
    if (!token) return res.status(404).json({ message: "Token not found "});
    try {
        const decode = decodeToken(token);
        const adminID = await Admin.findOne({ _id: decode._id });
        if (!adminID) return res.status(404).json({ message: "Token not found "});

        req.admin = adminID._id;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}