import Account from "./Account.mjs";

class Employee extends Account{
    
    constructor(username, password, name, email, tel, id, role){
        super(username, password, name, email, tel, id);
        this.role = role;
    }
}

export default Employee;