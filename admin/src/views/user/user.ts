import axios from "axios";
import { defineComponent } from "vue";
import User from "./../../model/user"
import crypto from "../util/crypto";

export default defineComponent({
    name: 'user',
    data() {
        return {
            url: "https://7ipwaamd2b.execute-api.us-east-1.amazonaws.com/test/users",
            viewMode: "table" as string,
            userData: [] as User[],
            selectedUser: {} as User,
            memberships: ["Surveyor", "Moderator", "Administrator"],

            // password
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        }
    },
    created() {
        axios.get(this.url).then(response => {
            console.log('starLog raw data', response);
            const data = response.data as [];
            this.userData = data.map(row => new User(row));
            console.log('starLog data', this.userData);
        });
    },
    methods: {
        onBackButtonClick(): void {
            this.clear();
            this.viewMode = "table";
        },
        onAddClick(): void {
            this.clear();
            this.viewMode = "create";
        },
        onCreateClick(): void {
            let isEmpty = this.checkCreationEmpty();
            if (isEmpty) return;

            let isValidate = this.validateCreationPassword();
            if (!isValidate) return;

            this.createUser();
        },
        createUser(): void {
            let key = "yAQwfsssfLP48cHQ",
                iv = crypto.generateIV(16),
                sendObj = {
                    "userName": this.selectedUser.userName,
                    "email": this.selectedUser.email,
                    "membership": this.selectedUser.membership,
                    "password": crypto.encrypt(this.newPassword, key, iv),
                    "iv": iv
                };
            // console.log('starLog send obj', sendObj);

            axios.post(this.url, sendObj).then(res => {
                console.log('starLog create user response', res);

            });
        },
        onUserItemClick(index: number) {
            this.clear();
            this.selectedUser = this.userData[index];
            this.viewMode = "edit";
        },
        onDeleteClick() {
            axios.delete(this.url, {
                data: {
                    userId: this.selectedUser.userId
                }
            }).then(res => {
                console.log('starLog delete user response', res);
            });
        },
        onUpdateClick() {
            let isEmpty = this.checkUpdateEmpty();
            if (isEmpty) return;

            let sendObj = {
                "requestType": "updateDetail",
                "userId": this.selectedUser.userId,
                "userName": this.selectedUser.userName,
                "email": this.selectedUser.email,
                "membership": this.selectedUser.membership
            };

            axios.put(this.url, sendObj).then(res => {
                console.log('starLog update user details response', res);
            });
        },
        onMembershipItemClick(index: number) {
            let list = [200, 500, 900];
            this.selectedUser.changeMembership(list[index]);
        },
        onPasswordClick(index: number): void {
            this.clear();
            this.selectedUser = this.userData[index];
            this.viewMode = "password";
        },
        onPasswordConfirmClick(): void {
            let isEmpty = this.checkUpdatePasswordEmpty();
            if (isEmpty) return;

            let validatePassword = this.validateUpdatePassword();
            if (!validatePassword) return;

            let key = "yAQwfsssfLP48cHQ",
                oldPasswordIV = crypto.generateIV(16),
                newPasswordIV = crypto.generateIV(16),
                sendObj = {
                    "requestType": "changePassword",
                    "userId": this.selectedUser.userId,
                    "oldPassword": crypto.encrypt(this.oldPassword, key, oldPasswordIV),
                    "oldPasswordIV": oldPasswordIV,
                    "newPassword": crypto.encrypt(this.newPassword, key, newPasswordIV),
                    "newPasswordIV": newPasswordIV
                };

            axios.put(this.url, sendObj).then(res => {
                console.log('starLog change password response', res);
            });
        },
        login(): void {
            let key = "yAQwfsssfLP48cHQ",
                iv = crypto.generateIV(16),
                sendObj = {
                    "requestType": "login",
                    "email": this.selectedUser.email,
                    "password": crypto.encrypt(this.oldPassword, key, iv)
                }

            axios.put(this.url, sendObj).then(res => {
                console.log('starLog login response', res);
                
            });
        },
        checkCreationEmpty(): boolean {
            let name = this.selectedUser.userName || "",
                email = this.selectedUser.email || "",
                newPassword = this.newPassword || "",
                confirmPassword = this.confirmPassword || "";

            if (name.length <= 0 || email.length <= 0 || newPassword.length <= 0 || confirmPassword.length <= 0) {
                alert("One or more input field are empty");
                return true;
            }
            return false;
        },
        checkUpdatePasswordEmpty(): boolean {
            let oldPassword = this.oldPassword || "",
                newPassword = this.newPassword || "",
                confirmPassword = this.confirmPassword || "";

            if (oldPassword.length <= 0 || newPassword.length <= 0 || confirmPassword.length <= 0) {
                alert("One or more input field are empty");
                return true;
            }
            return false;
        },
        checkUpdateEmpty(): boolean {
            let name = this.selectedUser.userName || "",
                email = this.selectedUser.email || "";
            if (name.length <= 0 || email.length <= 0) {
                alert("One or more input field are empty");
                return true;
            }
            return false;
        },
        validateCreationPassword(): boolean {
            let newPassword = this.newPassword || "",
                confirmPassword = this.confirmPassword || "";

            if (newPassword !== confirmPassword) {
                alert("Password and confirm password are not matched");
                return false;
            }
            if (newPassword.length < 8) {
                alert("Password length is too short");
                return false;
            }
            return true;
        },
        validateUpdatePassword(): boolean {
            let oldPassword = this.oldPassword || "",
                newPassword = this.newPassword || "",
                confirmPassword = this.confirmPassword || "";

            if (newPassword !== confirmPassword) {
                alert("New password and confirm password are not matched");
                return false;
            }
            if (oldPassword.length < 8 || newPassword.length < 8) {
                alert("Password length is too short");
                return false;
            }
            return true;
        },
        clear(): void {
            this.selectedUser = new User({});
            this.oldPassword = "";
            this.newPassword = "";
            this.confirmPassword = "";
        }
    }
})