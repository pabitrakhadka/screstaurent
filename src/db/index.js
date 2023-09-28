import mysql from 'mysql2';
import { resolve } from 'styled-jsx/css';
class Db {
  constructor() {
    this.connect();
  }
  connect() {
    this.conn = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    this.conn.connect((errror) => {
      if (errror) {
        console.log("Error Data base not connectd ", errror);
        this.conn = null;
      } else {
        console.log('Database Connected: ');
      }
    });
  }
  //check existing user
  checkExistingUser({ email }) {
    const sql = `SELECT user_email FROM user_data WHERE user_email=?`;
    const value = [email];
    return new Promise((resolve, reject) => {
      this.conn.query(sql, value, (error, result) => {
        if (error) {
          reject({
            error
          })
        } else {

          if (result.length > 0) {
            resolve({
              result
            })
          } else {
            resolve({
              result: null,
            });
          }

        }
      })
    })

  }

  //register User_data

  registerUser({ name, phone, address, email, password }) {
    const sql = `INSERT INTO user_data(user_name, user_phone, user_address, 
      user_email, user_password) VALUES (?,?,?,?,?)`;
    const values = [name, phone, address, email, password];
    return new Promise((resolve, reject) => {
      this.conn.query(sql, values, (error, result) => {
        if (error) {
          reject({ error: "error Register !" });
        } else {
          if (result.insertId) {
            resolve({
              status: true,
              message: "Registered successfully!",
              result
            });
          } else {
            reject({ error: "Registration failed!" });
          }
        }
      });
    })
  }
  updateAdminData(name, phone, email, password, id) {
    const sql = `UPDATE admin SET name=?,phone=?,email=?,password=? WHERE id=? `;
    const values = [name, phone, email, password, id];
    return new Promise((resolve, reject) => {
      this.conn.query(sql, values, (error, result) => {
        if (error) {
          reject({ error })
        } else {
          if (result.affectedRows > 0) {
            resolve({ result })
          }
        }
      })
    })
  }

  UpdateUserData(name, phone, email, address, id) {
    const sql = `update user_data set user_name =?, user_phone =?, user_email =?, user_address =? where user_id =? `;
    const values = [name, phone, email, address, id];
    return new Promise((resolve, reject) => {
      this.conn.query(sql, values, (error, result) => {
        if (error) {
          reject({ error });
        } else {
          resolve({
            status: true,
            result
          })
        }
      })
    })

  }
  //Forgot password Change and update
  updatePassword(newpassword, emails) {
    const sql = `UPDATE user_data SET user_password =? WHERE user_email =? `;
    const values = [newpassword, emails];
    return new Promise((resolve, reject) => {
      this.conn.query(sql, values, (error, result) => {
        if (error) {
          reject({ error });
        } else {
          if (result.affectedRows === 0) {
            resolve({ result: null }); // Email not found
          } else {
            resolve({ result });
          }
        }
      });
    });
  }

  // GetOrderViewDetails() {
  //   const query1 = `SELECT  name, phone, address from user_data where id =? `;
  //   const query2 = `SELECT id, name, FROM product where id =? `;
  //   const query3 = `select price, quantity date from order_details where id =? `;
  //   const [result1, result2, result3] = await Promise.all([query1, query2, query3]);
  //   const combinedResult = {
  //     table1Data: result1,
  //     table2Data: result2,
  //     table3Data: result3,
  //   };

  //   return combinedResult;
  // }
  CheckUser(email) {
    const sql = `SELECT user_id, user_name, user_email, user_password FROM user_data WHERE user_email = ? `;
    const values = [email];
    return new Promise((resolve, reject) => {
      this.conn.query(sql, values, (err, result) => {
        if (err) {
          reject({ err });
        } else {
          if (result.length > 0) {
            resolve({ result: result });
          } else {
            resolve({ result: null }); // Return null if user is not found
          }
        }
      });
    });
  }
  //Fetch all uer 
  async getallUser() {
    const sql = "SELECT user_id,user_name,user_phone,user_email,user_address,user_password  FROM `user_data`";
    return new Promise((resolve, reject) => {
      this.conn.query(sql, (err, result) => {
        if (err) {
          reject({ err });
        } else {
          if (result.length > 0) {
            resolve({ result })
          } else {
            resolve(null);
          }
        }
      });
    })
    // return res;
  }
  //check admin email and password
  checkAdmin(email, password) {
    const sql = `select id, name from admin where email =? and password =? `;
    const value = [email, password];
    return new Promise((resolve, reject) => {
      this.conn.query(sql, value, (error, result) => {
        if (error) {
          reject({ error });
        } else {
          if (result.length > 0) {
            resolve({
              result
            })

          }
          else {
            reject({ error })
          }
        }
      })
    })
  }
  //check User or Login 
  userLogin(email, password) {
    const sql = "SELECT user_id,user_name,user_email FROM user_data WHERE user_email = ? AND user_password = ?";
    const values = [email, password];
    return new Promise((resolve, reject) => {
      this.conn.query(sql, values, (error, result) => {
        if (error) {
          reject({
            message: "Incoorect Email or Password",
          });
        }
        else {
          if (result.length > 0) {

            // console.log("reslt  ", result);
            resolve({
              result
            });
          } else {
            // console.log("reslt null ", result);
            resolve({
              result: null
            });

          }


        }
      })
    })
  };


  //Add Product 
  addProduct({ name, price, description, image, special, category }) {

    const sql = `INSERT INTO product(name, price, description, image, category,
       special) VALUES(?,?,?,?,?,?)`;

    const values = [name, price, description, image, category, special];

    return new Promise((resolve, reject) => {
      this.conn.query(sql, values, (error, result) => {
        if (error) {

          reject({ message: "product upload failed" });
        } else {

          resolve({
            status: true,
            message: "Product Added Successfully",
            result,
          })
        }
      })
    })
  }

  //Update Product
  updateProduct({ name, price, description, image, special, category, id }) {
    const table = special ? 'product' : 'product';
    const sql = `UPDATE ${table} SET name = ?, price = ?, description = ?, image = ?, category = ? WHERE id = ? `;
    const values = [name, price, description, image, category, id];
    return new Promise((resolve, reject) => {
      this.conn.query(sql, values, (error, result) => {
        if (error) {
          reject({ message: "Product update failed" });
        } else {
          resolve({
            result,
          });
        }
      });
    });
  }

  //Fetch One User Data
  fetchOneUser(id) {
    const sql = "select * from user_data where user_id=?";
    const value = [id];
    return new Promise((resolve, reject) => {
      this.conn.query(sql, value, (error, result) => {
        if (error) {
          reject({ error })
        } else {
          resolve({ result })
        }
      })
    })
  }

  GetOneUserForOrder(id) {
    const sql = ` SELECT name, email, address, phone FROM user_data WHERE id =? `;
    const value = [id];
    return new Promise((resolve, reject) => {
      this.conn.query(sql, value, (error, result) => {
        if (error) {

          reject({ error })
        } else {

          resolve({
            result
          })
        }
      })
    })
  }
  //Get special item product
  getspecialProduct() {
    const sql = "SELECT id,name,price,description,image from specialmenu";
    return new Promise((resolve, reject) => {
      this.conn.query(sql, (error, result) => {
        if (error) {
          reject({ error })
        } else {
          resolve({ result: result })
        }
      })
    })
  }

  //get All product menu
  // getAllProductMenu() {
  //   const sql = "SELECT * FROM product"
  //   return new Promise((resolve, reject) => {
  //     this.conn.query(sql, (error, result) => {
  //       if (error) {
  //         reject({ error });
  //       } else {
  //         resolve({ result });
  //       }
  //     });

  //   })
  // }

  ///Get All Product 
  getAllProductItem() {
    const query = "SELECT  id, name, price, description, image,category,special FROM product";
    return new Promise((resolve, reject) => {
      this.conn.query(query, (error, result) => {
        if (error) {
          reject({ error: "error" });
        } else {
          if (result.length > 0) {
            resolve({ result });
          }
          else {
            resolve({ nodata: null });
          }
        }
      })
    })
  }
  //Add Admin
  addAdmin(name, email, phone, password) {

    const sql = `INSERT INTO admin(name, email, phone, password) VALUES(?,?,?,?)`;
    const values = [name, email, phone, password];
    return new Promise((resolve, reject) => {
      this.conn.query(sql, values, (error, result) => {
        if (error) {
          reject({
            error
          })
        } else {
          if (result.affectedRows > 0) {
            resolve({ result });
          }
        }
      })
    })
  }
  // get data all admmins
  getAdminData() {
    const query = "SELECT * FROM `admin`";
    return new Promise((resolve, reject) => {
      this.conn.query(query, (error, result) => {
        if (error) {
          reject({ error });
        } else {
          if (result.length > 0) {
            resolve({ result });
          }
        }
      })
    })
  }

  //Delete Data Admin
  deleteAdmin(id) {
    const query = `DELETE FROM admin WHERE id =? `;
    const values = [id];
    return new Promise((resolve, reject) => {
      this.conn.query(query, values, (error, result) => {
        if (error) {
          reject({ error });
        } else {
          resolve({
            status: true, result
          });
        }
      });
    })

  }
  //Add Special Item Deta
  addSpecialItem(productName, price, des, photo) {
    const sql = `INSERT INTO specialmenu(name, price, des, image) VALUES(?,?,?,?)`;
    const values = [productName, price, des, photo];
    return new Promise((resolve, reject) => {
      this.conn.query(sql, values, (error, result) => {
        if (error) {
          reject({
            success: false,
            message: "error",
            error,
          })
        } else {
          resolve({
            success: true,
            message: "success add",
            result,
          })
        }
      })
    })
  }

  //gGet resut
  getProudctId(id) {
    const sql = `SELECT name, price, description, image FROM product WHERE id =? `;
    const value = [id];
    return new Promise((resolve, reject) => {
      this.conn.query(sql, value, (error, result) => {
        if (error) {
          reject(error);
        } else {
          if (result.length > 0) {
            resolve({ result });
          } else {
            reject("Product not found");
          }
        }
      });
    });
  }
  //Send Contact and Get Contact
  userContact(name, email, subject, message) {
    const sql = `INSERT INTO contact(name, email, subject, message) VALUES(?,?,?,?)`;
    const value = [name, email, subject, message];
    return new Promise((resolve, reject) => {
      this.conn.query(sql, value, (error, result) => {
        if (error) {
          reject({
            status: false,
            message: 'error'
          })

        }
        else {
          resolve({
            success: true,
            message: "sucessful",
            result
          });
        }
      })
    })

  }
  getContact() {
    const sql = `select * from contact`;
    return new Promise((resolve, reject) => {
      this.conn.query(sql, (error, result) => {
        if (error) {
          reject({
            success: false
          })

        }
        else {
          resolve({
            result
          })
        }
      })
    })
  }

  //Delect contact_details where id=?
  deleteContact_Details(id) {
    const sql = `DELETE from contact WHERE id =? `;
    const values = [id];
    return new Promise((resolve, reject) => {
      this.conn.query(sql, values, (error, result) => {
        if (error) {
          reject({ error })
        } else {
          if (resolve.length > 0) {
            resolve({ result });
          } else {
            reject({ error });
          }
        }
      })
    })
  }
  //Get Momo Category
  getMomo() {
    const sql = `SELECT * FROM product WHERE category = "momo"`;
    return new Promise((resolve, reject) => {
      this.conn.query(sql, (error, result) => {
        if (error) {
          reject({ error })
        }
        else {

          resolve({ result: result })
        }
      })
    })
  }

  //Get Shorma Category
  getShormaCategory() {
    const sql = `select * from product where category = "shorma"`;
    return new Promise((resolve, reject) => {
      this.conn.query(sql, (error, result) => {
        if (error) {

          reject({ error });
        } else {

          resolve({ result });
        }
      })
    })
  }
  //Burger Category
  getBurger() {
    const sql = `select * from product where category = 'burger'`;
    return new Promise((resolve, reject) => {
      this.conn.query(sql, (eror, result) => {
        if (eror) {
          reject({ eror })
        } else {
          resolve({ result })
        }
      })
    })
  }
  //Delete Product
  deleteProduct(id) {
    const sql = `DELETE FROM  product WHERE id = ? `;
    const value = [id]
    return new Promise((resolve, reject) => {
      this.conn.query(sql, value, (error, result) => {
        if (error) {
          reject({
            error
          });
        } else {
          resolve({
            result
          });
        }
      })
    })
  }


  orderData(data) {

    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO order_details(menu_id, user_id,
         price, quantity, token_num) VALUES(?,?,?,?,?)`;
      const values = [data.id, data.user_id, data.price, data.quantity, data.token_num];

      this.conn.query(sql, values, (error, result) => {
        if (error) {

          reject({ error });

        } else {

          resolve({ result });
        }
      })

    })
  }

  //get Token Number 
  getTokenNumber() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT token_num from order_details';
      this.conn.query(sql, (error, result) => {
        if (error) {
          reject({ error })
        } else {
          if (result.length > 0) {
            resolve({ result })
          }
        }
      })
    })
  }


  getAllOrder() {
    const sql = `SELECT * FROM order_details order by id desc`;
    return new Promise((resolve, reject) => {
      this.conn.query(sql, (error, result) => {
        if (error) {
          reject({ error });
        } else {

          resolve({ result })
        }
      })
    })
  }

  //Get Order_datils for user where id =? and token number=?
  GetOrderDetails(id, token_num) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT ud.user_name, ud.user_phone, ud.user_address, p.id, p.name, od.price, od.quantity, od.status, od.date, od.token_num
      FROM user_data AS ud
      INNER JOIN order_details AS od ON ud.user_id = od.user_id
      INNER JOIN product AS p ON od.menu_id = p.id
      WHERE od.user_id = ? AND od.token_num = ?;
    `;
      const values = [id, token_num];
      this.conn.query(sql, values, (error, result) => {
        if (error) {
          reject({ error })
        } else {
          if (result.length > 0) {

            resolve({ result })
          }
        }
      })
    })
  }
  //Get Three table get data
  GetUserData(id) {
    return new Promise((resolve, reject) => {
      const sql = `select name, phone, address where id =? `;
      const values = [id];
      this.conn.query(sql, values, (error, result) => {
        if (error) {
          reject({ error })
        } else {
          resolve({ result })
        }
      })
    })
  }

  GetProductData(menu_id) {
    return new Promise((resolve, reject) => {
      const sql = `select id, name where id =? `;
      const values = [menu_id];
      this.conn.query(sql, values, (error, result) => {
        if (error) {
          reject({ error })
        } else {
          resolve({ result })
        }
      })
    })
  }
  GetOrderData(id) {
    return new Promise((resolve, reject) => {
      const sql = `select price, quantity, date where id =? and status = 'pending'`;
      const values = [menu_id];
      this.conn.query(sql, values, (error, result) => {
        if (error) {
          reject({ error })
        } else {
          resolve({ result })
        }
      })
    })
  }

  getOrderRecent() {
    return new Promise((resolve, reject) => {
      const sql = `select * from order_details ORDER BY id DESC limit 5`;
      this.conn.query(sql, (error, result) => {
        if (error) {
          reject({ error })
        } else {
          resolve({
            result
          })
        }
      })
    })
  }

  //Get Order Details for userid=? and token_num=?
  getOrderDataView(id, token_num) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT u.name, u.phone, u.address, p.name, od.price, od.quantity, od.token_num, od.date
FROM user_data AS u
INNER JOIN order_details AS od ON u.id = od.user_id
INNER JOIN product AS p ON od.menu_id = p.id
WHERE u.id = ? AND od.token_num = ? `;
      const values = [id, token_num];
      this.conn.query(sql, values, (error, result) => {
        if (error) {
          reject({ error });
        } else {
          if (result.length > 0) {
            resolve({ result })
          }
        }
      })
    })
  }

  //Update Order Details for userid=? and token_num=?
  updateOrderStatus(status, user_id, token_num) {

    return new Promise((resolve, reject) => {
      const sql = `UPDATE order_details SET status =? WHERE user_id =? AND token_num =? `;
      const values = [status, user_id, token_num]; // Access the status property
      this.conn.query(sql, values, (error, result) => {
        if (error) {
          reject({ error });
        } else {
          console.log("sql:", sql);
          console.log("Values:", values);
          console.log("result:", result);

          resolve({ result });
        }
      });
    });
  }

  getOerder_Status(id, token_num) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT status FROM order_details where id=? and token_num=?';
      const value = [id, token_num];
      this.conn.query(sql, value, (error, result) => {
        if (error) {
          reject({ error })
        } else {
          resolve({ result })
        }
      })
    })
  }

  //Get User Orders in Cleinet side User Order page

  getUserOrders(id) {
    const sql = `SELECT order_details.token_num, product.name, order_details.price, order_details.status, order_details.quantity, order_details.date  
    FROM product
    INNER JOIN order_details ON product.id = order_details.menu_id
    WHERE order_details.user_id = ? `;
    const values = [id];

    return new Promise((resolve, reject) => {
      this.conn.query(sql, values, (error, result) => {
        if (error) {
          reject({
            error
          })
        } else {
         

          if (result.length > 1) {
            resolve({ result })
          }
        }
      })
    })
  }
  getIdAdmin(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT name, phone, email, password FROM admin WHERE id =? `;
      const value = [id];
      this.conn.query(sql, value, (error, result) => {
        if (error) {
          reject({ error });
        } else {
          if (result.length > 0) {
            resolve({ result });
          }
        }
      })
    })
  }

  editProduct(id) {
    return new Promise((resolve, reject) => {
      const sql = `select * from product where id =? `;
      const value = [id];

      this.conn.query(sql, value, (error, result) => {
        if (error) {

          reject({ error });
        } else {

          resolve({ result })
        }
      })
    })
  }

  //add empyoyee
  saveEmployeeData(name, address, phone, facebook, instagram, tiktok, id) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE employee SET name address, phone, facebook, instagram, tiktok) values(?,?,?,?,?,?) WHERE id =? `;
      const values = [name, address, phone, facebook, instagram, tiktok, id];
      this.conn.query(sql, values, (error, result) => {
        if (error) {
          reject({ error });
        }
        else {
          resolve({ result })
        }
      })

    })
  }
}
export const db = new Db();
