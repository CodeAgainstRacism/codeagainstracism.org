"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectDto = exports.newProjectDto = exports.mockProjectEntities = void 0;
const project_entity_1 = require("../projects/project.entity");
const organization_entity_1 = require("../organizations/organization.entity");
const user_entity_1 = require("../users/user.entity");
const mockProjectEntities = [
    new project_entity_1.Project(0, 'Code Against Racism', 'A cool project !', new Date('2020/06/15'), undefined, null),
    new project_entity_1.Project(1, 'spark', 'A simple cli to input and store your ideas directly with git and without a text editor', new Date('2020/06/05'), new Date('2020/06/15'), 'https://i.imgur.com/TTFCXdv.png', false, false, new organization_entity_1.Organization(1, '34-5678901', 'organization name 2', 'organization description 2', '+002 (123) 456-7890', 'janedoe@email.com', 'Jane', 'Doe', new user_entity_1.User(1, 'John', 'Doe', 'johndoe@email.com'))),
    new project_entity_1.Project(2, 'The iPhone', 'Top secret new phone', new Date('2004/01/01'), new Date('2004/01/01'), null),
];
exports.mockProjectEntities = mockProjectEntities;
const newProjectDto = {
    name: 'The iPhone',
    description: 'Top secret new phone',
    startDate: new Date('2004/01/01'),
    endDate: new Date('2004/01/01'),
    imageURL: 'https://i.imgur.com/TTFCXdv.png',
    qualificationsNeeded: '',
    organizationId: null,
};
exports.newProjectDto = newProjectDto;
const updateProjectDto = {
    name: 'A new name !',
    description: 'A new description',
    startDate: undefined,
    endDate: undefined,
    imageURL: 'https://i.imgur.com/TTFCXdv.png',
    qualificationsNeeded: '',
    organizationId: null,
};
exports.updateProjectDto = updateProjectDto;
//# sourceMappingURL=project.constant.js.map