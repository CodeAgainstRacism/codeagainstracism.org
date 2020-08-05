import * as bcrypt from 'bcrypt';

/**
 * Returns the encrypted password using bcrypt
 * @param password password to encrypt
 */
function encryptPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

/**
 * Compares a password with it's hashed value.
 * Return true if the password correspond; false if not
 * @param plainPassword password to test
 * @param hash hashed password
 */
function isValidPassword(plainPassword: string, hash: string): boolean {
  return bcrypt.compareSync(plainPassword, hash);
}

export { encryptPassword, isValidPassword };
