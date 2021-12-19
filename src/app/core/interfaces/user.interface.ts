
export interface IProfile {
    id: number;
    user: IUser;
    email: string;
    avatar: string;
}
export interface  IUser {
    username: string;
    id: number;
    first_name: string;
    last_name: string;
}

export interface IWallet {
    current_balance: number;
}


export  interface IUserProfile {
    profile: IProfile;
    user: IUser;
    wallet: IWallet;
}
