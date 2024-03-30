import axios from "axios";

// Data for creating a customer
const customerData = {
  username: 'customer1',
  pwd: 'password123',
  cus_name: 'John Doe',
  loc: 'New York',
  email: 'john.doe@example.com',
  tel: '1234567890'
};

// Data for creating an employee
const employeeData = {
  username: 'employee99',
  pwd: 'asklfdsjfdaiogbubv',
  emp_name: 'Jane Lee',
  email: 'leee.smith@example.com',
  tel: '9876543210'
};

// Function to create a customer
function createCustomer() {
  try {
    const response = axios.post('http://localhost:3001/create_cust', customerData);
    console.log('Customer created successfully:', response.data);
  } catch (error) {
    console.error('Error creating customer:', error.response.data);
  }
}

function createEmployee() {
  try {
    const response = axios.post('http://localhost:3001/create_emp', employeeData);
    console.log('Employee created successfully:', response.data);
  } catch (error) {
    console.error('Error creating employee:', error.response.data);
  }
}


const getProduct = () => {
  const requestData = {
    // petType: "dog",
    // minPrice: 50,
  //  maxPrice: 20,
    search: "2"
  };

  axios.get('http://localhost:3001/products', {
    params: requestData
  })
    .then(response => {
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error.response.data);
    });

}

const createProduct = () => {
  const data = {
    prod_name: "Test",
    detail: "TESTTESTEST", 
    MFDate: "2024-3-18",
    EXPDate: "2025-3-18", 
    PetType: "Alien", 
    price: 49.99, 
    RemainQty: 12, 
    image_path: "None", 
    EmpID: 1
  }
  axios.post(`http://localhost:3001/createProduct`, data)
    .then(response => {
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error.response.data);
    });

};

const updateProduct = () => {
  const data = {
    name: "เนื้อหมา",
    Detail: "อร่อยนัวร์",
    EmpID: 1
  }
  axios.put(`http://localhost:3001/updateProduct/1`, data)
    .then(response => {
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error.response.data);
    });

};

const addCartItem = (c, p, q) => {
  const updateData = {
    CartID: c,
    ProdID: p,
    quantity: q
  };

  axios.post(`http://localhost:3001/addcartitem/`, updateData)
    .then(response => {
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error.response.data);
    });

};

const createCart = (id) => {
  axios.post(`http://localhost:3001/createcart/`, {
    custid: id
  })
    .then(response => {
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error.response.data);
    });
}

const updateCartItem = (c, p, q) => {
  const updateData = {
    CartID: c,
    ProdID: p,
    quantity: q
  };

  axios.put(`http://localhost:3001/updatecartitem`, updateData)
    .then(response => {
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error.response.data);
    });

};


class MyClass {
  constructor() {
      let x = 1;
      const privateMethod = () => {
          console.log("This is a private method.");
      };

      this.publicMethod = () => {
          console.log("This is a public method.");
          privateMethod();
      };

      this.printX = () => {
          console.log(x);
      }
  }

  publicMethod() {
      console.log("This is a public method.");
  }

}

const baseUrl = 'http://localhost:3001'; // Replace 'your_port' with your actual port number

async function testCreateOrder() {
  try {
      const response = await axios.post(`${baseUrl}/createOrder`, {
          CartID: 10,
          CustID: 1,
         // dst_address: "Kwai",
          products: [2] // Array of product IDs
      });
      console.log(response.data);
  } catch (error) {
      console.error('Error creating order:', error.message);
  }
}

getProduct();





