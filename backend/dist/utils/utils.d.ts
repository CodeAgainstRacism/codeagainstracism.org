declare function encryptPassword(password: string): string;
declare function isValidPassword(plainPassword: string, hash: string): boolean;
export { encryptPassword, isValidPassword };
