import JWT from "jsonwebtoken"

export const createToken = (data) => {
    return JWT.sign(data, process.env.JWT_CODE, { expiresIn: "1d" });
}

export const decodeToken = (token) => {
    return JWT.decode(token, process.env.JWT_CODE);
}