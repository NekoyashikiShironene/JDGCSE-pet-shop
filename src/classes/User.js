import AccountManager from "./AccountManager.mjs";
import Account from "./Account.mjs";
import Employee from "./Employee.mjs";
import ProductController from "./ProductController.mjs";
import ProductView from "./ProductView.mjs";
import Product from "./Product.mjs";
import ProductModel from "./ProductModel.mjs";

const accManager = new AccountManager();


const admin = new Admin("Bosslnwza007", "admin", "C", "11-02-2024");

const status1 = accManager.createCustomerAccount("Boss", "abc",  "A");
const status2 = accManager.createSellerAccount(admin,"Jojo", "testd");
//console.log(AccountManager.getAccounts());
console.log(status1);
console.log(status2);

accManager.login("Boss", "abc");
accManager.login("Jojo", "testd");


const pm = new ProductModel();
pm.getProduct("Dog").then(data => {
    console.log(data);
}).catch(error => {
    console.error(error);
});