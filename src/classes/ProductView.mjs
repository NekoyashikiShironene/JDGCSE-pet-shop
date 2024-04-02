import Product from "./Product.mjs";

class ProductView {

    displayProduct(product) {
        console.log(`Name: ${product.name}`);
        console.log(`Price: $${product.price}`);
        console.log(`Detail: ${product.detail}`);
    }

}

export default ProductView;
