import React from "react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
const Dlayout = ({ children }) => {
  const router = useRouter();
  const logoutBtn = () => {
    alert("LogOut Success");
    router.push("/");
  };
  return (
    <>
      <div className="dashboards">
        <div className="dashboard_top">
          <div className="flex">
            <div className="dashbord_top_left">
              {" "}
              <h1 className="text-white">Sc Restaurent</h1>
            </div>
            <div className="dashbord_top_right">
              <div className="icons">
                {/* <button className="btn text-white ">
                  <i className="bi bi-envelope fs-4"></i>
                </button> */}

                <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#exampleModal"  >
                  <i className="bi bi-bell-fill fs-4"></i>
                </button>
                {/* model  */}
                <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-dialog modal-sm">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title text-dark" id="exampleModalLabel">New Message !</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body text-dark">
                        <ul>
                          <li>Proudt Order </li>
                          <li>Proudt Order </li>
                          <li>Proudt Order </li>
                        </ul>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                      </div>
                    </div>
                  </div>
                </div>
                <button className="btn text-white">
                  <i className="bi bi-bell-fill fs-4"></i>
                </button>
              </div>
              <div className="name">
                <span className="mx-2 fs-4">Hello,Admin</span>
              </div>
              <div className="admininfo">
                <Link href="/profile">
                  {" "}
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuu4dy4fOi7lH5GxvLcdAoyx5Kf5A7EE7mCA&usqp=CAU"
                    alt=""
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard">
          <div className="dashboard_left">
            <div className=" listgroup_background">
              <ul className="dashullist">
                <li>
                  <Link href="/dashboard" className="list_item  ">
                    <i className="bi bi-house-dash"></i> Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/admins" className="list_item ">
                    <i className="bi bi-person-check-fill"></i> Admins
                  </Link>
                </li>
                <li>
                  <Link href="/users" className="list_item">
                    <i className="bi bi-people-fill"></i> Users
                  </Link>
                </li>
                <li>
                  <Link href="/product" className="list_item ">
                    <i className="bi bi-pie-chart-fill"></i> Product
                  </Link>
                </li>
                <li>
                  <Link href="/order" className="list_item">
                    <i className="bi bi-record-circle"></i>Order
                  </Link>
                </li>

                <li>
                  <Link href="/Chat" className="list_item">
                    <i className="bi bi-cart-check"></i>Chat

                  </Link>
                </li>
                <li>
                  <Link href="/todaySpecial" className="list_item">
                    <i className="bi bi-menu-button-fill"></i>Today Specaial
                  </Link>
                </li>
                <li>
                  <Link href="/specialMenu" className="list_item">
                    <i className="bi bi-menu-button-fill"></i>Special Menu
                  </Link>
                </li>
                <li>
                  <Link href="/contact_details" className="list_item">
                    <i className="bi bi-person-lines-fill"></i>Contact
                  </Link>
                </li>
                <li>
                  <Link href="/Chef" className="list_item">
                    <i className="bi bi-person-lines-fill"></i>Add Chef
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className="list_item">
                    <i className="bi bi-person"></i>Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile"
                    className="list_item "
                    onClick={logoutBtn}
                  >
                    <i className="bi bi-box-arrow-left"></i>LogOut
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="dashboard_right">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Dlayout;
