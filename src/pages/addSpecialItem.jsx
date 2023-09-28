import React, { useState, useEffect } from "react";
import Dlayout from "@/components/Dlayout";
import axios from "axios";
const addSpecialItem = () => {
  const [product, setProduct] = useState({
    productName: "",
    price: "",
    des: "",
    photo: null,
  });
  const [message, setMessage] = useState("");
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleFileChange = (event) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      photo: event.target.files[0],
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", product.productName);
      formData.append("price", product.price);
      formData.append("description", product.des);
      formData.append("image", product.photo);
      formData.append("special", true);
      const res = await axios.post(
        "/api/addproduct",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      if (res.data.status) {
        alert(res.data.message);
        router.push("/product");
      } else {
        alert(res.data.message);
      }
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Dlayout>
      <div className="addproducts">
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            name="photo"
            id="photo"
            onChange={handleFileChange}
            required
          />
          <div className="previewImage">
            <p>Preview Image</p>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="productName"
              name="productName"
              value={product.productName}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="floatingInput "> Product Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="price"
              placeholder="price"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="floatingPassword">price</label>
          </div>
          <div className="form-floating ">
            <input
              type="text"
              className="form-control"
              id="des"
              placeholder="productName"
              name="des"
              value={product.des}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="floatingInput">des</label>
          </div>
          <div className="text-center m-2 text-white">
            <button className="btn bg-primary" type="submit btn bg-primary">
              Add Product
            </button>
          </div>
        </form>
        {message && <p>{message}</p>}
      </div>
    </Dlayout>
  );
};

export default addSpecialItem;
