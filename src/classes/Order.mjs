import axios from "axios";

class Order{

    constructor(orderID, custID, date, dst_address, SelectedProd, total_price){
        this.orderID = orderID;
        this.custID = custID;
        this.empID = null;
        this.date = date;
        this.dst_address = dst_address;
        this.total_price = total_price;
        this.status = [];
    }
    
    async updateStatus(status){
        const response = await axios.post(`/updateOrderStt/${this.orderID}`);

        this.status(status);
    }

    

}