
class Product{
    
    constructor(name, detail, MFDate, ExpDate, price, remainQty, petType, image_path){
        this.name = name;
        this.detail = detail;
        this.MFDate = MFDate;
        this.ExpDate = ExpDate;
        this.price = price;
        this.remainQty = remainQty;
        this.petType = petType;
        this.image_path = image_path;
        this.id = undefined;
    }

    setProductID(prod_id){
        this.id = prod_id;
    }

    updateInfo(data){
        this.name = data.name || this.name;
        this.detail = data.detail || this.detail;
        this.MFDate = data.MFDate || this.MFDate;
        this.ExpDate = data.MFDate || this.ExpDate;
        this.price = data.price || this.price;
        this.remainQty = data.remainQty || this.remainQty;
        this.petType = data.petType || this.petType;
        this.image_path = data.image_path || this.image_path;
    }
}

export default Product;