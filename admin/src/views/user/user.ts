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
            isShowMembershipList: "block",

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
        onAddClick(): void {
            this.clear();
            this.viewMode = "create";
        },
        onSubmitClick(): void {
            let isEmpty = this.checkEmpty();
            if (isEmpty) return;

            let isValidate = this.validatePassword();
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
            
            axios.put(this.url, sendObj).then(res => {
                console.log('starLog create user response', res);
                
            });
        },
        onUserItemClick(index: number) {
            this.selectedUser = this.userData[index];
            this.viewMode = "edit";
        },
        onEditBackClick(): void {
            this.clear();
            this.viewMode = "table";
        },
        onMembershipButtonClick(): void {
            this.isShowMembershipList = this.isShowMembershipList === "none" ? "block" : "none"
        },
        onMembershipItemClick(index: number) {
            let list = [200, 500, 900];
            this.selectedUser.changeMembership(list[index]);
        },
        onPasswordClick(index: number) {
            console.log('starLog onPasswordClick', index);

        },
        checkEmpty(): boolean {
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
        validatePassword(): boolean {
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
        clear(): void {
            this.selectedUser = new User({});
            this.oldPassword = "";
            this.newPassword = "";
            this.confirmPassword = "";
        }
    }
})