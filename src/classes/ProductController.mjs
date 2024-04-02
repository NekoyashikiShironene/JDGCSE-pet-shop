import Product from "./Product.mjs";
import ProductModel from "./ProductModel.mjs"
import ProductView from "./ProductView.mjs";

class ProductController {
    constructor(){
        this.model = new ProductModel();
        this.view = new ProductView();
    }
    
    async addProduct(name, detail, MFDate, ExpDate, price, remainQty, petType, image_path, EmpID) {
        const data = {
            prod_name: name, 
            detail: detail, 
            MFDate: MFDate, 
            EXPDate: ExpDate, 
            PetType: petType, 
            price: price, 
            RemainQty: remainQty, 
            image_path: image_path,
            EmpID: EmpID 
        }

        const response = await this.model.addProduct(data, EmpID);

        const product = new Product(response.return_value.insertId, name, detail, MFDate, ExpDate, price, remainQty, petType, image_path);
    }
    
    async searchProduct(petType, minPrice, maxPrice, search){
        const data = await this.model.getProduct(petType, minPrice, maxPrice, search);
       // this.view.displayProduct(product);
        return data;
    }
    
    addProductToCart(cart, ProductID){
        cart.addProductToCart(ProductID);
    }

    updateCartItem(cart, ProdID, quantity){
        cart.updateProduct(ProdID, quantity);
    }

    deleteCartItem(cart, ProdID){
        cart.updateProduct(ProdID);
    }

    updateProduct(prod_id, name, Detail, MFDate, EXPDate, RemainQty, PetType, Price, image_path, EmpID){
        const data = {
            name: name,
            Detail: Detail,
            MFDate: MFDate,
            EXPDate: EXPDate,
            RemainQty: RemainQty,
            PetType: PetType,
            Price: Price,
            image_path: image_path,
            EmpID: EmpID
        };

        this.model.updateProduct(prod_id, data);
    }

    checkout(cart, SelectedProd, dst_address){
        cart.checkout(SelectedProd, dst_address);
    }

}

export default ProductController;
