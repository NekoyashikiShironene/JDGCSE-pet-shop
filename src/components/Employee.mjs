import Account from "./Account.mjs";

class Employee extends Account{
    
    constructor(username, password, name, email, tel, salary, id){
        super(username, password, name, email, tel, id);
        this.salary = salary;
    }
}

export default Employee;