import { PagedApiResponseModel } from "src/app/shared/models/APIs";


export interface UsersApiResponseModel extends PagedApiResponseModel {
    results: UserModel[];
}

export interface UserModel  {
    id: any;
    name: string;
    age: number;
    email: string;
}

export type UserRequiredProps = Pick<UserModel, "name" | "email">;