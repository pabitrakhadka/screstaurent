import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "@/pages/login";
const Nav = () => {
  const { data: session } = useSession();

  const logout = () => {
    toast.success("LogOut Successful", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      theme: "colored",
    });
    signOut();
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg header">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand  " href="/">
              <h3 className=" d-flex justify-content-center align-items-center dancing">
                <i className="bi bi-egg-fill "></i>{" "}
                <span className="text-white dancing">SC RESTAURENT</span>
                <i className="bi bi-cup-hot-fill m-1  fs-3 "></i>
              </h3>
            </Link>
            <ul className="navbar-nav m-auto unlist">
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" href="/">
                  <i className="bi bi-house"></i> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/Menu">
                  Menu
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/about">
                  About
                </Link>
              </li>

              {session?.user?.image === "user" ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" href="/cart">
                      Cart
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/UserOrder">
                     Order
                    </Link>
                  </li>
                 
                </>
              ) : (
                <></>
              )}

              {session?.user?.image === "user" ? (
                <li className="nav-item logout_button">
                  <Link className="nav-link" href={"/"} onClick={logout}>
                    Logout
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" href="/login">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        
          {/* </ul> */}
        </div>
        {/* </div> */}
        <ToastContainer />
      </nav>
    </>
  );
};

export default Nav;
