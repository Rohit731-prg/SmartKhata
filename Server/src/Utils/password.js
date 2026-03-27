import bcrypt from "bcryptjs";

export const setPassword = async (password) => {
    return bcrypt.hash(password, 10);
}

export const getPasswordCheck = async (password, hashPassword) => {
    return bcrypt.compare(password, hashPassword);
}