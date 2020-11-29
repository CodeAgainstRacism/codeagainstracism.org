import { User } from '../users/user.entity';
import { Project } from '../projects/project.entity';
export declare class Organization {
    id: number;
    EIN: string;
    name: string;
    description: string;
    phoneNumber: string;
    email: string;
    contactFirstName: string;
    contactLastName: string;
    createdAt: Date;
    updatedAt: Date;
    adminUser: User;
    projects: Project[];
    constructor(id?: number, EIN?: string, name?: string, description?: string, phoneNumber?: string, email?: string, contactFirstName?: string, contactLastName?: string, adminUser?: User);
}
