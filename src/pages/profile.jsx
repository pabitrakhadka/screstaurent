import Dlayout from "@/components/Dlayout";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const profile = () => {

  const upperCase = (name) => {
    if (!name) return ""; // If name is falsy, return an empty string
    
    // Capitalize the first letter and concatenate with the rest of the string
    return name.charAt(0).toUpperCase() + name.slice(1);
  };
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState();
  const getAdminProfile = async () => {
    try {
      if (session?.user?.email) {
        const id = session?.user?.email;
        const res = await axios.get(`api/admin?id=${id}`);
        if (res.status === 200) {
          console.log(res.data.data);
          setProfile(res.data.data);
          console.log(profile);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAdminProfile();
  }, [session?.user?.email]);
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
        <div className="text mt-3">
          {profile&& profile.map((item, index) => (
            <React.Fragment key={index}>
              <p>Name:  <b>{upperCase(item.name)}</b></p>
              <p>Phoen:  <b>{item.phone}</b></p>
              <p>Email:  <b>{item.email}</b></p>
            </React.Fragment>
          ))}
        </div>
      </div>
    </Dlayout>
  );
};

export default profile;
