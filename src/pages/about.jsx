import Layout from "@/components/Layout";
import axios from "axios";
import React, { useState } from "react";
import { contactform } from "@/schemas";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import AOS from 'aos';
import { useEffect } from "react";
import 'aos/dist/aos.css';
const initialValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};
const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  const router = useRouter();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: contactform,
      onSubmit: async (values) => {
        const res = await axios.post(
          "/api/about",
          values
        );

        if (res.status===200) {

          toast.success(`Thanks You For feed Back`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",

          });
          values.name="";
          values.email="";
          values.subject="";
          values.message="";


          
        } else {
          toast.error(`${res.data.message}`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
          });
        }
      },
    });

  return (
    <Layout>
      <ToastContainer />
      <div className="aboutUs  view">
        <div className="adbotpageflex p-5">
          <div className="about about_left">
            <h1 className="dancing">About Us</h1>
            <h1>Making People Happy</h1>
            <h1> Through Food</h1>
            <p data-aos="fade-up" className="desc drop">
              Welcome to <b>SC Restaurant</b> , a charming restaurant located in the
              heart of historic Dang, Nepal. Our restaurant offers a unique
              dining experience that combines traditional southern cuisine with
              modern culinary techniques.
            </p>
            <p data-aos="fade-up" className="desc">
              Our menu features a variety of mouthwatering dishes that are sure
              to satisfy any appetite. From our signature shrimp and grits to
              our succulent fried chicken, each dish is made with the freshest
              ingredients sourced from local farms and markets.
            </p>
            <p data-aos="fade-up" className="desc">
              The ambiance at SC Restaurant is warm and inviting, with cozy
              booths and a rustic decor that pays homage to the rich history and
              culture of the region. Whether you're celebrating a special
              occasion or simply looking for a delicious meal, our attentive and
              friendly staff will ensure that your dining experience is
              unforgettable.
            </p>
            <p className="desc">
              In addition to our regular menu, we also offer a range of seasonal
              specials and craft cocktails that are sure to delight your taste
              buds. So come on in and join us for a taste of true southern
              hospitality at SC Restaurant."
            </p>
          </div>

          <div className="about about_right">
            <div className="images">
              <img
                src="https://j4demo.enginetemplates.com/joomla/premium/et-fastfood/images/2020/11/10/home1.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="contactform d-flex justify-content-around">
        <div className="contact_left">
          <h1>Contact Form</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingName"
                placeholder="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="floatingInput">Name*</label>
              {errors.name && touched.name ? (
                <p className="form-error">{errors.name}</p>
              ) : null}
            </div>
            <div className="form-floating mb-">
              <input
                type="email"
                className="form-control mb-3"
                id="floatingemail"
                placeholder="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="email">Email*</label>
              {errors.email && touched.email ? (
                <p className="form-error">{errors.email}</p>
              ) : null}
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingsubject"
                placeholder="name"
                name="subject"
                value={values.subject}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="floatingInput">Subject*</label>
              {errors.subject && touched.subject ? (
                <p className="form-error">{errors.subject}</p>
              ) : null}
            </div>
            <div className="form-floatingm ">
              <textarea
                className="form-control"
                placeholder="Leave a Message here"
                id="floatingTextarea"
                name="message"
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
              ></textarea>

              {errors.message && touched.message ? (
                <p className="form-error">{errors.message}</p>
              ) : null}
            </div>
            <button type="submit" className="btn allbtn text-white m-4">
              Submit
            </button>
          </form>
        </div>
        <div className="contact_right">
          <h1>About Our Restaurent</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A, commodi?
          </p>
          <p> Address: Tulsipur,Dang</p>

          <h5>Submit Form or Call Us</h5>
          <p>Phone.9800000000</p>
          <p>Fax.081917854245</p>
        </div>
      </div>

    </Layout>
  );
};

export default About;
