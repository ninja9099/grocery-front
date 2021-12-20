export interface LoginRequest {
    username: string;
    password: string;
}
export interface LoginResponse {
    token: string;
    user: LoggedInUserDetail;
}
export interface LoggedInUserDetail {
    username?: string;
    id?: number;
    first_name?: string;
    last_name?: string;
}

export interface IProfile {
    id: number;
    email: string;
    user: string;
    avatar: string;
}
