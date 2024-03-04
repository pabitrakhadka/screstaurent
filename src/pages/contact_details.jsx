import Dlayout from "@/components/Dlayout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
const contact_details = () => {


  //delete contact 
  const contactDelete = async (e, id, index) => {
    e.preventDefault();
    const text = 'Can You Delete ?';
    if (confirm(text) == true) {
      const res = await axios.delete(`http://localhost:3000/api/about?id=${id}`)
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
        const updateContact_data = contact.filter((data, i) => i != index);
        setContact(updateContact_data);
      } else {
        toast.error("Please Login!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          theme: "colored",
        });
      }
    } else {

    }
  }
  const [contact, setContact] = useState([]);
  const loadContact = async () => {
    const res = await axios.get("/api/about");
    if (res.status===200) {
      setContact(res.data);
    }
  };
  useEffect(() => {
    loadContact();
  }, []);
  return (
    <Dlayout>
      <ToastContainer />
      <h1>Contact details</h1>
      <div className="contact_details">
        <table className="table">
          <thead>
            <tr >
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Subject</th>
              <th scope="col">Message</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {contact.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.name}</td>
                  <td>
                    <a href="mailto">{data.email}</a>
                  </td>
                  <td>{data.subject}</td>
                  <td>{data.message}</td>
                  <td><button onClick={(e) => {
                    contactDelete(e, data.id, index)
                  }} className="btn bg-danger text-white mx-2">Delete</button>
                    <button className="btn bg-success  "> <Link className="text-white" href={`mailto:${data.email}`}>Reply</Link></button>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </Dlayout >
  );
};

export default contact_details;
