import * as bcrypt from 'bcrypt';
import { encryptPassword, isValidPassword } from './utils';

describe('The password related utilitary functions', () => {
  describe('encryptPassword function', () => {
    let isValidPasswordMock;

    beforeAll(() => {
      isValidPasswordMock = jest.fn().mockImplementation((password, hash) => {
        return bcrypt.compareSync(password, hash);
      });
    });
    it('encrypts a password', () => {
      const password = 'password';
      const encryptedPassword = encryptPassword(password);
      expect(typeof encryptedPassword).toBe('string');
      expect(isValidPasswordMock(password, encryptedPassword)).toBeTruthy();
    });
  });

  describe('isValidPassword function', () => {
    let encryptPasswordMock;
    beforeAll(() => {
      encryptPasswordMock = jest.fn().mockImplementation(password => {
        return bcrypt.hashSync(password, 10);
      });
    });

    it('returns true to a good password comparison', () => {
      const password = 'strong_password';
      const encryptedPassword = encryptPasswordMock(password);
      expect(isValidPassword(password, encryptedPassword)).toBeTruthy();
    });

    it('returns false to a wrong password comparison', () => {
      const password = 'strong_password';
      const encryptedPassword = encryptPasswordMock(password);
      const wrongPassword = 'another_password';
      expect(isValidPassword(wrongPassword, encryptedPassword)).toBeFalsy();
    });
  });
});
