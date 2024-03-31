import Product from "./Product.mjs";
import axios from "axios";

class ProductModel {
    static products = [];

    constructor() {
        this.port = 3001;
        this.endpoint_url = `http://localhost:${this.port}`;
    }

    async addProduct(product, EmpID) {
        const data = {
            prod_name: product.prod_name,
            detail: product.detail,
            MFDate: product.MFDate,
            EXPDate: product.EXPDate,
            PetType: product.petType,
            price: product.price,
            RemainQty: product.RemainQty,
            image_path: product.image_path,
            EmpID: EmpID
        }
        try {
            const response = await axios.post(`${this.endpoint_url}/createProduct`, data);
            if (response.status_code === 1){
                this.products.push(product);
            }
            return response;
        } catch (error) {
            throw error;
        }
        
    }

    async getProduct(petType, minPrice, maxPrice, search) {
        const requestData = {
            petType: petType,
            minPrice: minPrice,
            maxPrice: maxPrice,
            search: search
        };
    
        try {
            const response = await axios.get(`${this.endpoint_url}/products`, {
                params: requestData
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getAllProduct() {
            try {
                const response = await axios.get(`${this.endpoint_url}/products`, {
                    params: {}
                });
                return response.data;
            } catch (error) {
                throw error;
            }
    }

    async updateProduct(prod_id, data){
        const status = await axios.put(`${this.endpoint_url}/updateProduct/${prod_id}`, data);

        if (status.status_code === 1){
            const product = this.products.find(item => item.prod_id === prod_id);
            product.updateProduct(data);   
        }
        else{
            console.log("Failed to update");
        }
    }
}

export default ProductModel;