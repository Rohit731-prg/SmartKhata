import JWT from "jsonwebtoken"

export const decodeToken = (token) => {
    return JWT.decode(token, process.env.JWT_CODE);
}