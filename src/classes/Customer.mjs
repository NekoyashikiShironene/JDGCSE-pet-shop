import Account from "./Account.mjs";

class Customer extends Account{

    constructor(username, password, name, email, tel, address, id){
        super(username, password, name, email, tel, id);
        this.address = address;
    }

}

export default Customer;