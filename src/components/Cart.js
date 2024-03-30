import Product from "./Product.mjs";
import axios from "axios"

class Cart{

    constructor(customerID){
        this.custID = customerID;
        this.cartItems = [];
    }

    async addProduct(ProductID){
        const cartid = await axios.get(`/getCartID/${this.custID}`);

        const data = {
            CartID: cartid,
            ProdID: ProductID,
            quantity: quantity 
        };

        this.cartItems.push(ProductID);
        await axios.post("/addCartItem", data);
    }

    async updateCart(ProdID, quantity){
        const cartid = await axios.get(`/getCartID/${this.custID}`); 

        const data = {
            CartID: cartid,
            ProdID: ProductID,
            quantity: quantity 
        };

        await axios.put("/updateCartItem", data);
    }

    removeProduct(ProductID){
        const index = this.cartItems.findIndex(item => item.ProductID === ProductID);
        const product = this.cartItems.find(item => item.ProductID === ProductID);
        
        if (index !== -1){
            this.cartItems.splice(index, 1);
            console.log(`Product: ${product.name}`);
        }
    }

    calTotalPrice(){
        return this.cartItems.reduce((total, item) => total + item.price, 0);
    }

}