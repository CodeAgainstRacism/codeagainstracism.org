import { Organization } from '../organizations/organization.entity';
import { User } from '../users/user.entity';
export declare class Project {
    id: number;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    isFeatured: boolean;
    isCompleted: boolean;
    qualificationsNeeded: string;
    createdAt: Date;
    updatedAt: Date;
    imageURL: string;
    organization: Organization;
    likers: User[];
    likeCount: number;
    constructor(id?: number, name?: string, description?: string, startDate?: Date, endDate?: Date, imageURL?: string, isFeatured?: boolean, isCompleted?: boolean, organization?: Organization, likers?: User[]);
}
