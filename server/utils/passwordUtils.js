import bcrypt from 'bcrypt';

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 12;

export const hashPassword = async (plainPassword) => {
    // bcrypt.hash() does both salting AND hashing:
    // 1. Generates a random salt (unique per password)
    // 2. Combines salt + password
    // 3. Hashes the combination multiple times (SALT_ROUNDS)
    const hashedPassword = await bcrypt.hash(plainPassword, SALT_ROUNDS);
    return hashedPassword;
};

export const comparePassword = async (plainPassword, hashedPassword) => {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
};
