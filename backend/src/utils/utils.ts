import * as bcrypt from 'bcrypt';

/**
 * Returns the encrypted password using bcrypt
 * @param password password to encrypt
 */
function encryptPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

export { encryptPassword };
