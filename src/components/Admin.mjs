import Employee from "./Employee.mjs";

class Admin extends Employee{

    constructor(username, password, name, email, tel, salary, id){
        super(username, password, name, email, tel, salary, id);
    }
}

export default Admin;