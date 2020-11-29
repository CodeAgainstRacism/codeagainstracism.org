import { Organization } from '../organizations/organization.entity';
import { Project } from '../projects/project.entity';
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    encryptedPassword: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    ownedOrganization: Organization;
    likedProjects: Project[];
    constructor(id?: number, firstName?: string, lastName?: string, email?: string, encryptedPassword?: string);
}
