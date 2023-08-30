export type CreateUserParams = {
    name: string;
    email: string;
    password: string;
};

export type UpdateUserParams = {
    name: string;
    email: string;
    password?: string;
};