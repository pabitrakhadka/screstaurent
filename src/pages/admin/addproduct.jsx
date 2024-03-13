import Dlayout from "@/components/Dlayout";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 

const addproduct = () => {
  const router = useRouter();
  const { id } = router.query || null;
  const [image, setImage] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [special, setSpecial] = useState(false);


  useEffect(() => {
    const data = router.query.data || '';
  })
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
         
        const res = await axios.get(`/api/product?id=${id}`);

        if (res && res.status===200 && res.data) {
          setProductName(res.data.name
          );
          setPrice(res.data.price);
          setDescription(res.data.description);
          setImage(res.data.image);
          setCategory(res.data.category
          )
        }
      };

      fetchData();
    }
  }, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `/api/product`;
    const data = new FormData();
    data.append("name", productName);
    data.append("price", price);
    data.append("description", description);
    data.append("image", image);
    data.append("category", category);
    data.append("special", special ? "special_menu" : "menu");
    try {
      const method = id ? "put" : "post";
      let res; // declare res variable outside if block

      if (method === "put") {
        res = await axios.put(`/api/product?id=${id}`, data, {
          headers: {
            "content-type": "multipart/form-data",
          },

        });
      } else {
        res = await axios.post(url, data, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
      }
      
      if (res.status===200) {
        toast.success(`${res.data.message}`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          theme: "colored",
        });
        setTimeout(() => {
          router.push("/product");
        }, 3000)
      } else {
        toast.error(`${res.data.message}`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          theme: "colored",
        });
      }
      console.log(res.data);
    } catch (err) {
      console.log(err.message);
      alert("server Error");
    }
  };
  return (
    <Dlayout>
      <ToastContainer />
      <div className="addproducts">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              className="form-control"
              type="file"
              id="image"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="productName"
              name="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
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
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <label htmlFor="floatingPassword">Price Rs,</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="des"
              name="description"
              placeholder="productName"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <label htmlFor="floatingInput">Description</label>
          </div>
          <div className="form-floating mb-3">
            <select
              name="category"
              className="form-select"
              aria-label="Default select example"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value={""}>Select Category</option>
              <option value="momo">Momo</option>
              <option value="pizza">Pizza</option>
              <option value="shorma">Shorma</option>
              <option value="burger">Burger</option>
              <option value="shorma">Shorma</option>

            </select>
          </div>
          {id ? (
            <div></div>
          ) : (
            <div className="form-check my-3">
              <input
                className="form-check-input"
                type="checkbox"
                checked={special}
                onChange={(e) => setSpecial(e.target.checked)}
                id="flexCheckDefault"
              />
              <label className="form-check-label " htmlFor="flexCheckDefault">
                Special Menu
              </label>
            </div>
          )}

          <div className="text-center m-2 text-white">
            {
              id ? (
                <button className="btn bg-primary" type="submit">
                  Update Product
                </button>
              ) : (<button className="btn bg-primary" type="submit">
                Add Product
              </button>)
            }


          </div>
        </form>
      </div >

    </Dlayout >
  );
};

export default addproduct;