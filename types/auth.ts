export interface ILoginForm {
    username: string;
    password: string;
}
export interface ISignInResponse {
    data: {
        accessed: boolean;
        error?: {
            message: string;
        };
    };
}
