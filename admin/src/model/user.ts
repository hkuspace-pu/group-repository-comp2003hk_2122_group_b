const list: any = {
    200: "Surveyor",
    500: "Moderator",
    900: "Administrator"
};

export default class User {
    userId: number;
    userName: string;
    email: string;
    membership: number;
    membershipTxt: string;

    constructor(json: any) {
        this.userId = json["userId"];
        this.userName = json["userName"];
        this.email = json["email"];
        this.membership = json["membership"] || 200;
        this.membershipTxt = this.getMembershipByID(this.membership);
    }

    getMembershipByID(num: number): string {
        return list[num];
    }

    changeMembership(num: number) {
        this.membership = num;
        this.membershipTxt = list[num];
    }
}