import Dlayout from "@/components/Dlayout";
import React, { useEffect, useState } from "react";
import axios from "axios";

const users = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    try {
      const res = await axios.get("/api/user");
      // setData(res.data.users);
      if (res.status===200) {
        console.log(res.data.user);
        setData(res.data);
      }
      // setData(res.data.data.users);
    } catch (errror) {
      console.log(errror);
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <Dlayout>
      <div className="users">
        <h1>Users Data</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
              <th scope="col">Address</th>
              <th scope="col">Password</th>

            </tr>
          </thead>
          <tbody>
          {data && data.length > 0 ? (
    data.map((user, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{user.user_name}</td>
            <td>{user.user_phone}</td>
            <td>{user.user_email}</td>
            <td>{user.user_address}</td>
            <td>**********</td>
        </tr>
    ))
) : (
    <tr>
        <td colSpan="5">No data available</td>
    </tr>
)}
          </tbody>
        </table>
      </div>
    </Dlayout>
  );
};

export default users;
