export class CreatePermissionDto {
    write: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
    profile: number;
    element: number;
}