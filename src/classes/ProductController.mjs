import Product from "./Product.mjs";
import ProductModel from "./ProductModel.mjs"
import ProductView from "./ProductView.mjs";

class ProductController {
    static model = new ProductModel();
    static view = new ProductView();

    addProduct(name, detail, MFDate, ExpDate, price, remainQty, petType, image_path, EmpID) {

        const product = new Product(name, detail, MFDate, ExpDate, price, remainQty, petType, image_path);
        const response = model.addProduct(product, EmpID);
        product.setProductID(response.insertID);
    }
    
    searchProduct(petType, minPrice, maxPrice, search){
        this.model.getProduct(petType, minPrice, maxPrice, search);

        this.view.displayProduct(product);
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
