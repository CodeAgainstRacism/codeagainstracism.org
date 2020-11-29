"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidPassword = exports.encryptPassword = void 0;
const bcrypt = require("bcryptjs");
function encryptPassword(password) {
    return bcrypt.hashSync(password, 10);
}
exports.encryptPassword = encryptPassword;
function isValidPassword(plainPassword, hash) {
    return bcrypt.compareSync(plainPassword, hash);
}
exports.isValidPassword = isValidPassword;
//# sourceMappingURL=utils.js.map