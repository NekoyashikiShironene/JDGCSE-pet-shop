
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "petshopsystem"
});


app.post("/register", (req, res) => {
    const username = req.body.username;
    const pwd = req.body.pwd;
    const cus_name = req.body.cus_name;
    const loc = req.body.loc;
    const email = req.body.email;
    const tel = req.body.tel;

    const values = [username, pwd, cus_name, loc, email, tel];

    db.query("INSERT INTO Customer(username, pwd, cus_name, loc, email, tel) \
      VALUES (?, ?, ?, ?, ?, ?)", values, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            return result.insertId;
        }
    });

});

app.post("/create-emp", (req, res) => {
    const {username, pwd, emp_name, email, tel, salary} = req.body;

    const values = [username, pwd, emp_name, email, tel, salary];

    db.query("INSERT INTO Employee(username, pwd, emp_name, email, tel, salary) \
      VALUES (?, ?, ?, ?, ?, ?)", values, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Employee created successfully");
            return result.insertId;
        }
    });
});

app.put("/update-acc/:acctype/:id", (req, res) => {
    const accType = req.params.acctype;
    const id = req.params.id;
    const { username, pwd, name, loc, email, tel } = req.body;
    let table, idColumn;
    console.log(accType, id);
    if (accType == "c") {
        table = "Customer";
        idColumn = "custid";
    } else if (accType == "e") {
        table = "Employee";
        idColumn = "empid";
    } else {
        return res.status(400).send("Invalid account ID");
    }

    let updateQuery = `UPDATE ${table} SET `;
    const values = [];

    if (username !== undefined) {
        updateQuery += "username = ?, ";
        values.push(username);
    }

    if (pwd !== undefined) {
        updateQuery += "pwd = ?, ";
        values.push(pwd);
    }

    if (name !== undefined) {
        updateQuery += "name = ?, ";
        values.push(name);
    }

    if (loc !== undefined) {
        updateQuery += "loc = ?, ";
        values.push(loc);
    }

    if (email !== undefined) {
        updateQuery += "email = ?, ";
        values.push(email);
    }

    if (tel !== undefined) {
        updateQuery += "tel = ?, ";
        values.push(tel);
    }

    updateQuery = updateQuery.slice(0, -2);

    updateQuery += ` WHERE ${idColumn} = ?`;
    values.push(id);

    db.query(updateQuery, values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error updating account");
        } else {
            res.send(result);
        }
    });
});

app.get("/products", (req, res) => {
    const petType = req.query.petType;
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const search = req.query.search;


    let query = "SELECT * FROM product";

    const conditions = [];

    if (petType !== undefined) {
        conditions.push("petType = ?");
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
        let priceCondition = "";

        if (minPrice !== undefined && maxPrice !== undefined) {
            priceCondition = "price BETWEEN ? AND ?";
        } else if (minPrice !== undefined) {
            priceCondition = "price >= ?";
        } else {
            priceCondition = "price <= ?";
        }

        conditions.push(priceCondition);
    }

    if (search !== undefined) {
        conditions.push("prod_name LIKE ? OR ProdID = ?");
    }

    if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
    }

    const params = [];


    if (petType !== undefined) {
        params.push(petType);
    }

    if (minPrice !== undefined) {
        params.push(minPrice);
    }

    if (maxPrice !== undefined) {
        params.push(maxPrice);
    }

    if (search !== undefined) {
        params.push(`%${search}%`);
        params.push(search);
    }

    console.log(params);

    db.query(query, params, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error fetching products");
        } else {
            res.send(result);
        }
    });
});

app.post("/createProduct", (req, res) => {
    const { prod_name, detail, MFDate, EXPDate, PetType, price, RemainQty, image_path, EmpID } = req.body;

    const values = [prod_name, detail, MFDate, EXPDate, PetType, price, RemainQty, image_path];

    db.query("INSERT INTO Product(prod_name, detail, MFDate, EXPDate, PetType, price, RemainQty, image_path) \
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)", values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error");
        } else {
            let ProdID = result.insertId;
            let values_str = values.map(String);
            let method = "Created product: \n" + values_str.join("\n");
            db.query("INSERT INTO Management(EmpID, ProdID, method) \
                VALUES (?, ?, ?)", [EmpID, ProdID, method], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Error");
                    return {status_code: 2, msg: "Error"};
                } else {
                    res.send("Product created successfully");
                    return {status_code: 1, msg: "Product created successfully", insertId: result.insertId};
                }
            });
        };
    });
});

app.put("/updateProduct/:prodid", (req, res) => {
    const prodID = req.params.prodid;
    const { name, Detail, MFDate, EXPDate, RemainQty, PetType, Price, image_path, EmpID } = req.body;

    let updateQuery = `UPDATE Product SET `;
    const values = [];

    if (name !== undefined) {
        updateQuery += "prod_name = ?, ";
        values.push(name);
    }

    if (Detail !== undefined) {
        updateQuery += "detail = ?, ";
        values.push(Detail);
    }

    if (MFDate !== undefined) {
        updateQuery += "MFDate = ?, ";
        values.push(MFDate);
    }

    if (EXPDate !== undefined) {
        updateQuery += "EXPDate = ?, ";
        values.push(EXPDate);
    }

    if (RemainQty !== undefined) {
        updateQuery += "RemainQty = RemainQty + ?, ";
        values.push(RemainQty);
    }

    if (PetType !== undefined) {
        updateQuery += "PetType = ?, ";
        values.push(PetType);
    }

    if (Price !== undefined) {
        updateQuery += "price = ?, ";
        values.push(Price);
    }

    if (image_path !== undefined) {
        updateQuery += "image_path = ?, ";
        values.push(Price);
    }

    updateQuery = updateQuery.slice(0, -2);

    updateQuery += ` WHERE ProdID = ?`;
    values.push(prodID);

    db.query(updateQuery, values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error updating product");
        } else {
            let values_str = values.map(String);
            let method = "Updated product: \n" + values_str.join("\n");
            db.query("INSERT INTO Management(EmpID, ProdID, method) \
                VALUES (?, ?, ?)", [EmpID, prodID, method], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Error");
                    return {status_code: 2};
                } else {
                    res.send("Product updated successfully");
                    return {status_code: 1};
                }
            });
            res.send("Product updated successfully");
        }
    });
});

app.post("/createCart", (req, res) => {
    const { custid } = req.body;
    db.query("SELECT * FROM Cart WHERE CustID = ?", [custid], (err, result) => {
        if (result.length == 0) {
            db.query("INSERT INTO Cart(CustID) VALUES(?)", [custid], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Error adding cart");
                } else {
                    res.send("Cart created successfully");
                }
            });
        }
        else {
            res.status(400).send("No");
        }
    });

});

app.post("/addartItem", (req, res) => {
    const { CartID, ProdID, quantity } = req.body;
    values = [CartID, ProdID, quantity];

    db.query("INSERT INTO cartitem VALUES(?, ?, ?)", values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error adding cartitem");
        } else {
            res.send("Cartitem added successfully");
        }
    });
});

app.put("/updateCartItem", (req, res) => {
    const { CartID, ProdID, quantity } = req.body;
    values = [quantity, CartID, ProdID];

    db.query("SELECT RemainQty FROM Product \
        WHERE ProdID=?", [ProdID], (err, result) => {
        if (result.length > 0) {
            if (quantity > 0 && quantity <= result[0].RemainQty) {
                db.query("UPDATE cartitem SET quantity=? \
                WHERE CartID=? AND ProdID=?", values, (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send("Error adding cartitem");
                    } else {
                        res.send("Cartitem updated successfully");
                    }
                });
            }
            else if (quantity == 0) {
                db.query("DELETE FROM cartitem \
                    WHERE CartID=? AND ProdID=?", [CartID, ProdID], (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send("Error adding cartitem");
                    } else {
                        res.send("Cartitem updated successfully");
                    }
                });
            } else {
                res.status(400).send("Quantity out of range");
            }
        }

        else {
            res.status(400).send("Cartitem does not exist");
        }
    });



});

app.post("/createOrder", (req, res) => {
    const { CartID, CustID, dst_address, products } = req.body;
    const update = (values) => {
        db.query("INSERT INTO orders(CartID, CustID, dst_address) VALUES(?, ?, ?)", values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error create order");
        } else {
            orderId = result.insertId;
            db.query("UPDATE cartitem SET OrderID=? WHERE ProdID IN (?)", [orderId, products.join(",")], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Error create order");
                } else {
                    res.send("Created!");;
                }
            });
        }
    });
    }

    if (dst_address === undefined) {
        db.query("SELECT loc FROM Customer WHERE CustID=?", CustID, (err, result) => {
            update([CartID, CustID, result[0].loc]);
        });
    } else {
        update([CartID, CustID, dst_address]);
    }

});


app.post("/updateOrderStt/:orderId", (req, res) => {
    const orderId = req.params.orderId;
    const { stt } = req.body;

    db.query("INSERT INTO orderstatus(OrderID, status_msg) VALUES(?, ?)", [orderId, stt], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error update order status");
        } else {
            res.send("order updated successfully");
        }
    });

});



app.listen(3001, () => {
    console.log("Running on port 3001")
});
