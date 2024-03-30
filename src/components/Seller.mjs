import Employee from "./Employee.mjs";

class Seller extends Employee{

    constructor(username, password, name, email, tel, salary, id){
        super(username, password, name, email, tel, salary, id);
        this.sales = 0;
    }

    getSales(){
        return this.sales;
    }


}

export default Seller;