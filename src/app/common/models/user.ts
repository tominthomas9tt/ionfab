export class User {
    public userId?: number;
    public userCode?: string;
    public userName?: string;
    public userUsername?: string;
    public userRole?: string;
}

export class UserDetails extends User{
	public userDob?: string;
	public userGender?: string;
	public userRoleId?: string;
	public userPrimaryEmail?: string;
	public userIsPrimaryEmailVerified?: string;
	public userPrimaryPhone?: string;
	public userIsPrimaryPhoneVerified?: string;
	public userAlternateEmail?: string;
	public userAlternatePhone?: string;
	public panNo?: string;
	public gstNo?: string;
}
