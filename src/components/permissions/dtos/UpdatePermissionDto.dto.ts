export class UpdatePermissionDto {
    write: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
    profileId: number;
    elementId: number;
}