import multer from "multer";
import cloudinary from "../Config/cloudinary.js";

const storage = multer.memoryStorage();
export const upload =  multer({ storage });

const uploadStream = async (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({
            resource_type: "image",
            folder: "SmartKhatha"
        }, (error, result) => {
            if (error) return reject(error);
            resolve(result);
        });
        stream.end(fileBuffer);
    })
}

export const uploadImage = async (req, res, next) => {
    if (!req.file) {
        req.image_url = "https://cdn-icons-png.flaticon.com/128/9187/9187604.png",
        req.image_id = ""
        return next();
    }

    try {
        const result = await uploadStream(req.file.buffer);
        req.image_url = result?.secure_url;
        req.image_id = result?.public_id;

        return next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}