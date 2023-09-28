import Dlayout from "@/components/Dlayout";
import Link from "next/link";
import React from "react";

const profile = () => {
  return (
    <Dlayout>
      <h1>Profile</h1>
      <div className="profile">
        <div className="image">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuu4dy4fOi7lH5GxvLcdAoyx5Kf5A7EE7mCA&usqp=CAU"
            alt=""
          />
          <div className="editPhoto">
            <Link href="" className="bi bi-camera-fill text-dark"></Link>
          </div>
        </div>
        <div className="text">
          <p>Name</p>
          <p>Phone</p>
          <p>Email</p>
          <p>Address</p>
        </div>
      </div>
    </Dlayout>
  );
};

export default profile;
