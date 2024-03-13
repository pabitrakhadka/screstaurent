import Dlayout from "@/components/Dlayout";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [image, setImage] = useState(null);
  const [profile, setProfile] = useState(null);
  const { data: session } = useSession();
  const [showUploadComponent, setShowUploadComponent] = useState(false);

  const upperCase = (name) => {
    if (!name) return ""; 
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const getAdminProfile = async () => {
    try {
      if (session?.user?.image === 'admin' && session?.user?.email) {
        const id = session.user.email;
        const res = await axios.get(`api/admin?id=${id}`);
        if (res.status === 200) {
          setProfile(res.data.data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
 
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Perform logic to send image data to the server
      const formData = new FormData();
      formData.append("image", image);

    const id=session?.user?.email;
   
      const response = await axios.put(`/api/admin?id=${id}&image=image`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
if(response.status===200)
{
  console.log("Successfully ");
}else{
  console.log("Errror ");
}
      // console.log("Image uploaded successfully:", response.data);
      // Optionally, update the UI or show a success message
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle error, show error message, etc.
    }
  };

  const uploadPhoto = () => {
    setShowUploadComponent(true);
  };

  useEffect(() => {
    getAdminProfile();
  }, [session?.user?.email]);

  return (
    <Dlayout>
      <h1>Profile</h1>
      <div className="profile">
        {!showUploadComponent && (
          <>
            <div className="image">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuu4dy4fOi7lH5GxvLcdAoyx5Kf5A7EE7mCA&usqp=CAU"
                alt=""
              />
              <div className="editPhoto">
                <button
                  type="button"
                  className="bi bi-camera-fill text-blue"
                  onClick={uploadPhoto}
                />
              </div>
            </div>
            <div className="text mt-3">
              {profile &&
                profile.map((item, index) => (
                  <React.Fragment key={index}>
                    <p>Name: <b>{upperCase(item.name)}</b></p>
                    <p>Phone: <b>{item.phone}</b></p>
                    <p>Email: <b>{item.email}</b></p>
                  </React.Fragment>
                ))}
            </div>
          </>
        )}
        {showUploadComponent && (
          <UploadComponent
          image={image}
          onClose={() => setShowUploadComponent(false)}
          onSubmit={handleSubmit}
          onImageChange={(e) => setImage(e.target.files[0])}
          />
        )}
      </div>
    </Dlayout>
  );
};

const UploadComponent = ({ image,onClose, onSubmit, onImageChange }) => {
  return (
    <div className="upload-component">
      <form  onSubmit={onSubmit} action="">
        {image && (
          <div className="navbar-brand">
            <h2>Selected Image</h2>
            <img
              src={URL.createObjectURL(image)} // Use URL.createObjectURL to display the selected image
              className="img-thumbnail"
              name="image"
              alt="Selected"
              height={100}
              width={100}
              style={{ maxWidth: "100%" }}
            />
          </div>
        )}
        <input type="file" onChange={onImageChange} />
        <button type="submit" className="btn btn-danger">Upload</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Profile;
