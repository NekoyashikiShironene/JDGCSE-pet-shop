
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


generateJson = (stt_code, msg, return_value = null) => {
    return { stt_code: stt_code, msg: msg, return_value: return_value }
}


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
            res.send(generateJson(0, "Customer register failed"));
        } else {
            res.send(generateJson(1, "Customer register successful", result));
        }
    });

});

app.post("/create-emp", (req, res) => {
    const { username, pwd, emp_name, email, tel, role } = req.body;

    const values = [username, pwd, emp_name, email, tel, role];

    console.log(req.body);

    db.query("INSERT INTO Employee(username, pwd, emp_name, email, tel, role) \
      VALUES (?, ?, ?, ?, ?, ?)", values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(generateJson(0, "Employee register failed"));
        } else {
            res.send(generateJson(1, "Employee register successfully", result));
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
        return res.status(400).send(generateJson(-1, "Invalid account type"));
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
            res.status(500).send(generateJson(0, "Account update failed"));
        } else {
            res.send(generateJson(1, "Account update successful"));
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
            res.status(500).send(generateJson(0, "Products fetch failed"));
        } else {
            res.send(generateJson(1, "Products fetch successful", result));
        }
    });
});

app.post("/create-product", (req, res) => {
    const { prod_name, detail, MFDate, EXPDate, PetType, price, RemainQty, image_path, EmpID } = req.body;
    console.log(req.body);

    const values = [prod_name, detail, MFDate, EXPDate, PetType, price, RemainQty, image_path];

    db.query("INSERT INTO Product(prod_name, detail, MFDate, EXPDate, PetType, price, RemainQty, image_path) \
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)", values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(generateJson(0, "Product create failed"));
        } else {
            let ProdID = result.insertId;
            let values_str = values.map(String);
            let method = "Created product: \n" + values_str.join("\n");
            db.query("INSERT INTO Management(EmpID, ProdID, method) \
                VALUES (?, ?, ?)", [EmpID, ProdID, method], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send(generateJson(0, "Management update failed"));
                } else {
                    res.send(generateJson(1, "Management update successful", result));
                }
            });
        };
    });
});

app.put("/update-product/:prodid", (req, res) => {
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
            res.status(500).send(generateJson(0, "Product update failed"));
        } else {
            let values_str = values.map(String);
            let method = "Updated product: \n" + values_str.join("\n");
            db.query("INSERT INTO Management(EmpID, ProdID, method) \
                VALUES (?, ?, ?)", [EmpID, prodID, method], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send(generateJson(0, "Product update failed"));
                } else {
                    res.send(generateJson(1, "Product update successful", result));
                }
            });
        }
    });
});

app.post("/create-cart", (req, res) => {
    const { custid } = req.body;
    db.query("SELECT * FROM Cart WHERE CustID = ?", [custid], (err, result) => {
        if (result.length == 0) {
            db.query("INSERT INTO Cart(CustID) VALUES(?)", [custid], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send(generateJson(0, "Cart create failed"));
                } else {
                    res.send(generateJson(1, "Cart create successful", result));
                }
            });
        }
        else {
            res.status(400).send("No");
        }
    });

});

app.post("/add-carttem", (req, res) => {
    const { CartID, ProdID, quantity } = req.body;
    values = [CartID, ProdID, quantity];

    db.query("INSERT INTO cartitem VALUES(?, ?, ?)", values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(generateJson(0, "CartItem add failed"));
        } else {
            res.send(generateJson(1, "CartItem add successful", result));
        }
    });
});

app.put("/update-cart-item", (req, res) => {
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
                        res.status(500).send(generateJson(0, "CartItem update failed"));
                    } else {
                        res.send(generateJson(1, "CartItem update successful"));
                    }
                });
            }
            else if (quantity == 0) {
                db.query("DELETE FROM cartitem \
                    WHERE CartID=? AND ProdID=?", [CartID, ProdID], (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send(generateJson(0, "CartItem delete failed"));
                    } else {
                        res.send(generateJson(1, "CartItem delete successful"));
                    }
                });
            } else {
                res.status(400).send(generateJson(-1, "Quantity out of range"));
            }
        }

        else {
            res.status(400).send(generateJson(-1, "Cartitem does not exist"));
        }
    });



});

app.post("/create-order", (req, res) => {
    const { CartID, CustID, dst_address, products } = req.body;
    const update = (values) => {
        db.query("INSERT INTO orders(CartID, CustID, dst_address) VALUES(?, ?, ?)", values, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(generateJson(0, "Order create failed"));
            } else {
                orderId = result.insertId;
                db.query("UPDATE cartitem SET OrderID=? WHERE ProdID IN (?)", [orderId, products.join(",")], (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send(generateJson(0, "Order create failed"));
                    } else {
                        res.send(generateJson(1, "Order create successful"));;
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

app.post("/update-order-stt/:orderId", (req, res) => {
    const orderId = req.params.orderId;
    const { stt, EmpID } = req.body;

    db.query("INSERT INTO orderstatus(OrderID, status_msg) VALUES(?, ?)", [orderId, stt], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(generateJson(0, "OrderStatus update failed"));
        } else {
            db.query("UPDATE orders SET EmpID=? WHERE OrderID=? AND EmpID IS NULL", [EmpID, orderId], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send(generateJson(0, "OrderStatus update failed"));
                } else {
                    res.send(generateJson(1, "OrderStatus update successful", result));
                }
            });

        }
    });
});

app.get("/get-cart-id/:custID", (req, res) => {
    const custID = req.params.custID;

    db.query("SELECT o.OrderID, o.CustID, c.username AS customer_username,\
        c.email AS customer_email, e.EmpID, e.username AS employee_username,\
        e.email AS employee_email, p.prod_name, p.price AS product_price,\
        ci.quantity AS product_quantity, o.total_price, o.dst_address,\
        os.status_msg AS order_status, os.status_time AS status_update_time\
        FROM Orders o \
        JOIN Cart c ON o.CartID = c.CartID\
        JOIN Employee e ON o.EmpID = e.EmpID\
        JOIN CartItem ci ON o.OrderID = ci.OrderID\
        JOIN Product p ON oi.ProdID = p.ProdID\
        LEFT JOIN OrderStatus os ON o.OrderID = os.OrderID\
        WHERE o.CustID = ?", custID, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(generateJson(0, "CartID fetch failed"));
        } else {
            res.send(generateJson(1, "CartID fetch successful", result));
        }
    })
});

app.get("/cal-total-price/:cartID", (req, res) => {
    const cartID = req.params.cartID;
    const SelectedProd = req.body.SelectedProd;

    if (SelectedProd.length === 0) {
        res.send(generateJson(1, "No item in cart", 0));
    }

    db.query("SELECT SUM(p.price * ci.quantity)\
            FROM Cart c\
            JOIN CartItem ci ON c.CartID = ci.CartID\
            JOIN Product p ON ci.ProdID = p.ProdID\
            WHERE c.CartID=? AND p.ProdID IN (?)", [cartID, SelectedProd.join(",")], (err, result) => {
        if (err) {
            res.status(500).send(generateJson(0, "TotalPrice calculate failed"));
        }
        else {
            if (result.length > 0) {
                const total_price = result[0].total_price;
                res.send(generateJson(1, "TotalPrice calculate successful", total_price));
            }
            else {
                res.status(500).send(generateJson(0, "TotalPrice calculate failed"));
            }
        }
    });
});

app.get("/get-order", (req, res) => {
    const { role, uid } = req.body;
    let id;
    if (uid === undefined) {
        id = null;
    } else {
        id = uid;
    }
        
    if (role === "e") {
        db.query(`SELECT * FROM orders WHERE EmpID ${id ? "=" : "IS"} ?`, [id], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(generateJson(0, "Orders fetch failed"));
            } else {
                res.send(generateJson(1, "Orders fetch successful", result));
            }
        });
    }
    else if (role === "c") {
        db.query("SELECT o.OrderID, o.CustID, cu.username AS customer_username, cu.email AS customer_email,\
            e.username AS employee_username, e.email AS employee_email, p.prod_name, p.price AS product_price,\
            ci.quantity AS product_quantity, o.dst_address, os.status_msg AS order_status, os.status_time AS status_update_time\
            FROM Orders` o JOIN Customer cu ON o.CustID = cu.CustID LEFT JOIN Employee e ON o.EmpID = e.EmpID\
            JOIN CartItem ci ON o.OrderID = ci.OrderID JOIN Product p ON ci.ProdID = p.ProdID\
            LEFT JOIN OrderStatus os ON o.OrderID = os.OrderID WHERE o.CustID = ?", [id], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(generateJson(0, "Orders fetch failed"));
            } else {
                res.send(generateJson(1, "Orders fetch successful", result));
            }
        });
    } else {
        res.status(400).send(generateJson(-1, "Role not found"));
    }

});

app.listen(3001, () => {
    console.log("Running on port 3001");
});
