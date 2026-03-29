import bcrypt from "bcryptjs";

export const setPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

export const getPasswordCheck = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword);
}