"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrganizationDto = exports.newOrganizationDto = exports.mockOrganizationEntities = void 0;
const organization_entity_1 = require("../organizations/organization.entity");
const user_entity_1 = require("../users/user.entity");
const mockOrganizationEntities = [
    new organization_entity_1.Organization(0, '12-3456789', 'organization name', 'organization description', '+001 (012) 012-0123', 'johndoe@email.com', 'John', 'Doe', new user_entity_1.User(1, 'John', 'Doe', 'johndoe@email.com')),
    new organization_entity_1.Organization(1, '34-5678901', 'organization name 2', 'organization description 2', '+002 (123) 456-7890', 'janedoe@email.com', 'Jane', 'Doe', new user_entity_1.User(2, 'Jane', 'Doe', 'janedoe@email.com')),
];
exports.mockOrganizationEntities = mockOrganizationEntities;
const newOrganizationDto = {
    EIN: '12-3456789',
    name: 'Apple',
    description: 'The apple company',
    phoneNumber: '+001 (012) 012-0123',
    email: 'stevejobs@apple.com',
    contactFirstName: 'Steve',
    contactLastName: 'Jobs',
    adminUserId: 1,
};
exports.newOrganizationDto = newOrganizationDto;
const updateOrganizationDto = {
    EIN: '00-0000000',
    name: 'new name',
    description: 'new description',
    phoneNumber: '+001 (000) 000-0000',
    email: 'newemail@email.com',
    contactFirstName: 'Steve',
    contactLastName: 'Jobs',
    adminUserId: 1,
};
exports.updateOrganizationDto = updateOrganizationDto;
//# sourceMappingURL=organization.constant.js.map