"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserDto = exports.newUserDto = exports.mockUserEntities = void 0;
const user_entity_1 = require("../users/user.entity");
const utils_1 = require("../utils/utils");
const mockUserEntities = [
    new user_entity_1.User(0, 'John', 'Doe', 'johndoe@email.com', utils_1.encryptPassword('password1')),
    new user_entity_1.User(1, 'Jane', 'Doe', 'janedoe@email.com', utils_1.encryptPassword('password2')),
];
exports.mockUserEntities = mockUserEntities;
const newUserDto = {
    firstName: 'Steve',
    lastName: 'Jobs',
    phoneNumber: '+001 (012) 012-0123',
    email: 'stevejobs@email.com',
    password: 'imalive',
    description: '',
};
exports.newUserDto = newUserDto;
const updateUserDto = {
    firstName: 'Bob',
    lastName: 'Gratton',
    phoneNumber: '+001 (012) 012-0123',
    email: 'bobgratton@email.com',
    password: 'rock&roll',
    description: '',
};
exports.updateUserDto = updateUserDto;
//# sourceMappingURL=user.constant.js.map