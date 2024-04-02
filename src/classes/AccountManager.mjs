import Account from "./Account.mjs";
import Customer from "./Customer.mjs";
import Employee from "./Employee.mjs";
import axios from "axios";
import Cart from "./Cart.mjs";
import argon2 from "argon2";
import { SHA256, enc } from 'crypto-js';

class AccountManager {
    static instance;

    constructor() {

        if (!AccountManager.instance) {
            AccountManager.instance = this;
        }
        
        return AccountManager.instance;
    }

    

    encryptText(text) {
        const hash = SHA256(text).toString();
        return hash;
    }

    static getInstance() {
        if (!AccountManager.instance) {
            return new AccountManager();
        }
        return AccountManager.instance;
    }

    static getAccounts(){
        return AccountManager._accounts;
    }

    async login(username, password){
        const response = await axios.get('http://localhost:3001/check-login');
        const usernames = response.data.return_value;
        const account = usernames.find(acc => acc.username === username);
        
        if (!account){
            return {stt_code: 2, msg:"Username not founded"};
        }

        const hashedPassword = this.encryptText(password);


        if (hashedPassword.startsWith(account.pwd)) {
            return {stt_code: 1, msg: "Login successful"};
        }
        else{
            return {stt_code: 2, msg: "Incorrect Password"};
        }
    }

    async createSellerAccount(account, username, password, name, email, tel){
        if (account.role === "Admin"){

            const hashedPassword = this.encryptText(password);
            
            const data = {
                username: username,
                pwd: hashedPassword,
                emp_name: name,
                email: email,
                tel: tel,
                role: "Seller"
            }

            const id = await axios.post('http://localhost:3001/create-emp', data);
            return {stt_code: 1, msg: "Register successful"};
        }
        else{
            return {stt_code: 3, msg: "Only available for admin"};
        }
    }

    async createCustomerAccount(username, password, name, email, tel, loc){
        console.log(password);
        const hashedPassword = this.encryptText(password);

        const data = {
            username: username, 
            pwd: hashedPassword,
            cus_name: name,
            loc: loc, 
            email: email,
            tel: tel
        }

        try {
            
            const reg_response = await axios.post('http://localhost:3001/register', data);
            const newCustomer = new Customer(username, hashedPassword, name, email, tel, loc, reg_response.data.return_value.insertId);

            const cart_response = await axios.post("http://localhost:3001/create-cart", {custid: reg_response.data.return_value.insertId});
            const newCart = new Cart(cart_response.data.return_value.insertId);

            return {stt_code: 1, msg: "Register successful"};
        } catch (error) {
            console.log(error);
            return {stt_code: 0, msg: "Register failed"};
        }

        
    }

    async setInfo(id, role, name, email, tel){
        const error = [];
        const nameRegex = /^(?!.*[!@#$%^&*(),.?":{}|<>])[^\s]{8,16}$/;
        const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
        const telRegex = /^\d{10}$/;

        if (name !== undefined && nameRegex.test(name)){
        }
        else{
            error.push(name);
        }
        
        if (email !== undefined && emailRegex.test(email)){
        }
        else{
            error.push(email);
        }
        
        if (tel !== undefined && telRegex.test(tel)){
        }
        else{
            error.push(tel);
        }

        const data = {
            name: name,
            email: email,
            tel: tel,
        };
        if (role === "Customer"){
            role = "c";
        }
        else {
            role = "e";
        }

        await axios.put(`http://localhost:3001/update-acc/${role}/${id}`, data);
    }

    setPassword(id, role, newPassword, oldPassword){
        const re = /^(?=.*[a-zA-Z])$/;
        
        if (role === "Customer"){
            role = "c";
        }
        else {
            role = "e";
        }

        if (re.test(newPassword) === re.test(oldPassword)){
            const hashedPassword = encryptText(newPassword);
            const data = { pwd: hashedPassword };
            
            axios.put(`http://localhost:3001/update-acc/${role}/${id}`, data);
        }
        
    }

    async getInfo(username){
        const emp = await axios.get(`http://localhost:3001/employee-info/${username}`);
        const cus = await axios.get(`http://localhost:3001/customer-info/${username}`);
        
        if (emp.data.return_value.length){
            const data = {
                id: emp.data.return_value[0].EmpID,
                username: emp.data.return_value[0].username,
                name: emp.data.return_value[0].emp_name,
                role: emp.data.return_value[0].role,
                email: emp.data.return_value[0].email,
                tel: emp.data.return_value[0].tel,
                role: emp.data.return_value[0].role,
                id: emp.data.return_value[0].EmpID
            }

            return data;
        }
        else if (cus.data.return_value.length){
            const cartID = await axios.get(`http://localhost:3001/get-cart-id/${cus.data.return_value[0].CustID}`);
            const data = {
                id: cus.data.return_value[0].CustID,
                username: cus.data.return_value[0].username,
                name: cus.data.return_value[0].cus_name,
                email: cus.data.return_value[0].email,
                tel: cus.data.return_value[0].tel,
                loc: cus.data.return_value[0].loc,
                id: cus.data.return_value[0].CustID, 
                cartID: cartID.data.return_value[0].CartID
            }

            return data;
        }
        else{
            return {role: "WHO?", id: null};
        }
    }


    async getAllSeller(){
        const response = await axios.get('http://localhost:3001/get-all-seller');

        return response.data.return_value;
    }
    
    
}

export default AccountManager;

