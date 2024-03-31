import bcrypt from "bcrypt";
import Account from "./Account.mjs";
import Customer from "./Customer.mjs";
import axios from "axios";
import Cart from "./Cart.mjs"

class AccountManager {
    static instance;
    static _accounts = [];

    constructor() {

        if (!AccountManager.instance) {
            AccountManager.instance = this;
        }
        
        return AccountManager.instance;
    }

    static getInstance() {

        if (!AccountManager.instance) {
            return new AccountManager();
        }

        return AccountManager.instance;
    }

    addAccount(account){
        AccountManager._accounts.push(account);
    }

    static getAccounts(){
        return AccountManager._accounts;
    }

    login(username, password){

        const account = AccountManager._accounts.find(acc => acc.username === username);

        if (!account){
            return {stt_code: 2, msg:"Username not founded"};
        }
        if (bcrypt.compareSync(password, account.password)){
            return {stt_code: 1, msg: "Login successful"};
        }
        else{
            return {stt_code: 2, msg: "Incorrect password"};
        }
    }

    async createSellerAccount(account, username, password, name, email, tel){
        if (account.role === "Admin"){
            const account = AccountManager._accounts.find(acc => acc.username === username);  
        
            if (account){
                return {stt_code: 2, msg: "Username already existed"};
            }

            const hashedPassword = bcrypt.hashSync(password, 10);

            const data = {
                username: username,
                pwd: hashedPassword,
                emp_name: name,
                email: email,
                tel: tel,
                role: "Seller"
            }

            const id = await axios.post('http://localhost:3001/create-emp', data);

            const accountmanager = new AccountManager();
            const newSeller = new Employee(username, hashedPassword, name, email, tel, id, data.role);
            accountmanager.addAccount(newSeller);

            return {stt_code: 1, msg: "Register successful"};
        }
        else{
            return {stt_code: 3, msg: "Only available for admin"};
        }
    }

    async createCustomerAccount(username, password, name, email, tel, loc){
        const account = AccountManager._accounts.find(acc => acc.username === username);  
        
        if (account){
            return {stt_code: 2, msg: "Username already existed"};
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        
        const data = {
            username: username, 
            pwd: hashedPassword,
            cus_name: name,
            loc: loc, 
            email: email,
            tel: tel
        }

        const reg_response = await axios.post('http://localhost:3001/register', data);

        const newCustomer = new Customer(username, hashedPassword, name, email, tel, loc, reg_response.insertID);
        this.addAccount(newCustomer);

        const cart_response = await axios.post("http://localhost:3001/createCart", reg_response.insertID);
        const newCart = new Cart(response.insertID, cart_response.insertID);

        return {stt_code: 1, msg: "Register successful"};
    }

    async setInfo(account, name, email, tel){
        const error = [];
        var nameRegex = /^(?!.*[!@#$%^&*(),.?":{}|<>])[^\s]{8,16}$/;
        const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
        const telRegex = /^\d{10}$/;

        if (name !== undefined && re.test(name)){
           account.name = name;
        }
        else{
            error.push(username);
        }
        
        if (email !== undefined && emailRegex.test(email)){
            account.email = email;
        }
        else{
            error.push(email);
        }
        
        if (tel !== undefined && telRegex.test(tel)){
            account.tel = tel;
        }
        else{
            error.push(tel);
        }

        const data = {
            name: name,
            email: email,
            tel: tel,
        };
        const accType = getAccType(account);

        await axios.put(`/update-acc/${accType}/${account.id}`, data);
    }

    setPassword(account, newPassword, oldPassword){
        var re = /^(?=.*[a-zA-Z])$/;
        const oldpwd = bcrypt.hashSync(oldPassword); 
        const accType = this.getAccType(account);

        if (re.test(newPassword && account.password === oldpwd)){
            const hashedPassword = bcrypt.hashSync(newPassword, 10);
            const data = { pwd: hashedPassword };
            
            axios.put(`/update-acc/${accType}/${account.id}`, data);
            account.password = hashedPassword;
        }
    }

    getAccType(account){
        if (account instanceof(Customer)){
            accType = "Customer";
        }
        else if (account instanceof(Employee)){
            accType = "Employee";
        }

        return accType;
    }
}

export default AccountManager;

