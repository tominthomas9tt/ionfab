export class ForgotUser {
    public userUsername: string;
}

export class ResetUser {
    public userUsername: string;
    public verificationCode: string;
    public userPassword: string;
}