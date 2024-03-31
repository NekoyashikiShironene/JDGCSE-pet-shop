import Product from "./Product.mjs";
import Order from "./Order.mjs"
import axios from "axios"

class Cart{
    constructor(customerID, cartID){
        this.custID = customerID;
        this.cartItems = [];
        this.cartID = cartID;

        this.port = 3001;
        this.endpoint_url = `http://localhost:${this.port}`;
    }

    setCartID(cartid){
        this.cartID = cartid;
    }

    async addProduct(ProdID){
        const cartid = await axios.get(`${this.endpoint_url}/getCartID/${this.custID}`);
        setCartID(cartid);

        const data = {
            CartID: cartid,
            ProdID: ProdID,
            quantity: quantity 
        };

        this.cartItems.push(ProdID);
        await axios.post(`${this.endpoint_url}/addCartItem`, data);
    }

    async updateCartItem(ProdID, quantity){
        const cartid = await axios.get(`${this.endpoint_url}/getCartID/${this.custID}`); 

        const data = {
            CartID: cartid,
            ProdID: ProdID,
            quantity: quantity 
        };

        await axios.put("/updateCartItem", data);
    }

    async deleteCartItem(ProdID){
        const cartid = await axios.get(`${this.endpoint_url}/getCartID/${this.custID}`); 

        const data = {
            CartID: cartid,
            ProdID: ProdID,
            quantity: 0
        };

        await axios.put(`${this.endpoint_url}/updateCartItem`, data);

        const index = this.cartItems.findIndex(item => item.ProdID === ProdID);
        const product = this.cartItems.find(item => item.ProdID === ProdID);
        
        if (index !== -1){
            this.cartItems.splice(index, 1);
            console.log(`Product: ${product.name}`);
        }
    }

    async calTotalPrice(SelectedProd){
        const response = await axios.get("/calTotalPrice/:cartID");
        
        return response.return_value.total_price;
    }

    async checkout(SelectedProd, dst_address){

        const data = {
            CartID: this.cartID, 
            CustID: this.custID, 
            dst_address: dst_address,
            products: SelectedProd
        };

        const response = await axios.post("/createOrder", data);
        const total_price = this.calTotalPrice(SelectedProd);

        const newOrder = new Order(orderID, this.custID, dst, SelectedProd, total_price);
    }

}